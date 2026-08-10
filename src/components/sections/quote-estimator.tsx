"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";

const schema = z.object({
  serviceType: z.enum([
    "Engineering Design",
    "Elevators",
    "Smart Security",
    "Maintenance Contract",
  ]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  details: z.string().min(10),
});

type FormValues = z.infer<typeof schema>;

const steps = ["Service", "Details", "Submit"] as const;

export function QuoteEstimator() {
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
          <h2 className="mt-4 font-display text-3xl font-bold">Inquiry received</h2>
          <p className="mt-3 text-muted">Our engineering team will contact you shortly.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="estimator" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Quote Estimator"
          title="Interactive service inquiry"
          description="Select a service path and share project details — we respond with a tailored proposal."
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-white/10 dark:bg-slate-900 md:p-8"
        >
          <div className="mb-8 flex gap-2">
            {steps.map((label, i) => (
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
              {(
                [
                  "Engineering Design",
                  "Elevators",
                  "Smart Security",
                  "Maintenance Contract",
                ] as const
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setValue("serviceType", type)}
                  className={`rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${
                    serviceType === type
                      ? "border-sky-600 bg-sky-50 text-sky-900 dark:bg-sky-500/10 dark:text-sky-200"
                      : "border-slate-200 hover:border-slate-300 dark:border-white/10"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Field label="Full name" error={errors.name?.message}>
                <input {...register("name")} className={inputClass} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" error={errors.email?.message}>
                  <input {...register("email")} type="email" className={inputClass} />
                </Field>
                <Field label="Phone" error={errors.phone?.message}>
                  <input {...register("phone")} className={inputClass} />
                </Field>
              </div>
              <Field label="Project details" error={errors.details?.message}>
                <textarea {...register("details")} rows={4} className={inputClass} />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 rounded-2xl bg-slate-50 p-5 text-sm dark:bg-white/5">
              <Row label="Service" value={serviceType} />
              <Row label="Name" value={watch("name")} />
              <Row label="Email" value={watch("email")} />
              <Row label="Phone" value={watch("phone")} />
              <Row label="Details" value={watch("details")} />
              {status === "error" && (
                <p className="text-red-500">Submission failed. Please try again.</p>
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
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={next}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Submit Inquiry
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
