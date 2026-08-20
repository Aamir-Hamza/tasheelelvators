"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";
import type { PortalSolution } from "@/data/division-portals";
import { cn } from "@/lib/utils";

const COPY_KEYS: Record<string, { title: string; desc: string }> = {
  "Puzzle Parking System": { title: "portal.puzzleTitle", desc: "portal.puzzleDesc" },
  "Escalator Walking": { title: "portal.escalatorTitle", desc: "portal.escalatorDesc" },
  "Platform Lift / Home Lift": { title: "portal.platformTitle", desc: "portal.platformDesc" },
  "Stair Lift": { title: "portal.stairTitle", desc: "portal.stairDesc" },
  "Cargo Lift Supplier": { title: "portal.cargoTitle", desc: "portal.cargoDesc" },
};

export function ElevatorSolutionsGrid({ solutions }: { solutions: PortalSolution[] }) {
  const { t } = useI18n();
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!videoId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVideoId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [videoId]);

  return (
    <>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((item, index) => {
          const keys = COPY_KEYS[item.title];
          const title = keys ? t(keys.title) : item.title;
          const description = keys ? t(keys.desc) : item.description;
          const featured = Boolean(item.videoId);

          const Card = featured ? "button" : "article";

          return (
            <Card
              key={item.title}
              {...(featured
                ? {
                    type: "button" as const,
                    onClick: () => setVideoId(item.videoId!),
                  }
                : {})}
              className={cn(
                "group overflow-hidden rounded-3xl border border-border bg-card text-start shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]",
                featured && "sm:col-span-2 lg:col-span-2"
              )}
            >
              {item.image && (
                <div className={cn("relative overflow-hidden", featured ? "aspect-[16/9]" : "aspect-[16/10]")}>
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    sizes={featured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  {item.videoId && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition group-hover:scale-110">
                        <Play className="ms-0.5 h-7 w-7 fill-current" />
                      </span>
                    </span>
                  )}
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold md:text-xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
                {item.videoId && (
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700">
                    <Play className="h-3.5 w-3.5 fill-current" />
                    {t("portal.watchVideo")}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {videoId && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            aria-label={t("portal.closeVideo")}
            onClick={() => setVideoId(null)}
          />
          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="font-display text-sm font-semibold text-white">{t("portal.puzzleTitle")}</p>
              <button
                type="button"
                onClick={() => setVideoId(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white"
                aria-label={t("portal.closeVideo")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={t("portal.puzzleTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
