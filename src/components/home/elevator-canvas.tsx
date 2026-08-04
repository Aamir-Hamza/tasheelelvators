"use client";

/**
 * CSS elevator visual — always visible (avoids WebGL disappearing).
 */
export function ElevatorCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Base atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(27,143,255,0.28),transparent_52%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_15%,rgba(74,168,255,0.14),transparent_38%)]" />

      {/* Left veil only — keeps copy readable without hiding the shaft */}
      <div className="absolute inset-y-0 left-0 w-[48%] bg-gradient-to-r from-navy-deep via-navy-deep/80 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy-deep to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-navy-deep to-transparent" />

      {/* Elevator shaft */}
      <div className="absolute inset-y-0 right-0 z-[1] flex w-[55%] items-center justify-center pr-6 sm:pr-10 lg:pr-20">
        <div className="relative h-[min(70vh,620px)] w-[min(48vw,270px)] min-w-[160px]">
          <div className="absolute inset-0 rounded-[1.5rem] border border-white/20 bg-gradient-to-b from-[#122036] via-[#0a1628] to-[#050d18] shadow-[0_0_100px_rgba(27,143,255,0.22)]">
            <div className="absolute inset-[10px] overflow-hidden rounded-[1.1rem] border border-white/10 bg-[#07111f]">
              {/* Rails */}
              <div className="absolute left-[16%] top-0 h-full w-[3px] bg-gradient-to-b from-white/5 via-[#b0becb] to-white/5" />
              <div className="absolute right-[16%] top-0 h-full w-[3px] bg-gradient-to-b from-white/5 via-[#b0becb] to-white/5" />

              {/* Floor lines */}
              {[14, 30, 46, 62, 78].map((top) => (
                <div
                  key={top}
                  className="absolute left-[8%] right-[8%] h-px bg-white/15"
                  style={{ top: `${top}%` }}
                />
              ))}

              {/* Cabin */}
              <div className="elevator-cabin absolute left-1/2 z-[2] w-[70%] -translate-x-1/2">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-white/25 bg-gradient-to-b from-[#3a4d68] to-[#182233] shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.2)]">
                  <div className="absolute inset-[11%] rounded-md border border-[#4aa8ff]/50 bg-[linear-gradient(165deg,rgba(120,190,255,0.45),rgba(27,143,255,0.12)_50%,rgba(8,18,32,0.55))] shadow-[inset_0_0_40px_rgba(27,143,255,0.35)]" />
                  <div className="absolute bottom-[11%] left-[11%] right-[11%] top-[11%] flex">
                    <div className="h-full w-1/2 border-r border-white/20 bg-white/5" />
                    <div className="h-full w-1/2 bg-white/[0.03]" />
                  </div>
                  <div className="absolute inset-x-[12%] top-[7%] h-1.5 rounded-full bg-[#6bb8ff] shadow-[0_0_18px_rgba(74,168,255,0.95)]" />
                  <div className="absolute bottom-[9%] left-1/2 flex -translate-x-1/2 gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#6bb8ff]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  </div>
                </div>
                <div className="absolute -inset-6 -z-10 rounded-full bg-[#1b8fff]/30 blur-3xl" />
              </div>
            </div>
          </div>

          <div className="absolute -right-8 top-[28%] h-44 w-44 rounded-full bg-electric/30 blur-3xl" />
          <div className="absolute -left-6 bottom-[22%] h-36 w-36 rounded-full bg-electric/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}
