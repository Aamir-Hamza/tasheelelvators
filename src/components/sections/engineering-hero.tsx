"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/shared/animated-counter";

const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[100svh] items-center justify-center bg-slate-950 lg:min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-700 border-t-sky-500 border-r-amber-500/70" />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-sky-300">
              TE
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500">
            Loading Command Hub
          </p>
        </div>
      </div>
    ),
  }
);

export function EngineeringHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden text-white">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 noise-overlay opacity-30" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-stretch gap-8 px-6 pb-24 pt-28 lg:grid-cols-2 lg:gap-0 lg:pb-0 lg:pt-0">
        {/* Left: copy */}
        <div className="order-1 flex flex-col justify-center lg:py-28 lg:pr-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300"
          >
            Engineering Design · Maintenance · Oman & GCC
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="font-display max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            <span className="block text-white">Tasheel Engineering</span>
            <span className="mt-2 block gradient-text">Precision that scales.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg"
          >
            Specialized engineering design and comprehensive maintenance — with dedicated
            divisions in elevators & escalators and CCTV & smart home systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full bg-sky-600 hover:bg-sky-500">
              <Link href="/#divisions">
                Explore Divisions <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              <Link href="/quote">Schedule Maintenance</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 grid max-w-xl grid-cols-2 gap-5 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {SITE.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl font-semibold text-white md:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: full-height interactive Command Hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="order-2 relative h-[56vh] min-h-[400px] w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50 shadow-[0_0_80px_rgba(2,132,199,0.18)] lg:h-screen lg:min-h-screen lg:rounded-none lg:border-0 lg:border-l lg:border-white/10 lg:bg-transparent lg:shadow-none"
        >
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_55%_42%,transparent_30%,rgba(2,6,23,0.5)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-slate-950/70 to-transparent lg:from-slate-950/40" />
          <HeroCanvas className="h-full lg:h-screen" />
        </motion.div>
      </div>

      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400 transition hover:text-white"
        aria-label="Scroll to services"
      >
        <span>Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
