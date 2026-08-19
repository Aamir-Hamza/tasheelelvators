"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageProvider";

type Order = {
  id: string;
  division: string;
  planName: string;
  planSummary?: string;
  status: string;
  createdAt: string;
};

type Quote = {
  id: string;
  projectType?: string;
  city?: string;
  units?: number;
  floors?: number;
  createdAt: string;
  estimate?: { low?: number; high?: number };
};

export function AccountDashboard() {
  const { t } = useI18n();
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [quotesLoading, setQuotesLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/account");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      setOrdersLoading(true);
      setQuotesLoading(true);
      const [ordersRes, quotesRes] = await Promise.all([
        fetch("/api/plans/order"),
        fetch("/api/quote"),
      ]);
      const ordersData = await ordersRes.json();
      const quotesData = await quotesRes.json();
      if (ordersData.ok) setOrders(ordersData.orders);
      if (quotesData.ok) setQuotes(quotesData.quotes);
      setOrdersLoading(false);
      setQuotesLoading(false);
    })();
  }, [user]);

  if (loading || !user) {
    return <p className="text-sm text-muted">{t("common.loading")}</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-border bg-card p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-sky-700">{t("common.account")}</p>
          <h2 className="mt-2 font-display text-2xl font-bold">{user.name}</h2>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          {user.phone && <p className="text-sm text-muted">{user.phone}</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/quote">{t("nav.quote")}</Link>
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="rounded-full"
            onClick={async () => {
              await logout();
              router.push("/");
            }}
          >
            {t("common.signOut")}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="font-display text-xl font-bold">{t("common.orders")}</h3>
        <p className="mt-2 text-sm text-muted">
          AMC and service plan requests stored securely in your Tasheel account.
        </p>

        {ordersLoading ? (
          <p className="mt-6 text-sm text-muted">{t("common.loading")}</p>
        ) : orders.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-sm text-muted">
            {t("common.noOrders")}{" "}
            <Link href="/engineering#amc" className="font-semibold text-sky-700">
              {t("portal.amcTitle")}
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="rounded-2xl border border-border bg-card px-5 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{order.planName}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">
                      {order.division} · {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                    {order.status}
                  </span>
                </div>
                {order.planSummary && (
                  <p className="mt-2 text-sm text-muted">{order.planSummary}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-display text-xl font-bold">{t("common.quotes")}</h3>
        <p className="mt-2 text-sm text-muted">
          Quote submissions saved to your Tasheel account after you send the form.
        </p>

        {quotesLoading ? (
          <p className="mt-6 text-sm text-muted">{t("common.loading")}</p>
        ) : quotes.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-8 text-sm text-muted">
            {t("common.noQuotes")}{" "}
            <Link href="/quote" className="font-semibold text-sky-700">
              {t("nav.quote")}
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {quotes.map((quote) => (
              <li
                key={quote.id}
                className="rounded-2xl border border-border bg-card px-5 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{quote.projectType || "Quote request"}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">
                      {quote.city ? `${quote.city} · ` : ""}
                      {quote.units ? `${quote.units} units · ` : ""}
                      {quote.floors ? `${quote.floors} floors · ` : ""}
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {quote.estimate?.low && quote.estimate?.high ? (
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
                      OMR {quote.estimate.low.toLocaleString()} – {quote.estimate.high.toLocaleString()}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
