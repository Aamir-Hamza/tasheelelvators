"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageProvider";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { refresh } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const next = search.get("next") || "/account";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || t("auth.failed"));
        return;
      }
      await refresh();
      router.push(next);
      router.refresh();
    } catch {
      setError(t("auth.network"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          {t("auth.email")}
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          {t("auth.password")}
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-sky-500"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full rounded-full">
        {loading ? t("auth.signingIn") : t("auth.signIn")}
      </Button>
      <p className="text-center text-sm text-slate-500">
        {t("auth.newTo")}{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-sky-700">
          {t("auth.create")}
        </Link>
      </p>
    </form>
  );
}
