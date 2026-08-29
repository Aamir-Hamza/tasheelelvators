"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export class HomeErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-950 px-6 py-24 text-center text-white">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
            Tasheel Engineering
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold">This section could not be loaded</h1>
          <p className="mt-3 max-w-md text-sm text-slate-300">
            Please try again, or switch category from the tabs above.
          </p>
          <button
            type="button"
            className="mt-8 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
