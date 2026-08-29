"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/scroll-to-top";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: Lenis | undefined;
    let frame = 0;

    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__tasheelLenis = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);
    } catch {
      /* native scroll on browsers that cannot run Lenis */
    }

    return () => {
      cancelAnimationFrame(frame);
      delete window.__tasheelLenis;
      try {
        lenis?.destroy();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return <>{children}</>;
}
