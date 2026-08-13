import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { site } from "@/data/site";
import { api, type Inquiry } from "@/lib/api";
import { formatDate } from "@/lib/format";

const statuses = ["New", "Contacted", "In Discussion", "Won", "Lost", "Archived"] as const;
const priorities = ["Low", "Medium", "High", "Urgent"] as const;

export function AdminInquiriesPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Inquiry | null>(null);
  const [deleting, setDeleting] = useState(false);

  const query = useMemo(
    () => ({
      q: params.get("q") ?? "",
      status: params.get("status") ?? "",
      priority: params.get("priority") ?? "",
      projectType: params.get("projectType") ?? "",
      from: params.get("from") ?? "",
      to: params.get("to") ?? "",
      sort: params.get("sort") ?? "newest",
      page: params.get("page") ?? "1",
    }),
    [params],
  );

  useEffect(() => {
    const sp = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    setLoading(true);
    setError("");
    api<{ items: Inquiry[]; total: number; pages: number }>(`/api/admin/inquiries?${sp}`)
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
        setPages(data.pages);
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, [query]);

  function update(next: Record<string, string>) {
    const sp = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => {
      if (v) sp.set(k, v);
      else sp.delete(k);
    });
    if (!("page" in next)) sp.set("page", "1");
    setParams(sp);
  }

  async function changeField(id: string, patch: { status?: string; priority?: string }) {
    const updated = await api<{ inquiry: Inquiry }>(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    });
    setItems((list) => list.map((i) => (i._id === id ? updated.inquiry : i)));
  }

  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await api(`/api/admin/inquiries/${pendingDelete._id}`, { method: "DELETE" });
      setItems((list) => list.filter((i) => i._id !== pendingDelete._id));
      setTotal((n) => n - 1);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <h1 className="text-3xl tracking-tightest">Inquiries</h1>
      <p className="mt-2 text-[14px] text-mute">{total} total</p>

      <div className="mt-6 grid gap-3 border border-line bg-paper p-4 md:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          Search
          <input
            type="search"
            defaultValue={query.q}
            placeholder="Name, email, company"
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") update({ q: (e.target as HTMLInputElement).value });
            }}
            onBlur={(e) => update({ q: e.target.value })}
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          Status
          <select
            value={query.status}
            onChange={(e) => update({ status: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          >
            <option value="">All</option>
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          Priority
          <select
            value={query.priority}
            onChange={(e) => update({ priority: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          >
            <option value="">All</option>
            {priorities.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          Project
          <select
            value={query.projectType}
            onChange={(e) => update({ projectType: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          >
            <option value="">All</option>
            {site.projectTypes.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          From
          <input
            type="date"
            value={query.from}
            onChange={(e) => update({ from: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          To
          <input
            type="date"
            value={query.to}
            onChange={(e) => update({ to: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-[11px] uppercase tracking-[0.12em] text-mute">
          Sort
          <select
            value={query.sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="border-b border-line bg-transparent py-2 text-[14px] normal-case tracking-normal text-ink outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
            <option value="updated">Recently updated</option>
          </select>
        </label>
      </div>

      {loading ? <p className="mt-8 text-mute">Loading inquiries…</p> : null}
      {error ? <p className="mt-8 field-error">{error}</p> : null}
      {!loading && !error && items.length === 0 ? (
        <p className="mt-8 text-mute">No inquiries yet.</p>
      ) : null}

      {!loading && items.length > 0 ? (
        <>
          <div className="mt-6 hidden overflow-hidden border border-line bg-paper lg:block">
            <table className="admin-table w-full text-left text-[14px]">
              <thead className="border-b border-line bg-mist">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <Link to={`/admin/inquiries/${item._id}`} className="underline-offset-2 hover:underline">
                        {item.name}
                      </Link>
                      <p className="text-[12px] text-mute">{item.email}</p>
                    </td>
                    <td className="px-4 py-3">{item.company || "—"}</td>
                    <td className="px-4 py-3">{item.projectType}</td>
                    <td className="px-4 py-3">
                      <select
                        aria-label={`Priority for ${item.name}`}
                        value={item.priority}
                        onChange={(e) => void changeField(item._id, { priority: e.target.value })}
                        className="bg-transparent"
                      >
                        {priorities.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        aria-label={`Status for ${item.name}`}
                        value={item.status}
                        onChange={(e) => void changeField(item._id, { status: e.target.value })}
                        className="bg-transparent"
                      >
                        {statuses.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-mute">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3 text-[12px] uppercase tracking-[0.1em]">
                        <Link to={`/admin/inquiries/${item._id}`}>Open</Link>
                        <button type="button" onClick={() => setPendingDelete(item)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-6 space-y-3 lg:hidden">
            {items.map((item) => (
              <li key={item._id} className="border border-line bg-paper p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/admin/inquiries/${item._id}`} className="text-[16px]">
                      {item.name}
                    </Link>
                    <p className="text-[13px] text-mute">
                      {item.company || item.email} · {item.projectType}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] text-mute">{formatDate(item.createdAt)}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <label className="text-[11px] uppercase tracking-[0.12em] text-mute">
                    Priority
                    <select
                      className="mt-1 w-full border-b border-line bg-transparent py-1 text-[14px] normal-case text-ink"
                      value={item.priority}
                      onChange={(e) => void changeField(item._id, { priority: e.target.value })}
                    >
                      {priorities.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-[11px] uppercase tracking-[0.12em] text-mute">
                    Status
                    <select
                      className="mt-1 w-full border-b border-line bg-transparent py-1 text-[14px] normal-case text-ink"
                      value={item.status}
                      onChange={(e) => void changeField(item._id, { status: e.target.value })}
                    >
                      {statuses.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="mt-4 flex gap-4 text-[12px] uppercase tracking-[0.12em]">
                  <Link to={`/admin/inquiries/${item._id}`}>Open</Link>
                  <button type="button" onClick={() => setPendingDelete(item)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between text-[13px]">
            <button
              type="button"
              disabled={Number(query.page) <= 1}
              onClick={() => update({ page: String(Number(query.page) - 1) })}
              className="disabled:opacity-40"
            >
              Previous
            </button>
            <p className="font-mono text-mute">
              {query.page} / {pages}
            </p>
            <button
              type="button"
              disabled={Number(query.page) >= pages}
              onClick={() => update({ page: String(Number(query.page) + 1) })}
              className="disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      ) : null}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this inquiry?"
        body="This cannot be undone. The action will be written to the audit log."
        onClose={() => setPendingDelete(null)}
        onConfirm={() => void confirmDelete()}
        busy={deleting}
      />
    </div>
  );
}
