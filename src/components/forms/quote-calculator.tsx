"use client";

import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  floors: number;
  capacity: number;
  units: number;
  city: string;
  notes?: string;
};

const PROJECT_TYPES = [
  { value: "Commercial", key: "quote.commercial" },
  { value: "Residential", key: "quote.residential" },
  { value: "Hotel", key: "quote.hotel" },
  { value: "Hospital", key: "quote.hospital" },
  { value: "Mall", key: "quote.mall" },
  { value: "Villa", key: "quote.villa" },
  { value: "Government", key: "quote.government" },
] as const;

export function QuoteCalculator() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState(t("quote.failed"));

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().trim().min(2, t("quote.enterName")),
        email: z.string().trim().email(t("quote.enterEmail")),
        phone: z
          .string()
          .trim()
          .min(1, t("quote.phoneRequired"))
          .refine((value) => value.replace(/\D/g, "").length >= 7, t("quote.enterPhone")),
        projectType: z.string().min(1, t("quote.selectType")),
        floors: z.coerce.number().min(1, t("quote.enterFloors")).max(200),
        capacity: z.coerce.number().min(250, t("quote.minCapacity")).max(5000),
        units: z.coerce.number().min(1, t("quote.enterUnits")).max(50),
        city: z.string().trim().min(2, t("quote.enterCity")),
        notes: z.string().optional(),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as Resolver<FormValues>,
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
    setErrorMessage(t("quote.failed"));
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, estimate }),
      });
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(payload?.error || t("quote.failed"));
      setStatus("success");
      reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : t("quote.failed"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-electric" />
        <h3 className="mt-4 font-display text-2xl font-semibold">{t("quote.successTitle")}</h3>
        <p className="mt-2 text-muted">{t("quote.successBody")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label={t("quote.fullName")} error={errors.name?.message}>
            <input {...register("name")} className={inputClass} />
          </Field>
          <Field label={t("quote.email")} error={errors.email?.message}>
            <input {...register("email")} type="email" className={inputClass} />
          </Field>
          <Field label={t("quote.phone")} error={errors.phone?.message}>
            <input {...register("phone")} className={inputClass} />
          </Field>
          <Field label={t("quote.city")} error={errors.city?.message}>
            <input {...register("city")} className={inputClass} />
          </Field>
          <Field label={t("quote.projectType")} error={errors.projectType?.message}>
            <select {...register("projectType")} className={inputClass}>
              {PROJECT_TYPES.map((item) => (
                <option key={item.value} value={item.value}>
                  {t(item.key)}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("quote.units")} error={errors.units?.message}>
            <input {...register("units")} type="number" className={inputClass} />
          </Field>
          <Field label={t("quote.floors")} error={errors.floors?.message}>
            <input {...register("floors")} type="number" className={inputClass} />
          </Field>
          <Field label={t("quote.capacity")} error={errors.capacity?.message}>
            <input {...register("capacity")} type="number" className={inputClass} />
          </Field>
        </div>
        <label className="block text-sm">
          <span className="mb-2 block font-medium">{t("quote.notes")}</span>
          <textarea
            {...register("notes")}
            rows={4}
            className={inputClass}
            placeholder={t("quote.notesPlaceholder")}
          />
        </label>
        {status === "error" && <p className="text-sm text-red-500">{errorMessage}</p>}
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {t("quote.submit")}
        </Button>
      </form>

      <aside className="h-fit rounded-3xl bg-navy-deep p-8 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-electric-bright">{t("quote.estimate")}</p>
        <p className="mt-4 font-display text-3xl font-bold md:text-4xl">
          OMR {estimate.low.toLocaleString()} – {estimate.high.toLocaleString()}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-silver/75">{t("quote.estimateBody")}</p>
        <ul className="mt-6 space-y-2 text-sm text-silver/70">
          <li>• {t("quote.bullet1")}</li>
          <li>• {t("quote.bullet2")}</li>
          <li>• {t("quote.bullet3")}</li>
        </ul>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/20";
