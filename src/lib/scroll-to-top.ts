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

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const instant = options?.instant || reduceMotion;
  const lenis = window.__tasheelLenis;

  if (lenis?.scrollTo) {
    lenis.scrollTo(0, { immediate: instant, duration: instant ? 0 : 1.05 });
    return;
  }

  window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
}
