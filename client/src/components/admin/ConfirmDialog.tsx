import { useEffect, useId, useRef } from "react";
import { Button } from "@/components/Button";

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  onConfirm,
  onClose,
  busy = false,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className="w-[min(440px,calc(100vw-2rem))] border border-line bg-paper p-0 text-ink backdrop:bg-ink/40"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 id={titleId} className="text-xl tracking-tightest">
          {title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">{body}</p>
        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm} disabled={busy} arrow={false}>
            {busy ? "Working…" : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
