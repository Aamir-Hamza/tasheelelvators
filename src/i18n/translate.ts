import type { Locale } from "./config";
import { en } from "./messages/en";
import { ar } from "./messages/ar";

type DeepString<T> = T extends string
  ? string
  : { [K in keyof T]: DeepString<T[K]> };

export type Messages = DeepString<typeof en>;

const catalogs: Record<Locale, Messages> = { en: en as Messages, ar: ar as Messages };

export function getMessages(locale: Locale): Messages {
  return catalogs[locale];
}

export function translate(
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>
): string {
  const value = key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, messages);

  if (typeof value !== "string") return key;
  if (!vars) return value;
  return value.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? ""));
}
