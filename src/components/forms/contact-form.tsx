"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/i18n/LanguageProvider";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("quote.enterName")),
        email: z.string().email(t("quote.enterEmail")),
        phone: z.string().min(8, t("quote.enterPhone")),
        company: z.string().optional(),
        subject: z.string().min(2, t("contact.addSubject")),
        message: z.string().min(10, t("contact.messageMin")),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-electric" />
        <h3 className="mt-4 font-display text-2xl font-semibold">{t("contact.sentTitle")}</h3>
        <p className="mt-2 text-muted">{t("contact.sentBody")}</p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          {t("contact.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={t("quote.fullName")} error={errors.name?.message}>
          <input {...register("name")} className={inputClass} placeholder={t("contact.namePh")} />
        </Field>
        <Field label={t("quote.email")} error={errors.email?.message}>
          <input {...register("email")} type="email" className={inputClass} placeholder={t("contact.emailPh")} />
        </Field>
        <Field label={t("quote.phone")} error={errors.phone?.message}>
          <input {...register("phone")} className={inputClass} placeholder={t("contact.phonePh")} />
        </Field>
        <Field label={t("contact.company")} error={errors.company?.message}>
          <input {...register("company")} className={inputClass} placeholder={t("contact.companyPh")} />
        </Field>
      </div>
      <Field label={t("contact.subject")} error={errors.subject?.message}>
        <input {...register("subject")} className={inputClass} placeholder={t("contact.subjectPh")} />
      </Field>
      <Field label={t("contact.message")} error={errors.message?.message}>
        <textarea {...register("message")} rows={5} className={inputClass} placeholder={t("contact.messagePh")} />
      </Field>
      {status === "error" && <p className="text-sm text-red-500">{t("contact.failedRetry")}</p>}
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full md:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {t("contact.send")}
      </Button>
    </form>
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

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/20";
