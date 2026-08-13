import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { cn } from "@/lib/cn";

function Item({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-6 py-5 text-left"
        >
          <span className="flex gap-4 text-[17px] leading-snug md:text-[18px]">
            <span className="font-mono text-[12px] text-mute">{String(index + 1).padStart(2, "0")}</span>
            {q}
          </span>
          <span className="mt-1 shrink-0 text-mute" aria-hidden>
            {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={cn("faq-panel", open && "open")}>
        <div>
          <p className="max-w-2xl pb-6 pl-10 text-[15px] leading-relaxed text-mute md:pl-12">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList() {
  return (
    <div>
      {faqs.map((item, i) => (
        <Item key={item.q} {...item} index={i} />
      ))}
    </div>
  );
}
