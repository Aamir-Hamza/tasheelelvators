"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const HEADER_NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

type NavbarProps = {
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
  inverted?: boolean;
};

export function Navbar({ onNavigate, variant = "desktop", inverted = false }: NavbarProps) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <nav aria-label="Mobile primary" className="flex flex-col gap-1">
        {HEADER_NAV.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              className={cn(
                "rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b8fff]",
                active
                  ? "bg-[#1b8fff]/10 text-[#0a1628]"
                  : "text-[#0a1628]/80 hover:bg-black/[0.04] hover:text-[#0a1628]"
              )}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
      {HEADER_NAV.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "group relative px-2.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b8fff] focus-visible:ring-offset-2 rounded-sm",
              inverted
                ? active
                  ? "text-white"
                  : "text-white/80 hover:text-white"
                : active
                  ? "text-[#0a1628]"
                  : "text-[#0a1628]/70 hover:text-[#0a1628]"
            )}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
            <span
              className={cn(
                "absolute inset-x-2.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-[#F57E25] transition-transform duration-300",
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
