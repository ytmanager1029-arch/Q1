import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type Inquiry } from "@/lib/api";
import { formatDate } from "@/lib/format";

type Stats = {
  total: number;
  newCount: number;
  highPriority: number;
  inDiscussion: number;
  won: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  recent: Inquiry[];
};

const statusOrder = ["New", "Contacted", "In Discussion", "Won", "Lost", "Archived"];
const priorityOrder = ["Urgent", "High", "Medium", "Low"];

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Stats>("/api/admin/stats")
      .then(setStats)
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-mute">Loading dashboard…</p>;
  if (error || !stats) return <p className="field-error">{error || "Unable to load."}</p>;

  const cards = [
    { label: "Total Inquiries", value: stats.total },
    { label: "New", value: stats.newCount },
    { label: "High Priority", value: stats.highPriority },
    { label: "In Discussion", value: stats.inDiscussion },
    { label: "Won", value: stats.won },
  ];

  return (
    <div>
      <h1 className="text-3xl tracking-tightest">Dashboard</h1>
      <p className="mt-2 text-[14px] text-mute">A simple read of what’s in the inbox.</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <li key={c.label} className="border border-line bg-paper px-4 py-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{c.label}</p>
            <p className="mt-3 text-3xl tracking-tightest">{c.value}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section className="border border-line bg-paper p-5">
          <h2 className="text-lg tracking-tightest">Status</h2>
          <ul className="mt-4 space-y-3">
            {statusOrder.map((s) => {
              const n = stats.byStatus[s] ?? 0;
              const pct = stats.total ? Math.round((n / stats.total) * 100) : 0;
              return (
                <li key={s}>
                  <div className="flex justify-between text-[13px]">
                    <span>{s}</span>
                    <span className="font-mono text-mute">{n}</span>
                  </div>
                  <div className="mt-1 h-px bg-line">
                    <div className="h-px bg-ink" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border border-line bg-paper p-5">
          <h2 className="text-lg tracking-tightest">Priority</h2>
          <ul className="mt-4 space-y-3">
            {priorityOrder.map((s) => {
              const n = stats.byPriority[s] ?? 0;
              const pct = stats.total ? Math.round((n / stats.total) * 100) : 0;
              return (
                <li key={s}>
                  <div className="flex justify-between text-[13px]">
                    <span>{s}</span>
                    <span className="font-mono text-mute">{n}</span>
                  </div>
                  <div className="mt-1 h-px bg-line">
                    <div className="h-px bg-ink" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-lg tracking-tightest">Recent inquiries</h2>
          <Link to="/admin/inquiries" className="text-[12px] uppercase tracking-[0.12em] underline underline-offset-4">
            View all
          </Link>
        </div>
        {stats.recent.length === 0 ? (
          <p className="mt-6 text-mute">No inquiries yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line bg-paper">
            {stats.recent.map((item) => (
              <li key={item._id}>
                <Link to={`/admin/inquiries/${item._id}`} className="flex flex-col gap-1 px-4 py-4 hover:bg-mist sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[15px]">{item.name}</p>
                    <p className="text-[13px] text-mute">
                      {item.company || item.email} · {item.projectType}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                    {item.status} · {formatDate(item.createdAt)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
