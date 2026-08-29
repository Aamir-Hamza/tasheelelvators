type LenisLike = {
  scrollTo: (target: number | string | HTMLElement, options?: { duration?: number; immediate?: boolean }) => void;
};

declare global {
  interface Window {
    __tasheelLenis?: LenisLike;
  }
}

export function scrollPageToTop(options?: { instant?: boolean }) {
  if (typeof window === "undefined") return;

  let reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    reduceMotion = false;
  }
  const instant = options?.instant || reduceMotion;
  const lenis = window.__tasheelLenis;

  try {
    if (lenis?.scrollTo) {
      lenis.scrollTo(0, { immediate: instant, duration: instant ? 0 : 1.05 });
      return;
    }
  } catch {
    /* fall through to native scroll */
  }

  try {
    window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
  } catch {
    window.scrollTo(0, 0);
  }
}
