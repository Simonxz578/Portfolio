const warmMessage = "portfolio-scene-cache:warm";
let scheduled = false;

function waitForActivation(registration: ServiceWorkerRegistration): Promise<ServiceWorker | null> {
  const worker = registration.active ?? registration.installing ?? registration.waiting;
  if (!worker || worker.state === "redundant") return Promise.resolve(null);
  if (worker.state === "activated") return Promise.resolve(worker);

  return new Promise(resolve => {
    const finish = (active: ServiceWorker | null) => {
      window.clearTimeout(timeout);
      worker.removeEventListener("statechange", onStateChange);
      resolve(active);
    };
    const onStateChange = () => {
      if (worker.state === "activated") finish(worker);
      if (worker.state === "redundant") finish(null);
    };
    const timeout = window.setTimeout(() => finish(null), 8000);
    worker.addEventListener("statechange", onStateChange);
    onStateChange();
  });
}

function warmLoadedImages(worker: ServiceWorker, scene: HTMLElement) {
  const urls = new Set<string>();
  for (const image of scene.querySelectorAll<HTMLImageElement>("img")) {
    if (image.complete && image.naturalWidth > 0 && image.currentSrc) urls.add(image.currentSrc);
  }
  if (scene.dataset.spriteSrc) {
    try {
      urls.add(new URL(scene.dataset.spriteSrc, document.baseURI).href);
    } catch {
      // The scene images remain eligible when the sprite URL is malformed.
    }
  }
  if (urls.size) worker.postMessage({ type: warmMessage, urls: [...urls] });
}

async function registerAndWarm(script: URL, scene: HTMLElement) {
  try {
    const workers = navigator.serviceWorker;
    const scope = new URL("./", script).href;
    const existing = await workers.getRegistration(scope);
    if (existing?.scope === scope && [existing.active, existing.waiting, existing.installing]
      .some(worker => worker && worker.scriptURL !== script.href)) return;

    const registration = await workers.register(script.href, { scope });
    const worker = await waitForActivation(registration);
    if (worker?.scriptURL === script.href && scene.isConnected) warmLoadedImages(worker, scene);
  } catch {
    // Registration and warm-up are independent of the visible scene.
  }
}

export function registerSceneCache(workerUrl: string): void {
  if (scheduled || typeof window === "undefined" || !window.isSecureContext ||
      !("serviceWorker" in navigator)) return;
  let script: URL;
  try {
    script = new URL(workerUrl, document.baseURI);
    if (script.origin !== window.location.origin) return;
  } catch {
    return;
  }
  scheduled = true;

  const start = () => {
    const scene = document.querySelector<HTMLElement>("[data-cosmic-run]");
    if (scene) void registerAndWarm(script, scene);
  };
  const defer = () => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(start, { timeout: 2000 });
    else window.setTimeout(start, 500);
  };
  if (document.readyState === "complete") defer();
  else window.addEventListener("load", defer, { once: true });
}
