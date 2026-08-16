"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  HERO_SLIDER_AUTOPLAY_MS,
  HERO_SLIDER_SLIDES,
  type HeroSliderSlide,
} from "@/data/hero-slider";
import { cn } from "@/lib/utils";

export type HeroSliderProps = {
  slides?: HeroSliderSlide[];
  /** Autoplay interval in ms (default 6000). Set 0 to disable. */
  autoplayMs?: number;
  /**
   * When true, renders HTML typography + CTAs over the image.
   * Keep false when banners already include designed text/graphics.
   */
  showHtmlCopy?: boolean;
  className?: string;
};

export function HeroSlider({
  slides = HERO_SLIDER_SLIDES,
  autoplayMs = HERO_SLIDER_AUTOPLAY_MS,
  showHtmlCopy = false,
  className,
}: HeroSliderProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const count = slides.length;
  const slide = slides[index]!;

  const goTo = useCallback(
    (next: number, dir?: number) => {
      const normalized = ((next % count) + count) % count;
      setDirection(dir ?? (normalized > index ? 1 : -1));
      setIndex(normalized);
    },
    [count, index]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (reduceMotion || paused || autoplayMs <= 0 || count < 2) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [autoplayMs, count, paused, reduceMotion, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? 28 : -28,
    }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduceMotion ? 0 : dir > 0 ? -28 : 28,
    }),
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-slate-950",
        // Fully responsive hero heights (svh for mobile browser chrome)
        "h-[58svh] min-h-[360px] max-h-[560px]",
        "sm:h-[68svh] sm:min-h-[440px] sm:max-h-[640px]",
        "md:h-[75svh] md:min-h-[520px] md:max-h-none",
        "lg:h-[85vh] lg:min-h-[600px]",
        className
      )}
      aria-roledescription="carousel"
      aria-label="Tasheel Engineering hero slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 100vw"
            // Keep left-side banner text visible on narrow screens
            className="object-cover object-left sm:object-[20%_center] md:object-[30%_center] lg:object-center"
          />

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 sm:from-slate-950/50"
            aria-hidden
          />

          {showHtmlCopy && (
            <div className="absolute inset-0 z-[1] flex items-end sm:items-center">
              <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-0 sm:pt-24 lg:px-8">
                <div className="max-w-xl">
                  {slide.eyebrow && (
                    <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300 sm:mb-3 sm:text-[11px] sm:tracking-[0.28em]">
                      {slide.eyebrow}
                    </p>
                  )}
                  {slide.title && (
                    <h1 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-200 sm:mt-4 sm:text-base md:text-lg">
                      {slide.subtitle}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                    {slide.cta && (
                      <Link
                        href={slide.cta.href}
                        className="inline-flex items-center rounded-full bg-[#00A8E8] px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:brightness-110 sm:px-5 sm:py-3"
                      >
                        {slide.cta.label}
                      </Link>
                    )}
                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 sm:px-5 sm:py-3"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showHtmlCopy && slide.href && (
            <Link
              href={slide.href}
              className="absolute inset-0 z-[1]"
              aria-label={`Open ${slide.alt}`}
            >
              <span className="sr-only">Open slide destination</span>
            </Link>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls — compact on mobile, fuller on desktop */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-3 pb-4 sm:px-6 sm:pb-6 lg:px-10 lg:pb-7">
        <div className="flex items-center justify-between gap-3">
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:border-white/40 hover:bg-slate-950/70 sm:h-11 sm:w-11"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white backdrop-blur transition hover:border-white/40 hover:bg-slate-950/70 sm:h-11 sm:w-11"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div
            className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/45 px-2.5 py-1.5 backdrop-blur sm:gap-2 sm:px-3 sm:py-2"
            role="tablist"
            aria-label="Slide indicators"
          >
            {slides.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Go to slide ${i + 1}: ${item.alt}`}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 sm:h-2.5",
                    active ? "w-6 bg-[#00A8E8] sm:w-8" : "w-2 bg-white/40 hover:bg-white/70 sm:w-2.5"
                  )}
                />
              );
            })}
          </div>

          <p className="pointer-events-none min-w-[3.5rem] text-right font-mono text-[9px] uppercase tracking-[0.18em] text-white/70 sm:min-w-[4rem] sm:text-[10px] sm:tracking-[0.2em]">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
