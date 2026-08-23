"use client";

import Image from "next/image";
import type { CategoryData } from "@/data/servicesData";

export function ShowcaseSection({ content }: { content: CategoryData }) {
  return (
    <section className="border-t border-white/10 bg-slate-950 py-20 text-white md:py-28" aria-labelledby="showcase-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="showcase-heading" className="font-display text-3xl font-bold md:text-4xl">
          {content.showcaseTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">{content.showcaseDescription}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.showcase.map((item, i) => (
            <article
              key={item.title}
              className={
                i === 0
                  ? "overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] lg:col-span-2"
                  : "overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
              }
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <span className="absolute start-4 top-4 rounded-full bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
