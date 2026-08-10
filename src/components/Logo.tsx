import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SIZE = 1252;

type LogoProps = {
  className?: string;
  height?: number;
  priority?: boolean;
  href?: string | null;
  withWordmark?: boolean;
  lightWordmark?: boolean;
};

/**
 * Tasheel brand mark + Engineering wordmark.
 * Original logo artwork unchanged.
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
      alt="Tasheel Engineering Logo"
      width={LOGO_SIZE}
      height={LOGO_SIZE}
      priority={priority}
      quality={100}
      sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 72px"
      className={cn(
        "aspect-square w-auto object-contain object-center select-none",
        "drop-shadow-[0_2px_8px_rgba(15,23,42,0.18)]",
        "transition-transform duration-200 ease-out group-hover:scale-[1.03]",
        !height && "h-11 sm:h-12 md:h-[52px] lg:h-14",
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
              "font-display text-[15px] font-extrabold tracking-[0.02em] sm:text-base lg:text-lg",
              lightWordmark ? "text-white" : "text-[#0F172A]"
            )}
          >
            TASHEEL
          </span>
          <span
            className={cn(
              "mt-0.5 font-mono text-[9px] font-medium tracking-[0.22em] uppercase sm:text-[10px]",
              lightWordmark ? "text-sky-300" : "text-[#0284C7]"
            )}
          >
            Engineering
          </span>
        </span>
      )}
    </span>
  );

  if (href === null) return content;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2"
      aria-label="Tasheel Engineering home"
    >
      {content}
    </Link>
  );
}
