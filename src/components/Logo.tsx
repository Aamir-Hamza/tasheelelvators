import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Square brand mark — Elevator letter head-04.png */
const LOGO_SIZE = 1252;

type LogoProps = {
  className?: string;
  /** CSS height in px; width stays 1:1 */
  height?: number;
  priority?: boolean;
  href?: string | null;
  /** Show “Tasheel Elevators” wordmark beside the mark */
  withWordmark?: boolean;
  /** Adapt wordmark for dark/glass hero header */
  lightWordmark?: boolean;
};

/**
 * Official Tasheel Elevators letterhead mark.
 * Original artwork only — no recolor or crop.
 */
export function Logo({
  className,
  height,
  priority = false,
  href = "/",
  withWordmark = false,
  lightWordmark = false,
}: LogoProps) {
  const image = (
    <Image
      src="/logo.png"
      alt="Tasheel Elevators Logo"
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      priority={priority}
      quality={100}
      sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
      className={cn(
        "aspect-square w-auto object-contain object-center select-none",
        "drop-shadow-[0_2px_8px_rgba(10,22,40,0.18)]",
        "transition-transform duration-200 ease-out group-hover:scale-[1.03]",
        !height && "h-12 sm:h-14 md:h-[60px] lg:h-16",
        className
      )}
      style={height ? { height, width: height } : undefined}
    />
  );

  const content = (
    <span className="group inline-flex items-center gap-3">
      {image}
      {withWordmark && (
        <span className="hidden min-[420px]:flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-[15px] font-bold tracking-[0.04em] sm:text-base lg:text-lg",
              lightWordmark ? "text-white" : "text-[#2B4169]"
            )}
          >
            TASHEEL
          </span>
          <span
            className={cn(
              "mt-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase sm:text-[11px]",
              lightWordmark ? "text-[#7EB6E8]" : "text-[#4A89C6]"
            )}
          >
            Elevators
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A89C6] focus-visible:ring-offset-2"
      aria-label="Tasheel Elevators home"
    >
      {content}
    </Link>
  );
}
