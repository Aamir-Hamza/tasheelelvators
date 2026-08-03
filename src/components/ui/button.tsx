import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-electric text-white shadow-[0_10px_30px_rgba(27,143,255,0.35)] hover:bg-electric-bright hover:shadow-[0_14px_40px_rgba(27,143,255,0.45)]",
        secondary:
          "bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-md",
        outline:
          "border border-navy/15 bg-transparent text-navy hover:border-electric hover:text-electric dark:border-white/15 dark:text-white dark:hover:border-electric-bright",
        ghost: "text-foreground hover:bg-navy/5 dark:hover:bg-white/5",
        dark: "bg-navy text-white hover:bg-navy-deep",
      },
      size: {
        default: "h-12 px-7",
        sm: "h-10 px-5 text-xs",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
