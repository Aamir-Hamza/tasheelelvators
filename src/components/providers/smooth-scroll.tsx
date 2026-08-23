"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/scroll-to-top";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__tasheelLenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      delete window.__tasheelLenis;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
