"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { useBrand } from "@/components/providers/brand-provider";
import {
  BRANDS,
  HERO_AUTOPLAY_MS,
  HERO_SLIDES,
  isHeroSlideId,
  type HeroSlide,
  type HeroSlideId,
} from "@/data/hero-slides";

const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[56vh] items-center justify-center bg-[#0B132B] lg:min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-700 border-t-[var(--brand-accent,#00A8E8)]" />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-[var(--brand-accent,#00A8E8)]">
              TE
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Loading Division Visual
          </p>
        </div>
      </div>
    ),
  }
);

function indexFromBrand(id: string) {
  const idx = HERO_SLIDES.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : 0;
}

function HeroStatCell({
  stat,
  slideId,
}: {
  stat: HeroSlide["stats"][number];
  slideId: string;
}) {
  if (typeof stat.numeric === "number" && Number.isInteger(stat.numeric)) {
    return (
      <div key={`${slideId}-${stat.label}`}>
        <p className="font-mono text-xl font-semibold text-white sm:text-2xl md:text-3xl">
          <AnimatedCounter value={stat.numeric} suffix={stat.suffix ?? ""} />
        </p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
          {stat.label}
        </p>
      </div>
    );
  }

  return (
    <div key={`${slideId}-${stat.label}`}>
      <p className="font-mono text-xl font-semibold text-white sm:text-2xl md:text-3xl">
        {stat.value}
      </p>
      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-400 sm:text-[10px]">
        {stat.label}
      </p>
    </div>
  );
}

function SlideTabs({
  activeId,
  progress,
  onSelect,
  onPreview,
  onOpenPortal,
  onPauseChange,
}: {
  activeId: HeroSlideId;
  progress: number;
  onSelect: (id: HeroSlideId) => void;
  onPreview: (id: HeroSlideId) => void;
  onOpenPortal: (id: HeroSlideId) => void;
  onPauseChange: (paused: boolean) => void;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Division brand switcher"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocusCapture={() => onPauseChange(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          onPauseChange(false);
        }
      }}
    >
      {HERO_SLIDES.map((slide) => {
        const active = slide.id === activeId;
        const accent = BRANDS[slide.brandId].accent.hex;
        return (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={active}
            title="Click to preview · Double-click to open portal"
            onMouseEnter={() => onPreview(slide.id)}
            onClick={() => onSelect(slide.id)}
            onDoubleClick={() => onOpenPortal(slide.id)}
            className={`group relative overflow-hidden rounded-full border px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.16em] transition sm:text-[10px] sm:tracking-[0.18em] ${
              active
                ? "border-white/30 text-white"
                : "border-white/10 bg-white/5 text-slate-400 hover:border-white/25 hover:text-slate-200"
            }`}
            style={
              active
                ? {
                    backgroundColor: BRANDS[slide.brandId].accent.soft,
                    borderColor: `${accent}80`,
                    boxShadow: `0 0 24px ${BRANDS[slide.brandId].accent.glow}`,
                  }
                : undefined
            }
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: active ? accent : "#64748b" }}
              />
              {slide.tab}
            </span>
            {active && (
              <span
                className="absolute inset-y-0 left-0 transition-[width] duration-75"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  backgroundColor: `${accent}40`,
                }}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function EngineeringHero() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const { brandId, setBrandId, brand } = useBrand();
  const [index, setIndex] = useState(() =>
    isHeroSlideId(brandId) ? indexFromBrand(brandId) : 0
  );
  const [committedId, setCommittedId] = useState<HeroSlideId>(() =>
    isHeroSlideId(brandId) ? brandId : "elevators"
  );
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const slide = HERO_SLIDES[index]!;
  const slideNumber = String(index + 1).padStart(2, "0");
  const accent = BRANDS[slide.brandId].accent;

  const applyDivision = useCallback(
    (id: HeroSlideId, syncUrl = true) => {
      setIndex(indexFromBrand(id));
      setProgress(0);
      setBrandId(id, { syncUrl });
      if (syncUrl) setCommittedId(id);
    },
    [setBrandId]
  );

  const goTo = useCallback(
    (id: HeroSlideId) => applyDivision(id, true),
    [applyDivision]
  );

  const preview = useCallback(
    (id: HeroSlideId) => {
      setIndex(indexFromBrand(id));
      setBrandId(id, { syncUrl: false });
    },
    [setBrandId]
  );

  const handleTabPause = useCallback(
    (nextPaused: boolean) => {
      setPaused(nextPaused);
      if (!nextPaused) {
        // Restore committed division after hover preview
        setIndex(indexFromBrand(committedId));
        setBrandId(committedId, { syncUrl: false });
      }
    },
    [committedId, setBrandId]
  );

  const openPortal = useCallback(
    (id: HeroSlideId) => {
      router.push(BRANDS[id].portalHref);
    },
    [router]
  );

  const nextSlide = useCallback(() => {
    const n = (index + 1) % HERO_SLIDES.length;
    applyDivision(HERO_SLIDES[n]!.id, true);
  }, [index, applyDivision]);

  const prevSlide = useCallback(() => {
    const n = (index - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    applyDivision(HERO_SLIDES[n]!.id, true);
  }, [index, applyDivision]);

  // Keep hero visuals in sync with brand context
  useEffect(() => {
    if (isHeroSlideId(brandId)) {
      setIndex(indexFromBrand(brandId));
    }
  }, [brandId]);

  useEffect(() => {
    if (reduceMotion || paused) return;

    const started = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const p = Math.min(elapsed / HERO_AUTOPLAY_MS, 1);
      setProgress(p);
      if (p >= 1) {
        nextSlide();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, reduceMotion, nextSlide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextSlide, prevSlide]);

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden text-white transition-[box-shadow] duration-500"
      style={{
        backgroundColor: "#0B132B",
        boxShadow: `inset 0 -120px 160px -120px ${accent.glow}`,
      }}
    >
      <div className="absolute inset-0 mesh-bg opacity-80" />
      <div className="absolute inset-0 noise-overlay opacity-25" />
      <div
        className="pointer-events-none absolute -right-20 top-1/4 h-[420px] w-[420px] rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: accent.soft }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-stretch gap-8 px-6 pb-28 pt-28 lg:grid-cols-2 lg:gap-0 lg:pb-0 lg:pt-0">
        <div className="order-1 flex flex-col justify-center lg:py-28 lg:pr-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p
                className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-[11px] sm:tracking-[0.26em]"
                style={{ color: accent.hex }}
              >
                {slide.taglineBanner}
              </p>

              <h1 className="font-display max-w-xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.1rem]">
                {slide.headline}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
                {slide.subheadline}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full text-slate-950 hover:brightness-110"
                  style={{ backgroundColor: accent.hex }}
                >
                  <Link href={slide.primaryCta.href}>
                    {slide.primaryCta.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href={slide.secondaryCta.href}>{slide.secondaryCta.label}</Link>
                </Button>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {slide.stats.map((stat) => (
                  <HeroStatCell key={stat.label} stat={stat} slideId={slide.id} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex flex-col gap-4 lg:mt-12">
            <SlideTabs
              activeId={slide.id}
              progress={progress}
              onSelect={goTo}
              onPreview={preview}
              onOpenPortal={openPortal}
              onPauseChange={handleTabPause}
            />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/40"
                aria-label="Previous division"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-white/40"
                aria-label="Next division"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                {slideNumber} / 0{HERO_SLIDES.length} · {brand.subtitle}
              </p>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
              Hover/click to preview · Double-click tab to open portal
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="order-2 relative h-[56vh] min-h-[400px] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0F1A33]/70 lg:h-screen lg:min-h-screen lg:rounded-none lg:border-0 lg:border-l lg:border-white/10 lg:bg-transparent"
          style={{ boxShadow: `0 0 80px ${accent.glow}` }}
        >
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_55%_42%,transparent_30%,rgba(11,19,43,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-[#0B132B]/70 to-transparent lg:from-[#0B132B]/35" />

          <div className="pointer-events-none absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-full border border-white/10 bg-[#0B132B]/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-200 backdrop-blur"
              >
                <span style={{ color: accent.hex }}>{slideNumber}</span>
                <span className="mx-2 text-slate-600">/</span>
                {slide.tab}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden">
            <HeroCanvas className="h-full lg:h-screen" scene={slide.scene} />
          </div>

          <div className="pointer-events-none absolute bottom-5 left-4 right-4 z-10 flex flex-wrap gap-2 sm:bottom-8 sm:left-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                className="flex flex-wrap gap-2"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {slide.nodes.map((node) => (
                  <span
                    key={node.id}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0B132B]/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 backdrop-blur"
                  >
                    <span style={{ color: accent.hex }}>{node.id}</span>
                    {node.label}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition hover:text-white lg:flex"
        aria-label="Scroll to services"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
