"use client";

import { Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

export type HotspotId = "elevator" | "cctv" | "maintenance";

export type HotspotData = {
  id: HotspotId;
  label: string;
  title: string;
  subtitle: string;
  details: string[];
  accent: "cyan" | "amber" | "slate";
};

export const HOTSPOTS: HotspotData[] = [
  {
    id: "elevator",
    label: "01",
    title: "Tasheel Elevators",
    subtitle: "Vertical Mobility Solutions, Installation, Modernization",
    details: [
      "Passenger & freight elevators",
      "Escalators & moving walkways",
      "Modernization & safety upgrades",
    ],
    accent: "cyan",
  },
  {
    id: "cctv",
    label: "02",
    title: "Tasheel Smart Systems",
    subtitle: "AI-Driven CCTV, Smart Home Automation, IoT Security",
    details: [
      "AI surveillance & analytics",
      "Smart climate & lighting",
      "Access control & alarms",
    ],
    accent: "amber",
  },
  {
    id: "maintenance",
    label: "03",
    title: "Tasheel Maintenance",
    subtitle: "24/7 Monitoring, Preventive Maintenance, System Upgrades",
    details: [
      "Predictive diagnostics",
      "SLA-backed AMC programmes",
      "Emergency response network",
    ],
    accent: "slate",
  },
];

type HotspotOverlayProps = {
  hotspot: HotspotData;
  active: boolean;
  dimmed: boolean;
  onSelect: (id: HotspotId) => void;
  position: [number, number, number];
};

export function HotspotOverlay({
  hotspot,
  active,
  dimmed,
  onSelect,
  position,
}: HotspotOverlayProps) {
  const ring =
    hotspot.accent === "cyan"
      ? "border-sky-400/60 bg-sky-500/25 text-sky-100 shadow-[0_0_20px_rgba(2,132,199,0.45)]"
      : hotspot.accent === "amber"
        ? "border-amber-400/60 bg-amber-500/25 text-amber-100 shadow-[0_0_20px_rgba(217,119,6,0.45)]"
        : "border-slate-200/50 bg-slate-400/20 text-slate-100 shadow-[0_0_16px_rgba(148,163,184,0.35)]";

  return (
    <Html position={position} center distanceFactor={9} zIndexRange={[60, 0]} occlude={false}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(hotspot.id);
        }}
        className={cn(
          "group pointer-events-auto flex flex-col items-center gap-2 transition duration-300",
          dimmed && !active && "opacity-35 scale-90"
        )}
        aria-label={hotspot.title}
        aria-pressed={active}
      >
        <span
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition duration-300",
            ring,
            active && "scale-110 ring-2 ring-white/50"
          )}
        >
          <span className="font-mono text-[11px] font-bold">{hotspot.label}</span>
          <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />
        </span>

        {!active && (
          <span className="rounded-full border border-white/10 bg-slate-950/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-300 opacity-0 transition group-hover:opacity-100">
            {hotspot.title}
          </span>
        )}

        {active && (
          <div className="w-60 rounded-2xl border border-white/15 bg-slate-950/95 p-3.5 text-left shadow-2xl backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
              Command focus
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{hotspot.title}</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-300">{hotspot.subtitle}</p>
            <ul className="mt-2 space-y-1">
              {hotspot.details.map((d) => (
                <li key={d} className="text-[10px] text-slate-400">
                  · {d}
                </li>
              ))}
            </ul>
          </div>
        )}
      </button>
    </Html>
  );
}
