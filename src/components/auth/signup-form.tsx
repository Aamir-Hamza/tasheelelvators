"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { refresh } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const next = search.get("next") || "/account";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Signup failed");
        return;
      }
      await refresh();
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {(
        [
          ["name", "Full name", "text"],
          ["email", "Email", "email"],
          ["phone", "Phone", "tel"],
          ["company", "Company (optional)", "text"],
          ["password", "Password (min 8 chars)", "password"],
        ] as const
      ).map(([key, label, type]) => (
        <div key={key}>
          <label htmlFor={key} className="text-sm font-medium text-slate-700">
            {label}
          </label>
          <input
            id={key}
            type={type}
            required={key !== "company" && key !== "phone"}
            minLength={key === "password" ? 8 : undefined}
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
          />
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full rounded-full">
        {loading ? "Creating account…" : "Create account"}
      </Button>
      <p className="text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-sky-700">
          Sign in
        </Link>
      </p>
    </form>
  );
}
