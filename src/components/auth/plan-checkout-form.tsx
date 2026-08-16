"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { DIVISION_PORTALS } from "@/data/division-portals";
import type { HeroSlideId } from "@/data/hero-slides";

function isDivision(value: string | null): value is HeroSlideId {
  return value === "elevators" || value === "cctv" || value === "maintenance";
}

export function PlanCheckoutForm() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const search = useSearchParams();
  const divisionParam = search.get("division");
  const planName = search.get("plan") || "";
  const division = isDivision(divisionParam) ? divisionParam : "maintenance";

  const portal = DIVISION_PORTALS[division];
  const plan = useMemo(
    () => portal.amcPlans.find((p) => p.name === planName) ?? portal.amcPlans[0],
    [portal, planName]
  );

  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <p className="text-sm text-muted">Checking account…</p>;

  if (!user) {
    const next = `/plans/checkout?division=${division}&plan=${encodeURIComponent(plan?.name ?? "")}`;
    return (
      <div className="rounded-3xl border border-border bg-card p-8">
        <h2 className="font-display text-xl font-bold">Sign in required</h2>
        <p className="mt-2 text-sm text-muted">
          Create an account or sign in to submit a plan request. Your details are stored securely in
          MongoDB.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/login?next=${encodeURIComponent(next)}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-electric px-7 text-sm font-semibold !text-white shadow-[0_10px_30px_rgba(27,143,255,0.35)] transition hover:bg-electric-bright"
          >
            Sign in
          </Link>
          <Link
            href={`/signup?next=${encodeURIComponent(next)}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-navy px-7 text-sm font-semibold !text-white transition hover:bg-navy-deep"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!plan) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/plans/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          division,
          planName: plan.name,
          planSummary: plan.summary,
          notes,
          contactPhone: phone || user!.phone,
          contactEmail: user!.email,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Could not submit plan request");
        return;
      }
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-border bg-card p-8">
        <h2 className="font-display text-xl font-bold text-sky-700">Request received</h2>
        <p className="mt-2 text-sm text-muted">
          Your <strong>{plan?.name}</strong> request is saved. Our team will contact you shortly.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/account">View my account</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-border bg-card p-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-700">
          {portal.title}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold">{plan?.name}</h2>
        <p className="mt-2 text-sm text-muted">{plan?.summary}</p>
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {plan?.features.map((f) => (
            <li key={f}>· {f}</li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="phone" className="text-sm font-medium">
          Contact phone
        </label>
        <input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={user.phone || "+968…"}
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
        />
      </div>

      <div>
        <label htmlFor="notes" className="text-sm font-medium">
          Notes / site details
        </label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={submitting} className="rounded-full">
        {submitting ? "Submitting…" : "Submit plan request"}
      </Button>
    </form>
  );
}
