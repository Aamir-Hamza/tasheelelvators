"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  projectType: z.string().min(1),
  floors: z.number().min(1).max(200),
  capacity: z.number().min(250).max(5000),
  units: z.number().min(1).max(50),
  city: z.string().min(2),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuoteCalculator() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectType: "Commercial",
      floors: 10,
      capacity: 1000,
      units: 2,
      city: "Muscat",
    },
  });

  const floors = watch("floors");
  const capacity = watch("capacity");
  const units = watch("units");

  const estimate = useMemo(() => {
    const base = 18500;
    const floorFactor = Math.max(floors - 1, 1) * 1200;
    const capacityFactor = capacity * 8;
    const unitTotal = (base + floorFactor + capacityFactor) * units;
    return {
      low: Math.round(unitTotal * 0.85),
      high: Math.round(unitTotal * 1.2),
    };
  }, [floors, capacity, units]);

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, estimate }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-electric" />
        <h3 className="mt-4 font-display text-2xl font-semibold">Quote request received</h3>
        <p className="mt-2 text-muted">An engineer will contact you with a formal proposal.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm">
            <span className="mb-2 block font-medium">Full name</span>
            <input {...register("name")} className={inputClass} />
            {errors.name && <span className="text-xs text-red-500">Required</span>}
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Email</span>
            <input {...register("email")} type="email" className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Phone</span>
            <input {...register("phone")} className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">City</span>
            <input {...register("city")} className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Project type</span>
            <select {...register("projectType")} className={inputClass}>
              {["Commercial", "Residential", "Hotel", "Hospital", "Mall", "Villa", "Government"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                )
              )}
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Number of units</span>
            <input {...register("units", { valueAsNumber: true })} type="number" className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Floors served</span>
            <input {...register("floors", { valueAsNumber: true })} type="number" className={inputClass} />
          </label>
          <label className="text-sm">
            <span className="mb-2 block font-medium">Capacity (kg)</span>
            <input {...register("capacity", { valueAsNumber: true })} type="number" className={inputClass} />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">Notes</span>
          <textarea {...register("notes")} rows={4} className={inputClass} placeholder="Shaft size, finishes, timeline..." />
        </label>
        {status === "error" && <p className="text-sm text-red-500">Submission failed. Please retry.</p>}
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Submit Quote Request
        </Button>
      </form>

      <aside className="h-fit rounded-3xl bg-navy-deep p-8 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-electric-bright">Indicative estimate</p>
        <p className="mt-4 font-display text-3xl font-bold md:text-4xl">
          OMR {estimate.low.toLocaleString()} – {estimate.high.toLocaleString()}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-silver/75">
          This calculator provides a non-binding range for planning. Final pricing depends on
          specification, finishes, shaft conditions, and installation complexity.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-silver/70">
          <li>• Includes typical equipment supply baseline</li>
          <li>• Installation quoted after site survey</li>
          <li>• AMC packages available separately</li>
        </ul>
      </aside>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/20";
