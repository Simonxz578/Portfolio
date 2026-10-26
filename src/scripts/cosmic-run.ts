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
    return Object.freeze({ lcpMs, cls, progressUpdates, rafIntervalsMs: Object.freeze([...intervals]),
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

type CosmicElement = HTMLElement & { cosmicCleanup?: () => void };
export function initialiseCosmicRuns(): void {
  if (typeof document === "undefined") return;
  document.querySelectorAll<CosmicElement>("[data-cosmic-run]").forEach(section => {
    section.cosmicCleanup?.();
    clearTimeout(Number(section.dataset.cosmicBootstrapTimer));
    delete section.dataset.cosmicBootstrapTimer;
    section.dataset.cosmicInitialised = "true";
    const stage = section.querySelector<HTMLElement>("[data-cosmic-viewport]");
    const runner = section.querySelector<HTMLElement>("[data-cosmic-runner]");
    const introduction = section.querySelector<HTMLElement>(".cosmic-introduction");
    const entry = section.querySelector<HTMLImageElement>(".cosmic-entry-body");
    const architecture = section.querySelector<HTMLImageElement>("[data-cosmic-architecture]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!stage || !runner) return;
    const frameCount = Number(section.dataset.frameCount) || 8;
    const columns = Number(section.dataset.frameColumns) || 4;
    const rows = Number(section.dataset.frameRows) || 2;
    section.style.setProperty("--cosmic-sheet-width", `${columns * 100}%`);
    section.style.setProperty("--cosmic-sheet-height", `${rows * 100}%`);
    const contacts = (section.dataset.groundedFrames || "1,5").split(",").map(Number);
    let visible = true;
    const bootstrapFailed = section.dataset.cosmicBootstrap === "timed-out";
    let enabled = !reduced.matches && !bootstrapFailed;
    let scheduled = 0;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let start = 0;
    let distance = 1;
    const qa = createQAMetrics(section);
    const count = section.querySelector<HTMLElement>("[data-cosmic-stage-count]");
    let lastStage = -1;
    let lastFrame = 0;
    let lastProgress = -1;
    let spriteStarted = false;
    let spriteReady = false;
    let failed = bootstrapFailed;
    const sprite = new Image();
    sprite.decoding = "async";
    const writeFrame = (frame: number) => {
      runner.style.setProperty("--cosmic-frame-x", `${(frame % columns) / Math.max(1, columns - 1) * 100}%`);
      runner.style.setProperty("--cosmic-frame-y", `${Math.floor(frame / columns) / Math.max(1, rows - 1) * 100}%`);
      section.dataset.cosmicFrame = String(frame);
    };
    const loadSprite = () => {
      if (spriteStarted || !enabled || failed) return;
      spriteStarted = true;
      section.dataset.cosmicMotion = "loading";
      sprite.src = section.dataset.spriteSrc || "";
    };
    const activateFallback = () => {
      failed = true;
      enabled = false;
      section.removeAttribute("data-cosmic-enhanced");
      section.dataset.cosmicMotion = "static";
      section.dataset.cosmicSky = "night";
      section.dataset.cosmicTone = "dark";
      section.dataset.cosmicProgress = "0";
      section.style.cssText += ";--cosmic-progress:0;--cosmic-white:0;--cosmic-intro:1";
      introduction?.removeAttribute("inert");
      measure();
    };
    sprite.onload = () => {
      if (failed) return;
      const frameWidth = sprite.naturalWidth / columns;
      const frameHeight = sprite.naturalHeight / rows;
      if (frameWidth < 100 || frameHeight < 150 || Math.abs(frameWidth / frameHeight - 2 / 3) > .02) { activateFallback(); return; }
      spriteReady = true;
      section.dataset.cosmicMotion = reduced.matches ? "reduced" : "ready";
      requestRender();
    };
    sprite.onerror = activateFallback;
    if (entry) {
      const entryFailed = () => section.dataset.cosmicEntry = "poster";
      entry.addEventListener("error", entryFailed, { once: true });
      if (entry.complete && !entry.naturalWidth) entryFailed();
    }
    const measure = () => {
      start = section.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
    };
    const render = () => {
      scheduled = 0;
      if (!enabled || document.hidden) return;
      const state = cosmicRunState((window.scrollY - start) / distance, frameCount);
      const style = section.style;
      style.setProperty("--cosmic-progress", String(state.progress));
      style.setProperty("--cosmic-night", String(state.sky.night));
      style.setProperty("--cosmic-dawn", String(state.sky.dawn));
      style.setProperty("--cosmic-sunset", String(state.sky.sunset));
      style.setProperty("--cosmic-day", String(state.sky.day));
      style.setProperty("--cosmic-building-scale", String(state.architectureScale));
      style.setProperty("--cosmic-building-bottom", `${state.architectureBottom}%`);
      style.setProperty("--cosmic-building-opacity", String(state.architectureOpacity));
      style.setProperty("--cosmic-building-brightness", String(state.architectureBrightness));
      style.setProperty("--cosmic-runner-scale", String(state.runnerScale));
      style.setProperty("--cosmic-runner-x", `${state.runnerX}%`);
      style.setProperty("--cosmic-runner-bottom", `${state.runnerBottom}%`);
      style.setProperty("--cosmic-runner-opacity", String(spriteReady ? state.runnerOpacity : 0));
      style.setProperty("--cosmic-entry-opacity", String(spriteReady ? state.entryOpacity : 1 - smoothstep(.78, .96, state.progress)));
      style.setProperty("--cosmic-entry-shift", `${spriteReady ? state.entryShift : 0}%`);
      style.setProperty("--cosmic-entry-lift", `${spriteReady ? state.entryLift : 0}%`);
      style.setProperty("--cosmic-depth-scale", String(state.depthScale));
      style.setProperty("--cosmic-depth-opacity", String(state.depthOpacity));
      style.setProperty("--cosmic-depth-shade", String(state.depthShadeOpacity));
      style.setProperty("--cosmic-white", String(state.whiteOpacity));
      style.setProperty("--cosmic-intro", String(state.introOpacity));
      style.setProperty("--cosmic-labels", String(state.labelsOpacity));
      style.setProperty("--cosmic-shadow", String(spriteReady ? state.shadowOpacity : 0));
      if (section.dataset.cosmicSky !== state.sky.phase) section.dataset.cosmicSky = state.sky.phase;
      if (section.dataset.cosmicTone !== state.sky.tone) section.dataset.cosmicTone = state.sky.tone;
      section.dataset.cosmicProgress = state.progress.toFixed(5);
      section.dataset.cosmicStage = String(state.stage);
      if (count && state.stage !== lastStage) count.textContent = `${String(state.stage + 1).padStart(2, "0")} / 06`;
      lastStage = state.stage;
      introduction?.toggleAttribute("inert", state.introOpacity < .05);
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
    function requestRender() {
      if (!scheduled && enabled && !document.hidden) scheduled = requestAnimationFrame(render);
    }
    if (architecture) {
      const architectureFailed = () => { section.dataset.cosmicBuilding = "missing"; activateFallback(); };
      architecture.addEventListener("error", architectureFailed, { once: true });
      if (architecture.complete && !architecture.naturalWidth) architectureFailed();
    }
    const onScroll = () => { if (visible) { loadSprite(); requestRender(); } };
    const onResize = () => {
      const previousProgress = lastProgress;
      measure();
      if (enabled && visible && previousProgress > 0 && previousProgress < 1) {
        window.scrollTo({top:start + previousProgress * distance,behavior:"instant"});
      }
      requestRender();
    };
    const onRestoration = () => { measure(); requestRender(); };
    const onPreference = () => {
      enabled = !reduced.matches && !failed;
      section.toggleAttribute("data-cosmic-enhanced", enabled);
      section.dataset.cosmicMotion = reduced.matches ? "reduced" : failed ? "static" : spriteReady ? "ready" : "loading";
      if (!enabled) {
        section.dataset.cosmicSky = "night";
        section.dataset.cosmicTone = "dark";
        introduction?.removeAttribute("inert"); clearTimeout(settleTimer);
      }
      measure();
      if (enabled) { loadSprite(); requestRender(); }
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      if (visible) { measure(); loadSprite(); requestRender(); }
      else { clearTimeout(settleTimer); if (scheduled) { cancelAnimationFrame(scheduled); scheduled = 0; } render(); }
    }, { rootMargin: "100px 0px" });
    observer.observe(section);
    section.toggleAttribute("data-cosmic-enhanced", enabled);
    section.dataset.cosmicMotion = reduced.matches ? "reduced" : failed ? "static" : "loading";
    measure();
    requestRender();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pageshow", onRestoration);
    window.addEventListener("hashchange", onRestoration);
    document.addEventListener("visibilitychange", onRestoration);
    reduced.addEventListener("change", onPreference);
    section.cosmicCleanup = () => {
      observer.disconnect();
      qa?.disconnect();
      cancelAnimationFrame(scheduled);
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
