"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-950 px-6 py-24 text-center text-white">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
        Tasheel Engineering
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold">This page could not be loaded</h1>
      <p className="mt-3 max-w-md text-sm text-slate-300">
        Please try again. If the problem continues, return to the homepage or contact us.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950"
        >
          Try again
        </button>
        <Link
          href="/?category=elevators"
          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
