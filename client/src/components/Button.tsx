import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "inverse" | "line";

type Common = {
  children: React.ReactNode;
  className?: string;
  arrow?: boolean;
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink/90 px-5 py-3 text-[13px] tracking-[0.06em] uppercase",
  inverse:
    "bg-paper text-ink hover:bg-mist px-5 py-3 text-[13px] tracking-[0.06em] uppercase",
  ghost:
    "bg-transparent text-ink px-0 py-2 text-[13px] tracking-[0.06em] uppercase",
  line: "bg-transparent text-ink px-0 py-2 text-[13px] tracking-[0.06em] uppercase underline underline-offset-4 decoration-line hover:decoration-ink",
};

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow ? <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden /> : null}
    </>
  );
}

export function ButtonLink({
  to,
  children,
  className,
  arrow = true,
  variant = "primary",
}: Common & { to: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "link-arrow inline-flex items-center gap-2 transition-colors",
        styles[variant],
        className,
      )}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  children,
  className,
  arrow = false,
  variant = "primary",
  ...props
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "link-arrow inline-flex items-center justify-center gap-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    >
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
