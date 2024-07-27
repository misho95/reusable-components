import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva(
  "capitalize disabled:opacity-50 duration-100 flex items-center gap-2",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-500 dark:bg-slate-300 text-slate-200 dark:text-slate-800 enabled:active:bg-slate-600 dark:enabled:active:bg-slate-200",
        secondary:
          "text-slate-800 dark:text-slate-200 shadow-[0_1px_3px] shadow-black/30 dark:shadow-white/30 enabled:active:bg-slate-200 dark:enabled:active:bg-slate-700",
        destructive: "bg-red-500 enabled:active:bg-red-600 text-slate-100 ",
        ghost:
          "enabled:active:bg-slate-500 enabled:active:text-slate-100 text-slate-800 dark:text-slate-100",
        link: "text-blue-500 hover:underline disabled:no-underline",
      },
      size: {
        sm: "py-[3px] px-2 text-sm",
        md: "py-[6px] px-4 text-base",
        lg: "py-[9px] px-6 text-lg",
        xl: "py-[12px] px-8 text-xl",
      },
      radius: {
        primary: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "primary",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, radius, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, radius, className }))}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
