import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Button } from "@/components/Button";
import { api, type Inquiry } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

const statuses = ["New", "Contacted", "In Discussion", "Won", "Lost", "Archived"] as const;
const priorities = ["Low", "Medium", "High", "Urgent"] as const;

export function AdminInquiryDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!id) return;
    api<{ inquiry: Inquiry }>(`/api/admin/inquiries/${id}`)
      .then((d) => setInquiry(d.inquiry))
      .catch(() => setError("Inquiry not found."))
      .finally(() => setLoading(false));
  }, [id]);

  async function patch(next: { status?: string; priority?: string }) {
    if (!inquiry) return;
    const data = await api<{ inquiry: Inquiry }>(`/api/admin/inquiries/${inquiry._id}`, {
      method: "PATCH",
      body: JSON.stringify(next),
    });
    setInquiry(data.inquiry);
  }

  async function remove() {
    if (!inquiry) return;
    setBusy(true);
    try {
      await api(`/api/admin/inquiries/${inquiry._id}`, { method: "DELETE" });
      navigate("/admin/inquiries");
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <p className="text-mute">Loading inquiry…</p>;
  if (error || !inquiry) return <p className="field-error">{error || "Not found."}</p>;

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
        <Link to="/admin/inquiries" className="hover:text-ink">
          Inquiries
        </Link>
        <span className="mx-2">/</span>
        {inquiry.name}
      </p>
      <h1 className="mt-3 text-3xl tracking-tightest">{inquiry.name}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <section className="border border-line bg-paper p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Contact</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <Item label="Name" value={inquiry.name} />
              <Item label="Email" value={inquiry.email} href={`mailto:${inquiry.email}`} />
              <Item label="Phone" value={inquiry.phone || "—"} />
              <Item label="Company" value={inquiry.company || "—"} />
              <Item
                label="Website"
                value={inquiry.website || "—"}
                href={inquiry.website || undefined}
              />
            </dl>
          </section>

          <section className="border border-line bg-paper p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Project</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              <Item label="Type" value={inquiry.projectType} />
              <Item label="Budget" value={inquiry.budget || "—"} />
              <Item label="Timeline" value={inquiry.timeline || "—"} />
            </dl>
          </section>

          <section className="border border-line bg-paper p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Message</h2>
            <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed">{inquiry.message}</p>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <section className="border border-line bg-paper p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Management</h2>
            <label className="mt-4 block text-[12px] uppercase tracking-[0.12em] text-mute">
              Priority
              <select
                className="mt-2 w-full border-b border-line bg-transparent py-2 text-[15px] normal-case text-ink"
                value={inquiry.priority}
                onChange={(e) => void patch({ priority: e.target.value })}
              >
                {priorities.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label className="mt-4 block text-[12px] uppercase tracking-[0.12em] text-mute">
              Status
              <select
                className="mt-2 w-full border-b border-line bg-transparent py-2 text-[15px] normal-case text-ink"
                value={inquiry.status}
                onChange={(e) => void patch({ status: e.target.value })}
              >
                {statuses.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <Button type="button" className="mt-6 w-full" arrow={false} onClick={() => setConfirm(true)}>
              Delete
            </Button>
          </section>

          <section className="border border-line bg-paper p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Metadata</h2>
            <dl className="mt-4 space-y-3">
              <Item label="Source" value={inquiry.source || "—"} />
              <Item label="Created" value={formatDateTime(inquiry.createdAt)} />
              <Item label="Updated" value={formatDateTime(inquiry.updatedAt)} />
            </dl>
          </section>
        </aside>
      </div>

      <ConfirmDialog
        open={confirm}
        title="Delete this inquiry?"
        body="This cannot be undone. The deletion will be recorded in the audit log."
        onClose={() => setConfirm(false)}
        onConfirm={() => void remove()}
        busy={busy}
      />
    </div>
  );
}

function Item({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{label}</dt>
      <dd className="mt-1 text-[15px]">
        {href ? (
          <a href={href} className="underline underline-offset-2" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
