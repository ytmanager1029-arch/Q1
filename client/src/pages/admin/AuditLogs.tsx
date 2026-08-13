import { useEffect, useState } from "react";
import { api, type AuditItem } from "@/lib/api";
import { actionLabel, formatDateTime } from "@/lib/format";

const actions = [
  "",
  "admin.login",
  "admin.logout",
  "inquiry.created",
  "inquiry.status_changed",
  "inquiry.priority_changed",
  "inquiry.deleted",
  "admin.password_changed",
];

export function AdminAuditLogsPage() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sp = new URLSearchParams({ page: String(page), limit: "30" });
    if (action) sp.set("action", action);
    setLoading(true);
    api<{ items: AuditItem[]; pages: number }>(`/api/admin/audit-logs?${sp}`)
      .then((d) => {
        setItems(d.items);
        setPages(d.pages);
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, [page, action]);

  return (
    <div>
      <h1 className="text-3xl tracking-tightest">Audit Logs</h1>
      <p className="mt-2 text-[14px] text-mute">Append-only. These records cannot be edited here.</p>

      <label className="mt-6 block max-w-xs text-[11px] uppercase tracking-[0.12em] text-mute">
        Action
        <select
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            setPage(1);
          }}
          className="mt-2 w-full border-b border-line bg-transparent py-2 text-[14px] normal-case text-ink"
        >
          <option value="">All</option>
          {actions.filter(Boolean).map((a) => (
            <option key={a} value={a}>
              {actionLabel(a)}
            </option>
          ))}
        </select>
      </label>

      {loading ? <p className="mt-8 text-mute">Loading audit logs…</p> : null}
      {error ? <p className="mt-8 field-error">{error}</p> : null}
      {!loading && items.length === 0 ? <p className="mt-8 text-mute">No audit events yet.</p> : null}

      {items.length > 0 ? (
        <ul className="mt-6 divide-y divide-line border border-line bg-paper">
          {items.map((item) => (
            <li key={item._id} className="grid gap-2 px-4 py-4 md:grid-cols-12 md:items-start">
              <p className="font-mono text-[11px] text-mute md:col-span-3">
                {formatDateTime(item.timestamp)}
              </p>
              <div className="md:col-span-9">
                <p className="text-[15px]">{actionLabel(item.action)}</p>
                <p className="mt-1 text-[13px] text-mute">
                  {item.entityType}
                  {item.metadata && Object.keys(item.metadata).length
                    ? ` · ${Object.entries(item.metadata)
                        .map(([k, v]) => `${k}: ${String(v)}`)
                        .join(" · ")}`
                    : ""}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex items-center justify-between text-[13px]">
        <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-40">
          Previous
        </button>
        <p className="font-mono text-mute">
          {page} / {pages}
        </p>
        <button type="button" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="disabled:opacity-40">
          Next
        </button>
      </div>
    </div>
  );
}
