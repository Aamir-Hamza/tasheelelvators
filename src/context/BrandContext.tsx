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
import { usePathname, useRouter } from "next/navigation";
import {
  BRANDS_DATA,
  BRAND_STORAGE_KEY,
  isDivisionId,
  pathToDivision,
  type DivisionBrand,
  type DivisionId,
} from "@/config/brandsData";
import { BRANDS, type BrandId, type BrandProfile } from "@/data/hero-slides";

type BrandContextValue = {
  brandId: DivisionId;
  brand: DivisionBrand;
  chromeBrand: BrandProfile;
  footerBrand: BrandProfile;
  setBrandId: (id: DivisionId, opts?: { navigate?: boolean }) => void;
  isHeroDriven: boolean;
  isHome: boolean;
  isPortalPage: boolean;
};

const BrandContext = createContext<BrandContextValue | null>(null);

function applyBrandCss(division: DivisionBrand) {
  const root = document.documentElement;
  root.style.setProperty("--brand-accent", division.colors.hex);
  root.style.setProperty("--brand-accent-soft", division.colors.soft);
  root.style.setProperty("--brand-accent-glow", division.colors.glow);
  root.dataset.brand = division.id;
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const portalDivision = pathToDivision(pathname);
  const isHome = pathname === "/";
  const isPortalPage = portalDivision !== null;

  const [brandId, setBrandIdState] = useState<DivisionId>(portalDivision ?? "elevators");

  const setBrandId = useCallback(
    (id: DivisionId, opts?: { navigate?: boolean }) => {
      setBrandIdState(id);
      try {
        window.localStorage.setItem(BRAND_STORAGE_KEY, id);
      } catch {
        /* ignore quota / private mode */
      }
      if (opts?.navigate) {
        router.push(BRANDS_DATA[id].href);
      }
    },
    [router]
  );

  useEffect(() => {
    if (portalDivision) {
      setBrandIdState(portalDivision);
      try {
        window.localStorage.setItem(BRAND_STORAGE_KEY, portalDivision);
      } catch {
        /* ignore */
      }
      return;
    }

    if (!isHome) {
      try {
        const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
        if (isDivisionId(stored)) setBrandIdState(stored);
      } catch {
        /* ignore */
      }
      return;
    }

    try {
      const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
      setBrandIdState(isDivisionId(stored) ? stored : "elevators");
    } catch {
      setBrandIdState("elevators");
    }
  }, [portalDivision, isHome, pathname]);

  useEffect(() => {
    applyBrandCss(BRANDS_DATA[brandId]);
  }, [brandId]);

  const brand = BRANDS_DATA[brandId];
  const mappedBrandId = brandId as BrandId;
  const chromeBrand = BRANDS[mappedBrandId] ?? BRANDS.elevators;
  const footerBrand = isPortalPage ? chromeBrand : BRANDS.group;

  const value = useMemo<BrandContextValue>(
    () => ({
      brandId,
      brand,
      chromeBrand,
      footerBrand,
      setBrandId,
      isHeroDriven: isHome,
      isHome,
      isPortalPage,
    }),
    [brandId, brand, chromeBrand, footerBrand, setBrandId, isHome, isPortalPage]
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
