import { Link } from "react-router-dom";
import { cn } from "@/lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 72" className={cn("block", className)} aria-hidden="true">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M36 8c15.464 0 28 12.536 28 28 0 6.62-2.3 12.71-6.14 17.45l7.36 7.36-4.24 4.24-7.7-7.7A27.9 27.9 0 0 1 36 64C20.536 64 8 51.464 8 36S20.536 8 36 8Zm0 14c7.732 0 14 6.268 14 14s-6.268 14-14 14-14-6.268-14-14 6.268-14 14-14Z"
      />
    </svg>
  );
}

export function Logo({
  to = "/",
  inverted = false,
  withWord = true,
  className,
}: {
  to?: string;
  inverted?: boolean;
  withWord?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2.5 focus-visible:outline-offset-4",
        inverted ? "text-paper" : "text-ink",
        className,
      )}
    >
      <LogoMark className="h-7 w-7" />
      {withWord ? (
        <span className="text-[13px] font-medium uppercase tracking-[0.22em]">Quadrick</span>
      ) : (
        <span className="sr-only">Quadrick</span>
      )}
    </Link>
  );
}
