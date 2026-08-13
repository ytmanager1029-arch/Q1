import { useState } from "react";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { api, ApiError } from "@/lib/api";
import { formatDateTime } from "@/lib/format";

export function AdminSettingsPage() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      await api("/api/auth/password", {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setStatus("success");
      setMessage("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof ApiError ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl tracking-tightest">Settings</h1>
      <p className="mt-2 text-[14px] text-mute">Account and session. Public content lives in the frontend data files.</p>

      <section className="mt-8 border border-line bg-paper p-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Account</h2>
        <dl className="mt-4 space-y-3 text-[15px]">
          <div>
            <dt className="text-[12px] uppercase tracking-[0.12em] text-mute">Email</dt>
            <dd className="mt-1">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-[0.12em] text-mute">Role</dt>
            <dd className="mt-1">{user?.role}</dd>
          </div>
          <div>
            <dt className="text-[12px] uppercase tracking-[0.12em] text-mute">Last login</dt>
            <dd className="mt-1">{user?.lastLoginAt ? formatDateTime(user.lastLoginAt) : "—"}</dd>
          </div>
        </dl>
      </section>

      <form onSubmit={onSubmit} className="mt-6 border border-line bg-paper p-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Change password</h2>
        <label className="mt-5 block text-[12px] uppercase tracking-[0.12em] text-mute">
          Current password
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent py-2 text-[15px] normal-case text-ink outline-none"
          />
        </label>
        <label className="mt-5 block text-[12px] uppercase tracking-[0.12em] text-mute">
          New password
          <input
            type="password"
            required
            minLength={12}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-2 w-full border-b border-line bg-transparent py-2 text-[15px] normal-case text-ink outline-none"
          />
        </label>
        <p className="mt-2 text-[13px] text-mute">At least 12 characters, with a letter and a number.</p>
        {message ? (
          <p className={status === "error" ? "field-error mt-4 text-[14px]" : "mt-4 text-[14px]"} role="status">
            {message}
          </p>
        ) : null}
        <Button type="submit" className="mt-6" arrow={false} disabled={status === "loading"}>
          {status === "loading" ? "Saving…" : "Update password"}
        </Button>
      </form>
    </div>
  );
}
