import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Seo } from "@/components/Seo";
import { useAuth } from "@/hooks/useAuth";
import { api, ApiError } from "@/lib/api";

export function AdminLoginPage() {
  const { user, loading, refresh } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      await refresh();
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Invalid credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-svh bg-paper md:grid-cols-2">
      <Seo title="Admin login" path="/admin/login" noindex />
      <div className="relative hidden flex-col justify-between border-r border-line bg-ink p-10 text-paper md:flex">
        <Logo inverted to="/" />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">Studio access</p>
          <p className="mt-4 max-w-sm text-4xl leading-[0.96] tracking-tightest">
            Quiet tools for the work that comes in.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/40">QRK / Admin</p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 md:px-16">
        <div className="md:hidden">
          <Logo />
        </div>
        <h1 className="mt-10 text-3xl tracking-tightest md:mt-0">Sign in</h1>
        <p className="mt-2 text-[15px] text-mute">Quadrick admin. Authorized use only.</p>

        <form onSubmit={onSubmit} className="mt-10 max-w-sm space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border-0 border-b border-line bg-transparent py-3 text-[15px] outline-none focus:border-ink"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border-0 border-b border-line bg-transparent py-3 text-[15px] outline-none focus:border-ink"
            />
          </div>

          {error ? (
            <p className="field-error text-[14px]" role="alert">
              {error}
            </p>
          ) : null}

          <Button type="submit" disabled={submitting} arrow={false} className="w-full">
            {submitting ? "Signing in…" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
