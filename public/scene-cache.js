const scope = new URL(self.registration.scope);
const assetDirectory = new URL("media/cosmic-run/", scope).pathname;
const homePaths = new Set([scope.pathname, new URL("zh/", scope).pathname]);
const cacheName = `portfolio-cosmic-scene-v1:${scope.pathname}`;
const maxEntries = 18;
const lookupTimeoutMs = 200;
const warmMessage = "portfolio-scene-cache:warm";
const assetNames = new Set([
  "simon-entry.webp",
  "simon-entry-512.webp",
  "simon-entry-768.webp",
  "cosmic-depth.webp",
  "kings-architecture.webp",
  "runner-cycle.webp",
]);

function sceneUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.origin === scope.origin && !url.username && !url.password && !url.hash &&
        url.pathname.startsWith(assetDirectory) && assetNames.has(url.pathname.slice(assetDirectory.length)) &&
        /^\?v=[a-f0-9]{16}$/.test(url.search)) return url.href;
  } catch {
    // A malformed URL is outside the asset contract.
  }
  return null;
}

function cacheable(response) {
  return response.status === 200 && !response.redirected &&
    response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() === "image/webp" &&
    !/\bno-store\b/i.test(response.headers.get("cache-control") || "");
}

async function readImage(url) {
  let timeout;
  try {
    const deadline = new Promise(resolve => { timeout = setTimeout(resolve, lookupTimeoutMs); });
    const response = await Promise.race([caches.match(url, { cacheName }), deadline]);
    return response && cacheable(response) ? response : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

let writes = Promise.resolve();
function saveImage(url, response) {
  // Serialize evictions and inserts so simultaneous requests share one bound.
  writes = writes.then(async () => {
    const cache = await caches.open(cacheName);
    const previous = await cache.match(url);
    if (previous && cacheable(previous)) return;

    const otherKeys = (await cache.keys()).filter(key => key.url !== url);
    const evictions = Math.max(0, otherKeys.length + 1 - maxEntries);
    for (const oldest of otherKeys.slice(0, evictions)) {
      if (!(await cache.delete(oldest))) return;
    }
    await cache.put(url, response);
  }).catch(() => {
    // Quota and storage errors leave the browser's origin response available.
  });
  return writes;
}

async function resolveImage(request, url) {
  const cached = await readImage(url);
  if (cached) return { response: cached };

  const response = await fetch(request);
  try {
    if (cacheable(response)) return { response, copy: response.clone() };
  } catch {
    // A cache copy is optional.
  }
  return { response };
}

self.addEventListener("fetch", event => {
  const { request } = event;
  if (request.method !== "GET" || request.destination !== "image" ||
      request.cache === "no-store" || request.headers.has("range")) return;
  const url = sceneUrl(request.url);
  if (!url) return;

  const result = resolveImage(request, url);
  event.respondWith(result.then(({ response }) => response));
  event.waitUntil(result.then(({ copy }) => copy ? saveImage(url, copy) : undefined).catch(() => {}));
});

function isHomeClient(client) {
  if (typeof client?.url !== "string") return false;
  try {
    const url = new URL(client.url);
    return url.origin === scope.origin && homePaths.has(url.pathname);
  } catch {
    return false;
  }
}

async function warmImages(urls) {
  for (const url of urls) {
    try {
      if (await readImage(url)) continue;
      const response = await fetch(url, { cache: "only-if-cached", mode: "same-origin", redirect: "error" });
      if (cacheable(response)) await saveImage(url, response);
    } catch {
      // A missing HTTP cache entry can be filled by a future image request.
    }
  }
}

self.addEventListener("message", event => {
  const { data, source } = event;
  if (data?.type !== warmMessage || !Array.isArray(data.urls) || !isHomeClient(source)) return;
  const urls = new Set(data.urls.slice(0, assetNames.size).map(sceneUrl).filter(Boolean));
  if (urls.size) event.waitUntil(warmImages(urls));
});
