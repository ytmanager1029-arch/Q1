import { cn } from "@/lib/cn";
import { useInView } from "@/hooks/useInView";

export function Reveal({
  children,
  className,
  delay,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
  as?: "div" | "section" | "article" | "li" | "header";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", delay ? `reveal-d${delay}` : "", inView && "is-in", className)}
    >
      {children}
    </Tag>
  );
}

export function SectionLabel({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.18em] text-mute",
        className,
      )}
    >
      <span className="text-ink">{index}</span>
      <span className="mx-2 text-line">—</span>
      <span>{label}</span>
    </p>
  );
}
