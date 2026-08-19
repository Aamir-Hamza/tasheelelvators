"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { useI18n } from "@/i18n/LanguageProvider";

const schema = z.object({
  serviceType: z.enum([
    "Engineering Design",
    "Elevators",
    "Smart Security",
    "Maintenance Contract",
  ]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 7, "Enter a valid phone number"),
  details: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

const SERVICE_TYPES = [
  { value: "Engineering Design", key: "estimator.engineeringDesign" },
  { value: "Elevators", key: "estimator.elevators" },
  { value: "Smart Security", key: "estimator.smartSecurity" },
  { value: "Maintenance Contract", key: "estimator.maintenance" },
] as const;

export function QuoteEstimator() {
  const { t } = useI18n();
  const stepLabels = [t("estimator.service"), t("estimator.details"), t("estimator.submit")];
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: "Engineering Design",
      name: "",
      email: "",
      phone: "",
      details: "",
    },
  });

  const serviceType = watch("serviceType");

  async function next() {
    if (step === 0) {
      const ok = await trigger("serviceType");
      if (ok) setStep(1);
      return;
    }
    if (step === 1) {
      const ok = await trigger(["name", "email", "phone", "details"]);
      if (ok) setStep(2);
    }
  }

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          projectType: data.serviceType,
          floors: 1,
          capacity: 1000,
          units: 1,
          city: "Muscat",
          notes: data.details,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="estimator" className="py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-sky-600" />
          <h2 className="mt-4 font-display text-3xl font-bold">{t("estimator.received")}</h2>
          <p className="mt-3 text-muted">{t("estimator.receivedBody")}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="estimator" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t("estimator.eyebrow")}
          title={t("estimator.title")}
          description={t("estimator.description")}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-slate-900 md:p-8"
        >
          <div className="mb-8 flex gap-2">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`h-1.5 rounded-full ${i <= step ? "bg-sky-600" : "bg-slate-200 dark:bg-white/10"}`}
                />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICE_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setValue("serviceType", type.value)}
                  className={`rounded-2xl border px-4 py-4 text-start text-sm font-semibold transition ${
                    serviceType === type.value
                      ? "border-sky-600 bg-sky-50 text-sky-900 dark:bg-sky-500/10 dark:text-sky-200"
                      : "border-slate-200 hover:border-slate-300 dark:border-white/10"
                  }`}
                >
                  {t(type.key)}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Field label={t("quote.fullName")} error={errors.name?.message}>
                <input {...register("name")} className={inputClass} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("quote.email")} error={errors.email?.message}>
                  <input {...register("email")} type="email" className={inputClass} />
                </Field>
                <Field label={t("quote.phone")} error={errors.phone?.message}>
                  <input {...register("phone")} className={inputClass} />
                </Field>
              </div>
              <Field label={t("estimator.projectDetails")} error={errors.details?.message}>
                <textarea {...register("details")} rows={4} className={inputClass} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 rounded-2xl bg-slate-50 p-5 text-sm dark:bg-white/5">
              <Row
                label={t("estimator.service")}
                value={SERVICE_TYPES.find((s) => s.value === serviceType)?.key ? t(SERVICE_TYPES.find((s) => s.value === serviceType)!.key) : serviceType}
              />
              <Row label={t("estimator.name")} value={watch("name")} />
              <Row label={t("quote.email")} value={watch("email")} />
              <Row label={t("quote.phone")} value={watch("phone")} />
              <Row label={t("estimator.details")} value={watch("details")} />
              {status === "error" && (
                <p className="text-red-500">{t("estimator.failed")}</p>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {t("estimator.back")}
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={next}>
                {t("estimator.continue")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            ) : (
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {t("estimator.submitInquiry")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
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
    <label className="block text-sm">
      <span className="mb-2 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-slate-200/80 py-2 dark:border-white/10">
      <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-white/10 dark:bg-slate-950";
