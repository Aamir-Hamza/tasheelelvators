"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  BRANDS,
  DIVISION_QUERY_KEY,
  PORTAL_PATH_TO_BRAND,
  isHeroSlideId,
  type BrandId,
  type BrandProfile,
  type HeroSlideId,
} from "@/data/hero-slides";

type BrandContextValue = {
  brandId: BrandId;
  /** Active preview / portal brand (header + hero) */
  brand: BrandProfile;
  /** Stable chrome brand for footer — group on homepage, locked on portals */
  chromeBrand: BrandProfile;
  setBrandId: (id: BrandId, opts?: { syncUrl?: boolean }) => void;
  isHeroDriven: boolean;
  isPortalPage: boolean;
};

const BrandContext = createContext<BrandContextValue | null>(null);

function readDivisionFromLocation(): HeroSlideId | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get(DIVISION_QUERY_KEY);
  return isHeroSlideId(value) ? value : null;
}

/** Update ?division= without triggering Next.js navigation / remounts */
function patchHomeDivisionQuery(id: BrandId) {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") return;

  const url = new URL(window.location.href);
  if (id === "group") {
    url.searchParams.delete(DIVISION_QUERY_KEY);
  } else {
    url.searchParams.set(DIVISION_QUERY_KEY, id);
  }
  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    window.history.replaceState(window.history.state, "", next);
  }
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const portalBrand = PORTAL_PATH_TO_BRAND[pathname] ?? null;
  const isHome = pathname === "/";
  const isPortalPage = portalBrand !== null;

  // Initial state must match SSR — never read window here (causes hydration mismatch).
  // Home defaults to elevators on both server + client; URL ?division= syncs after mount.
  const [brandId, setBrandIdState] = useState<BrandId>(
    () => portalBrand ?? (pathname === "/" ? "elevators" : "group")
  );

  const setBrandId = useCallback(
    (id: BrandId, opts?: { syncUrl?: boolean }) => {
      setBrandIdState(id);
      if (opts?.syncUrl !== false && isHome) {
        patchHomeDivisionQuery(id);
      }
    },
    [isHome]
  );

  // Lock brand on portal pages; reset to group on other routes; home reads ?division=
  useEffect(() => {
    if (portalBrand) {
      setBrandIdState(portalBrand);
      return;
    }
    if (!isHome) {
      setBrandIdState("group");
      return;
    }
    const fromUrl = readDivisionFromLocation();
    setBrandIdState(fromUrl ?? "elevators");
  }, [portalBrand, isHome, pathname]);

  useEffect(() => {
    const brand = BRANDS[brandId];
    const root = document.documentElement;
    root.style.setProperty("--brand-accent", brand.accent.hex);
    root.style.setProperty("--brand-accent-soft", brand.accent.soft);
    root.style.setProperty("--brand-accent-glow", brand.accent.glow);
  }, [brandId]);

  const chromeBrand = isPortalPage ? BRANDS[brandId] : BRANDS.group;

  const value = useMemo<BrandContextValue>(
    () => ({
      brandId,
      brand: BRANDS[brandId],
      chromeBrand,
      setBrandId,
      isHeroDriven: isHome && brandId !== "group",
      isPortalPage,
    }),
    [brandId, chromeBrand, setBrandId, isHome, isPortalPage]
  );

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within BrandProvider");
  }
  return ctx;
}
