"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BRANDS_DATA,
  BRAND_STORAGE_KEY,
  isDivisionId,
  pathToDivision,
  type DivisionBrand,
  type DivisionId,
} from "@/config/brandsData";
import { BRANDS, type BrandId, type BrandProfile } from "@/data/hero-slides";
import { CATEGORY_SLUG, parseCategoryParam } from "@/data/servicesData";

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

/** Isolated so useSearchParams does not blank the header/footer while hydrating. */
function BrandQuerySync({
  onQuery,
}: {
  onQuery: (id: DivisionId | null) => void;
}) {
  const searchParams = useSearchParams();
  const parsed = parseCategoryParam(
    searchParams.get("category") ?? searchParams.get("division")
  );

  useEffect(() => {
    onQuery(parsed);
  }, [parsed, onQuery]);

  return null;
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const portalDivision = pathToDivision(pathname);
  const isHome = pathname === "/";
  const isPortalPage = portalDivision !== null;

  const [brandId, setBrandIdState] = useState<DivisionId>(portalDivision ?? "elevators");
  const [queryDivision, setQueryDivision] = useState<DivisionId | null>(null);

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
        return;
      }
      if (isHome) {
        const slug = CATEGORY_SLUG[id];
        try {
          const current = new URLSearchParams(window.location.search).get("category");
          if (current !== slug) {
            router.push(`/?category=${slug}`, { scroll: false });
          }
        } catch {
          router.push(`/?category=${slug}`, { scroll: false });
        }
      }
    },
    [router, isHome]
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

    if (isHome) {
      if (queryDivision) {
        setBrandIdState(queryDivision);
        try {
          window.localStorage.setItem(BRAND_STORAGE_KEY, queryDivision);
        } catch {
          /* ignore */
        }
        return;
      }
      try {
        const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
        const next = isDivisionId(stored) ? stored : "elevators";
        setBrandIdState(next);
        router.replace(`/?category=${CATEGORY_SLUG[next]}`, { scroll: false });
      } catch {
        setBrandIdState("elevators");
        router.replace("/?category=elevators", { scroll: false });
      }
      return;
    }

    try {
      const stored = window.localStorage.getItem(BRAND_STORAGE_KEY);
      if (isDivisionId(stored)) setBrandIdState(stored);
    } catch {
      /* ignore */
    }
  }, [portalDivision, isHome, pathname, queryDivision, router]);

  useEffect(() => {
    applyBrandCss(BRANDS_DATA[brandId] ?? BRANDS_DATA.elevators);
  }, [brandId]);

  const brand = BRANDS_DATA[brandId] ?? BRANDS_DATA.elevators;
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

  return (
    <BrandContext.Provider value={value}>
      <Suspense fallback={null}>
        <BrandQuerySync onQuery={setQueryDivision} />
      </Suspense>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand must be used within BrandProvider");
  }
  return ctx;
}
