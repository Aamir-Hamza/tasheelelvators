"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(8, "Enter a valid phone number"),
  company: z.string().optional(),
  subject: z.string().min(2, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
        <h3 className="mt-4 font-display text-2xl font-semibold">Message sent</h3>
        <p className="mt-2 text-muted">Our team will respond within one business day.</p>
        <Button className="mt-6" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} className={inputClass} placeholder="Your name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input {...register("email")} type="email" className={inputClass} placeholder="you@company.com" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className={inputClass} placeholder="+968 ..." />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register("company")} className={inputClass} placeholder="Company name" />
        </Field>
      </div>
      <Field label="Subject" error={errors.subject?.message}>
        <input {...register("subject")} className={inputClass} placeholder="How can we help?" />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} rows={5} className={inputClass} placeholder="Project details, location, timeline..." />
      </Field>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again or call us.</p>
      )}
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full md:w-auto">
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send Message
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
