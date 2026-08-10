"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useProgress } from "@react-three/drei";
import { damp3 } from "maath/easing";
import * as THREE from "three";
import { EngineeringScene } from "./EngineeringScene";
import { HOTSPOTS, type HotspotId } from "./HotspotOverlay";

const CAMERA_TARGETS: Record<
  HotspotId | "default",
  { position: [number, number, number]; lookAt: [number, number, number] }
> = {
  default: { position: [3.1, 0.55, 5.6], lookAt: [0, 0.05, 0] },
  elevator: { position: [1.35, 0.55, 3.4], lookAt: [0.1, 0.2, 0.15] },
  cctv: { position: [3.35, 1.55, 3.15], lookAt: [1.2, 1.2, 0.4] },
  maintenance: { position: [2.05, -0.85, 4.0], lookAt: [0, -1.9, 0.2] },
};

function CameraRig({
  activeHotspot,
  scrollProgress,
}: {
  activeHotspot: HotspotId | null;
  scrollProgress: number;
}) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(...CAMERA_TARGETS.default.lookAt));
  const desiredLook = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const key = activeHotspot ?? "default";
    const target = CAMERA_TARGETS[key];

    desiredPos.current.set(...target.position);
    if (!activeHotspot) {
      desiredPos.current.y -= scrollProgress * 0.45;
      desiredPos.current.z += scrollProgress * 0.5;
    }

    desiredLook.current.set(...target.lookAt);

    damp3(camera.position, desiredPos.current, 0.35, delta);
    damp3(look.current, desiredLook.current, 0.4, delta);
    camera.lookAt(look.current);
  });

  return null;
}

function BrandLoader({ visible }: { visible: boolean }) {
  const { progress, active } = useProgress();
  const pct = Math.min(100, Math.round(progress));

  if (!visible && !active) return null;

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-sm">
      <div className="relative mb-5 h-14 w-14">
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-slate-700 border-t-sky-500 border-r-amber-500/70" />
        <div className="absolute inset-[7px] rounded-full bg-gradient-to-br from-slate-900 via-sky-950 to-amber-950/40" />
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-sky-300">
          TE
        </span>
      </div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-slate-400">
        Engineering Command Hub
      </p>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 to-amber-500 transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 font-mono text-[10px] text-slate-500">{pct}%</p>
    </div>
  );
}

type HeroCanvasProps = {
  className?: string;
};

export function HeroCanvas({ className }: HeroCanvasProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<HotspotId | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(window.innerHeight * 0.85, 1);
      setScrollProgress(Math.min(Math.max(window.scrollY / max, 0), 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, []);

  const onHotspotSelect = useCallback((id: HotspotId) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
  }, []);

  const dpr = useMemo<[number, number]>(() => (isMobile ? [1, 1.25] : [1, 2]), [isMobile]);
  const activeMeta = HOTSPOTS.find((h) => h.id === activeHotspot);

  return (
    <div
      className={`relative h-full min-h-[420px] w-full ${className ?? ""}`}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }}
    >
      <Suspense fallback={<BrandLoader visible />}>
        <BrandLoader visible={!ready} />
        <Canvas
          className="!absolute inset-0 touch-none"
          dpr={dpr}
          camera={{ position: [3.1, 0.55, 5.6], fov: 36, near: 0.1, far: 50 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.5 }}
          frameloop="always"
          onPointerMissed={() => setActiveHotspot(null)}
          onCreated={({ gl }) => {
            gl.setClearColor("#020617", 0);
            setReady(true);
          }}
        >
          <CameraRig activeHotspot={activeHotspot} scrollProgress={scrollProgress} />
          <EngineeringScene
            mouse={mouse}
            scrollProgress={scrollProgress}
            isMobile={isMobile}
            activeHotspot={activeHotspot}
            onHotspotSelect={onHotspotSelect}
          />
          <ContactShadows
            position={[0, -2.35, 0]}
            opacity={0.45}
            scale={9}
            blur={2.6}
            far={4.5}
          />
        </Canvas>
      </Suspense>

      {/* Desktop detail strip when focused */}
      {activeMeta && (
        <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 hidden sm:block">
          <div className="mx-auto max-w-sm rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">
              Zone focus · {activeMeta.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{activeMeta.title}</p>
            <p className="mt-0.5 text-[11px] text-slate-300">{activeMeta.subtitle}</p>
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 sm:bottom-6 sm:left-6">
        {[
          { c: "bg-sky-500", t: "Elevators" },
          { c: "bg-amber-500", t: "CCTV / Smart" },
          { c: "bg-slate-300", t: "Maintenance" },
        ].map((item) => (
          <span
            key={item.t}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${item.c}`} />
            {item.t}
          </span>
        ))}
      </div>

      {activeHotspot && (
        <p className="pointer-events-none absolute bottom-16 left-1/2 z-10 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 sm:bottom-20">
          Click canvas to reset view
        </p>
      )}
    </div>
  );
}
