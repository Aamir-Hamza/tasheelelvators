"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useBrand } from "@/components/providers/brand-provider";

const LOGO_SIZE = 1252;

type LogoProps = {
  className?: string;
  height?: number;
  priority?: boolean;
  href?: string | null;
  withWordmark?: boolean;
  lightWordmark?: boolean;
  /** When true, wordmark follows hero/portal brand; otherwise stable chrome brand */
  dynamicBrand?: boolean;
};

/**
 * Tasheel brand mark + wordmark.
 * dynamicBrand=true → follows division preview (header)
 * dynamicBrand=false → stable group/portal chrome (footer)
 */
export function Logo({
  className,
  height,
  priority = false,
  href = "/",
  withWordmark = false,
  lightWordmark = false,
  dynamicBrand = false,
}: LogoProps) {
  const { brand, chromeBrand } = useBrand();
  const active = dynamicBrand ? brand : chromeBrand;

  const title = active.name;
  const subtitle = active.subtitle;
  const accentClass = lightWordmark ? active.accent.className : "text-[#0284C7]";
  const aria = active.ariaLabel;
  const linkHref = href === null ? null : href;

  const image = (
    <Image
      src="/logo.png"
      alt={aria}
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      priority={priority}
      quality={100}
      sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
      className={cn(
        "aspect-square w-auto object-contain object-center select-none",
        "drop-shadow-[0_2px_8px_rgba(15,23,42,0.18)]",
        "transition-transform duration-200 ease-out group-hover:scale-[1.03]",
        !height && "h-9 sm:h-10 md:h-11 lg:h-12",
        className
      )}
      style={height ? { height, width: height } : undefined}
    />
  );

  const content = (
    <span className="group inline-flex max-w-full items-center gap-2 sm:gap-3">
      {image}
      {withWordmark && (
        <span className="hidden min-w-0 flex-col leading-none min-[380px]:flex">
          <span
            className={cn(
              "font-display text-[13px] font-extrabold tracking-[0.02em] transition-colors duration-300 sm:text-[15px] lg:text-base",
              lightWordmark ? "text-white" : "text-[#0F172A]"
            )}
          >
            {title}
          </span>
          <span
            className={cn(
              "mt-0.5 max-w-[110px] truncate font-mono text-[7px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 sm:max-w-[160px] sm:text-[8px] md:max-w-[200px] lg:max-w-[220px] lg:text-[9px] xl:max-w-[260px] xl:text-[10px] xl:tracking-[0.16em]",
              accentClass
            )}
            title={subtitle}
          >
            {subtitle}
          </span>
        </span>
      )}
    </span>
  );

  if (linkHref === null) return content;

  return (
    <Link
      href={linkHref}
      className="inline-flex shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent,#0284C7)] focus-visible:ring-offset-2"
      aria-label={aria}
    >
      {content}
    </Link>
  );
}
