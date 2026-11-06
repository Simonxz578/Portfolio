/** Scroll owns time. No wheel interception, playback loop or navigation. */
export const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));
const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
export const smoothstep = (start: number, end: number, value: number): number => {
  const t = clamp((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

const stageEdges = [.12, .3, .58, .82, .96];
/** Static gradients are painted once; scroll only composites their opacity. */
export function cosmicSkyState(progress: number) {
  const p = clamp(progress);
  const dawn = smoothstep(.06, .25, p);
  const sunset = smoothstep(.30, .50, p);
  const day = smoothstep(.55, .75, p);
  return {
    phase: p >= .96 ? "white" : p >= .64 ? "day" : p >= .38 ? "sunset" : p >= .16 ? "dawn" : "night",
    night: 1 - dawn,
    dawn: dawn * (1 - sunset),
    sunset: sunset * (1 - day),
    day,
    tone: "dark",
  };
}

export function groundedFrame(frame: number, frameCount = 8, contacts: number[] = [1, 5]): number {
  const distance = (a: number, b: number) => Math.min(Math.abs(a - b), frameCount - Math.abs(a - b));
  const validContacts = contacts.filter(n => n >= 0 && n < frameCount);
  return validContacts.reduce((best, n) => distance(frame, n) < distance(frame, best) ? n : best, validContacts[0] ?? 0);
}

export function cosmicRunState(progress: number, frameCount = 8) {
  const p = clamp(progress);
  const runningDistance = clamp((p - .12) / .7);
  const arrivingDistance = clamp((p - .82) / .12);
  const cycle = runningDistance * 11 + arrivingDistance * .75;
  const frame = Math.floor(cycle * frameCount) % frameCount;
  const departure = smoothstep(.08, .18, p);
  const approach = smoothstep(.12, .86, p);
  const sky = cosmicSkyState(p);
  return {
    progress: p,
    stage: stageEdges.filter(edge => p >= edge).length,
    sky,
    frame,
    entryOpacity: 1 - departure,
    runnerOpacity: smoothstep(.11, .18, p) * (1 - smoothstep(.83, .95, p)),
    runnerScale: mix(1, .39, approach),
    runnerX: mix(66, 52, smoothstep(.1, .33, p)),
    runnerBottom: mix(14, 19.5, approach),
    entryShift: 7 * departure,
    entryLift: 6 * departure,
    architectureScale: p <= .82 ? mix(.34, .9, Math.pow(smoothstep(0, .82, p), 1.25)) : mix(.9, 1.45, smoothstep(.82, .94, p)),
    architectureBottom: mix(37, 25, smoothstep(.3, .92, p)),
    architectureOpacity: (.82 + .18 * smoothstep(.05, .6, p)) * (1 - smoothstep(.89, .96, p)),
    architectureBrightness: mix(1.02, 1.1, smoothstep(.06, .91, p)),
    depthScale: mix(1, 1.35, smoothstep(0, .94, p)),
    depthOpacity: p <= .65 ? mix(.76, .34, smoothstep(0, .65, p)) : .34 * (1 - smoothstep(.65, .94, p)),
    depthShadeOpacity: 1 - .55 * smoothstep(.08, .68, p),
    whiteOpacity: smoothstep(.8, .96, p),
    introOpacity: 1 - smoothstep(.035, .14, p),
    labelsOpacity: smoothstep(.12, .22, p) * (1 - smoothstep(.85, .94, p)),
    shadowOpacity: .3 * smoothstep(.11, .18, p) * (1 - smoothstep(.81, .93, p)),
  };
}

type CosmicQASnapshot = Readonly<{
  lcpMs: number | null;
  cls: number;
  progressUpdates: number;
  criticalResources: readonly Readonly<{ name: string; durationMs: number; transferBytes: number; encodedBytes: number; workerStartMs: number }>[];
  longTasks: Readonly<{ count: number; totalMs: number; maxMs: number }>;
  rafIntervalsMs: readonly number[];
  minFrameIntervalMs: number | null;
  medianFrameIntervalMs: number | null;
  p95FrameIntervalMs: number | null;
  scope: string;
}>;
declare global { interface Window { readonly __cosmicQA?: CosmicQASnapshot; } }

/** Explicit, local QA only. This is not analytics and sends no data. */
function createQAMetrics(section: HTMLElement) {
  if (new URL(window.location.href).searchParams.get("cosmic-qa") !== "1") return null;
  let lcpMs: number | null = null;
  let cls = 0;
  let sessionValue = 0;
  let sessionStart: number | null = null;
  let lastShiftAt = 0;
  let progressUpdates = 0;
  let longTaskCount = 0;
  let longTaskTotalMs = 0;
  let longTaskMaxMs = 0;
  let lastUpdateAt = 0;
  const intervals: number[] = [];
  const observers: PerformanceObserver[] = [];
  let publishTimer: ReturnType<typeof setTimeout> | undefined;
  const publish = () => {
    clearTimeout(publishTimer);
    publishTimer = setTimeout(() => { section.dataset.cosmicQa = JSON.stringify(window.__cosmicQA); }, 160);
  };
  const observe = (type: string, callback: (entries: PerformanceEntry[]) => void) => {
    try {
      const observer = new PerformanceObserver(list => callback(list.getEntries()));
      observer.observe({ type, buffered: true });
      observers.push(observer);
    } catch { /* The measured browser may not implement this entry type. */ }
  };
  observe("largest-contentful-paint", entries => { for (const entry of entries) lcpMs = entry.startTime; publish(); });
  observe("resource", entries => { if (entries.some(entry => entry.name.includes("/media/cosmic-run/"))) publish(); });
  observe("longtask", entries => {
    for (const entry of entries) { longTaskCount++; longTaskTotalMs += entry.duration; longTaskMaxMs = Math.max(longTaskMaxMs, entry.duration); }
    publish();
  });
  observe("layout-shift", entries => {
    for (const entry of entries) {
      const shift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
      if (!shift.hadRecentInput) {
        const value = shift.value || 0;
        if (sessionStart !== null && shift.startTime - lastShiftAt < 1000 && shift.startTime - sessionStart < 5000) sessionValue += value;
        else { sessionStart = shift.startTime; sessionValue = value; }
        lastShiftAt = shift.startTime;
        cls = Math.max(cls, sessionValue);
        publish();
      }
    }
  });
  Object.defineProperty(window, "__cosmicQA", { configurable: true, get: () => {
    const sorted = [...intervals].sort((a, b) => a - b);
    const percentile = (t: number) => sorted.length ? sorted[Math.floor((sorted.length - 1) * t)] ?? null : null;
    return Object.freeze({ lcpMs, cls, progressUpdates,
      criticalResources: Object.freeze((performance.getEntriesByType("resource") as PerformanceResourceTiming[])
        .filter(entry => entry.name.includes("/media/cosmic-run/"))
        .map(entry => Object.freeze({ name: entry.name, durationMs: entry.duration, transferBytes: entry.transferSize, encodedBytes: entry.encodedBodySize, workerStartMs: entry.workerStart }))),
      longTasks: Object.freeze({ count: longTaskCount, totalMs: longTaskTotalMs, maxMs: longTaskMaxMs }),
      rafIntervalsMs: Object.freeze([...intervals]),
      minFrameIntervalMs: percentile(0), medianFrameIntervalMs: percentile(.5), p95FrameIntervalMs: percentile(.95),
      scope: "Local opt-in measurement. Intervals sample rAF updates while scroll progress changes; they are not a sustained GPU/FPS benchmark.",
    });
  } });
  publish();
  return {
    recordProgress() {
      const time = performance.now();
      const delta = time - lastUpdateAt;
      if (lastUpdateAt && delta < 150) { intervals.push(delta); if (intervals.length > 240) intervals.shift(); }
      lastUpdateAt = time;
      progressUpdates += 1;
      publish();
    },
    disconnect() { clearTimeout(publishTimer); section.dataset.cosmicQa = JSON.stringify(window.__cosmicQA); observers.forEach(observer => observer.disconnect()); },
  };
}

type CosmicElement = HTMLElement & {
  cosmicCleanup?: () => void;
  cosmicRelease?: (state: "ready" | "reduced" | "static") => boolean;
};
export function initialiseCosmicRuns(): void {
  if (typeof document === "undefined") return;
  document.querySelectorAll<CosmicElement>("[data-cosmic-run]").forEach(section => {
    if (section.cosmicCleanup || !section.cosmicRelease || section.dataset.cosmicMotion !== "loading") return;
    const release = section.cosmicRelease;
    const stage = section.querySelector<HTMLElement>("[data-cosmic-viewport]");
    const runner = section.querySelector<HTMLElement>("[data-cosmic-runner]");
    const introduction = section.querySelector<HTMLElement>(".cosmic-introduction");
    const entry = section.querySelector<HTMLImageElement>(".cosmic-entry-body");
    const architecture = section.querySelector<HTMLImageElement>("[data-cosmic-architecture]");
    const environment = section.querySelector<HTMLElement>(".cosmic-environment");
    const front = section.querySelector<HTMLElement>("[data-cosmic-entry]");
    const entryShadow = section.querySelector<HTMLElement>(".cosmic-entry-shadow");
    const footShadow = section.querySelector<HTMLElement>("[data-cosmic-shadow]");
    const depth = section.querySelector<HTMLImageElement>(".cosmic-depth-plate");
    const skyLayers = (["night", "dawn", "sunset", "day"] as const).map(name => ({ name, element: section.querySelector<HTMLElement>(`.cosmic-sky-${name}`) }));
    const writtenStyles = new WeakMap<HTMLElement, Map<string, string>>();
    const writeStyle = (element: HTMLElement | null, name: string, value: string) => {
      if (!element) return;
      let previous = writtenStyles.get(element);
      if (!previous) { previous = new Map(); writtenStyles.set(element, previous); }
      if (previous.get(name) === value) return;
      previous.set(name, value);
      element.style.setProperty(name, value);
    };
    const mark = (name: string, value: string) => { if (section.dataset[name] !== value) section.dataset[name] = value; };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!stage || !runner) return;
    const frameCount = Number(section.dataset.frameCount) || 8;
    const columns = Number(section.dataset.frameColumns) || 4;
    const rows = Number(section.dataset.frameRows) || 2;
    section.style.setProperty("--cosmic-sheet-width", `${columns * 100}%`);
    section.style.setProperty("--cosmic-sheet-height", `${rows * 100}%`);
    const contacts = (section.dataset.groundedFrames || "1,5").split(",").map(Number);
    let visible = true;
    let enabled = false;
    let scheduled = 0;
    let forceRender = false;
    let disposed = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let start = 0;
    let distance = 1;
    let sceneWidth = 0;
    let stageHeight = 0;
    let environmentWidth = 0;
    let environmentHeight = 0;
    let entryX = 73;
    let entryBottom = 8;
    let resizeFrame = 0;
    const qa = createQAMetrics(section);
    const count = section.querySelector<HTMLElement>("[data-cosmic-stage-count]");
    let lastStage = -1;
    let lastFrame = 0;
    let writtenFrame = -1;
    let lastProgress = -1;
    let lastRenderedProgress = -1;
    let assetsReady = false;
    const status = section.querySelector<HTMLElement>("[data-cosmic-load-status]");
    const message = status?.querySelector<HTMLElement>("[data-cosmic-load-message]");
    const progressBar = status?.querySelector<HTMLProgressElement>("progress");
    let loaded = 0;
    let feedbackTimer: ReturnType<typeof setTimeout> | undefined;
    const sprite = new Image();
    sprite.decoding = "async";
    const writeFrame = (frame: number) => {
      if (frame === writtenFrame || disposed) return;
      writtenFrame = frame;
      writeStyle(runner, "--cosmic-frame-x", `${(frame % columns) / Math.max(1, columns - 1) * 100}%`);
      writeStyle(runner, "--cosmic-frame-y", `${Math.floor(frame / columns) / Math.max(1, rows - 1) * 100}%`);
      section.dataset.cosmicFrame = String(frame);
    };
    const cancelRender = () => {
      if (scheduled) cancelAnimationFrame(scheduled);
      scheduled = 0;
    };
    const cancelResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = 0;
    };
    const decodeLayer = async (image: HTMLImageElement | null) => {
      if (!image) throw new Error("Missing scene layer");
      await image.decode();
      if (!image.naturalWidth) throw new Error("Empty scene layer");
      if (!disposed && section.dataset.cosmicMotion === "loading" && progressBar) {
        progressBar.value = ++loaded;
      }
    };
    const showLoadError = () => {
      if (disposed || section.dataset.cosmicMotion !== "loading") return;
      section.setAttribute("data-cosmic-retry", "");
      if (message && status?.dataset.failedText) message.textContent = status.dataset.failedText;
    };
    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      start = sectionRect.top + window.scrollY;
      sceneWidth = sectionRect.width;
      stageHeight = stage.offsetHeight;
      distance = Math.max(1, section.offsetHeight - stageHeight);
      if (environment) {
        environmentWidth = environment.clientWidth;
        environmentHeight = environment.clientHeight;
        const computed = getComputedStyle(section);
        entryX = parseFloat(computed.getPropertyValue("--cosmic-entry-x")) || 73;
        entryBottom = parseFloat(computed.getPropertyValue("--cosmic-entry-bottom")) || 8;
      }
    };
    const render = () => {
      scheduled = 0;
      if (!enabled || document.hidden || disposed) return;
      const state = cosmicRunState((window.scrollY - start) / distance, frameCount);
      mark("cosmicActive", String(visible && state.progress < .96));
      for (const { name, element } of skyLayers) {
        const moving = state.sky[name] > 0 && state.sky[name] < 1;
        if (element && element.hasAttribute("data-sky-moving") !== moving) element.toggleAttribute("data-sky-moving", moving);
      }
      const forced = forceRender;
      forceRender = false;
      if (!forced && state.progress === lastRenderedProgress) return;
      lastRenderedProgress = state.progress;
      const style = { setProperty: (name: string, value: string) => writeStyle(section, name, value) };
      style.setProperty("--cosmic-progress", String(state.progress));
      style.setProperty("--cosmic-night", String(state.sky.night));
      style.setProperty("--cosmic-dawn", String(state.sky.dawn));
      style.setProperty("--cosmic-sunset", String(state.sky.sunset));
      style.setProperty("--cosmic-day", String(state.sky.day));
      style.setProperty("--cosmic-building-opacity", String(state.architectureOpacity));
      style.setProperty("--cosmic-building-brightness", String(state.architectureBrightness));
      style.setProperty("--cosmic-runner-opacity", String(state.runnerOpacity));
      style.setProperty("--cosmic-entry-opacity", String(state.entryOpacity));
      style.setProperty("--cosmic-depth-opacity", String(state.depthOpacity));
      style.setProperty("--cosmic-depth-shade", String(state.depthShadeOpacity));
      style.setProperty("--cosmic-white", String(state.whiteOpacity));
      style.setProperty("--cosmic-intro", String(state.introOpacity));
      style.setProperty("--cosmic-labels", String(state.labelsOpacity));
      style.setProperty("--cosmic-shadow", String(state.shadowOpacity));
      // Fixed layout anchors; only leaf transforms change while scrolling.
      if (environmentWidth && environmentHeight) {
        const px = (n: number) => `${n.toFixed(4)}px`;
        const runnerPlacement = `translate3d(calc(${px(environmentWidth * state.runnerX / 100)} - 50%),${px(-environmentHeight * state.runnerBottom / 100)},0) scale(${state.runnerScale})`;
        writeStyle(runner, "--cosmic-placement", runnerPlacement + " scaleX(-1)");
        writeStyle(footShadow, "--cosmic-placement", runnerPlacement);
        const entryPlacement = `translate3d(calc(${px(environmentWidth * (entryX - state.entryShift) / 100)} - 50%),${px(-environmentHeight * (entryBottom + state.entryLift) / 100)},0)`;
        writeStyle(front, "--cosmic-placement", entryPlacement);
        writeStyle(entryShadow, "--cosmic-placement", entryPlacement);
        writeStyle(architecture, "--cosmic-placement", `translate3d(-50%,${px(-environmentHeight * state.architectureBottom / 100)},0) scale(${state.architectureScale})`);
        writeStyle(depth, "--cosmic-placement", `scale(${state.depthScale})`);
        mark("cosmicComposited", "true");
      }
      if (section.dataset.cosmicSky !== state.sky.phase) section.dataset.cosmicSky = state.sky.phase;
      if (section.dataset.cosmicTone !== state.sky.tone) section.dataset.cosmicTone = state.sky.tone;
      mark("cosmicProgress", state.progress.toFixed(5));
      mark("cosmicStage", String(state.stage));
      if (count && state.stage !== lastStage) count.textContent = `${String(state.stage + 1).padStart(2, "0")} / 06`;
      lastStage = state.stage;
      if (introduction && introduction.hasAttribute("inert") !== (state.introOpacity < .05)) introduction.toggleAttribute("inert", state.introOpacity < .05);
      if (state.progress !== lastProgress) {
        qa?.recordProgress();
        lastFrame = state.frame;
        writeFrame(lastFrame);
        clearTimeout(settleTimer);
        if (visible && state.progress > .11 && state.progress < .95) {
          settleTimer = setTimeout(() => writeFrame(groundedFrame(lastFrame, frameCount, contacts)), 150);
        }
        lastProgress = state.progress;
      }
    };
    function requestRender(force = false) {
      forceRender ||= force;
      if (!scheduled && enabled && !document.hidden && !disposed) scheduled = requestAnimationFrame(render);
    }
    const onScroll = () => { if (visible) requestRender(); };
    const onResize = () => {
      if (resizeFrame || disposed) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        if (disposed || document.hidden || !enabled) return;
        const previousProgress = lastProgress;
        const previousWidth = sceneWidth;
        const previousHeight = stageHeight;
        const previousDistance = distance;
        measure();
        // Mobile address-bar/keyboard resizes often leave svh layout unchanged.
        // Never cancel touch momentum merely because visual viewport height changed.
        const layoutChanged = Math.abs(previousWidth - sceneWidth) > 1 || Math.abs(previousHeight - stageHeight) > 1 || Math.abs(previousDistance - distance) > 1;
        if (layoutChanged && enabled && visible && previousProgress > 0 && previousProgress < 1) {
          window.scrollTo({top:start + previousProgress * distance,behavior:"instant"});
        }
        requestRender(true);
      });
    };
    const onRestoration = () => {
      if (document.hidden) { mark("cosmicActive", "false"); cancelRender(); cancelResize(); clearTimeout(settleTimer); return; }
      measure(); requestRender(true);
    };
    const onPreference = () => {
      if (!assetsReady) return;
      enabled = !reduced.matches;
      section.toggleAttribute("data-cosmic-enhanced", enabled);
      section.dataset.cosmicMotion = enabled ? "ready" : "reduced";
      if (!enabled) {
        mark("cosmicActive", "false");
        cancelRender(); cancelResize();
        section.dataset.cosmicSky = "night";
        section.dataset.cosmicTone = "dark";
        introduction?.removeAttribute("inert"); clearTimeout(settleTimer);
      }
      measure();
      if (enabled) requestRender(true);
    };
    const observer = new IntersectionObserver(entries => {
      if (disposed || !enabled) return;
      visible = entries[0]?.isIntersecting ?? false;
      mark("cosmicVisible", String(visible));
      if (visible) { measure(); requestRender(true); }
      else { clearTimeout(settleTimer); cancelRender(); cancelResize(); forceRender = true; render(); }
    }, { rootMargin: "100px 0px" });
    if (entry) {
      const showPoster = () => mark("cosmicEntry", "poster");
      entry.addEventListener("error", showPoster, { once: true });
      if (entry.complete && !entry.naturalWidth) showPoster();
    }
    sprite.src = section.dataset.spriteSrc || "";
    Promise.all([entry, depth, architecture, sprite].map(decodeLayer)).then(() => {
      if (disposed || section.dataset.cosmicMotion !== "loading") return;
      if (Math.abs((sprite.naturalWidth / columns) / (sprite.naturalHeight / rows) - 2 / 3) > .02) {
        showLoadError();
        return;
      }
      if (!release("ready")) return;
      assetsReady = true;
      enabled = true;
      if (message && status?.dataset.readyText) message.textContent = status.dataset.readyText;
      section.setAttribute("data-cosmic-loaded-feedback", "");
      feedbackTimer = setTimeout(() => section.removeAttribute("data-cosmic-loaded-feedback"), 1800);
      section.setAttribute("data-cosmic-enhanced", "");
      observer.observe(section);
      measure();
      requestRender(true);
    }, showLoadError);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pageshow", onRestoration);
    window.addEventListener("hashchange", onRestoration);
    document.addEventListener("visibilitychange", onRestoration);
    reduced.addEventListener("change", onPreference);
    section.cosmicCleanup = () => {
      disposed = true;
      release("static");
      clearTimeout(feedbackTimer);
      observer.disconnect();
      qa?.disconnect();
      cancelRender();
      cancelResize();
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pageshow", onRestoration);
      window.removeEventListener("hashchange", onRestoration);
      document.removeEventListener("visibilitychange", onRestoration);
      reduced.removeEventListener("change", onPreference);
    };
  });
}
