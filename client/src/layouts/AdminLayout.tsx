import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  ScrollText,
  Settings,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";
import { Seo } from "@/components/Seo";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/inquiries", label: "Inquiries", icon: ClipboardList },
  { to: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-paper text-mute">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  async function onLogout() {
    await logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-svh bg-mist">
      <Seo title="Admin" path="/admin" noindex />
      <a href="#admin-main" className="skip-link">
        Skip to admin content
      </a>
      <div className="flex min-h-svh">
        <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-paper md:flex">
          <div className="flex h-[72px] items-center border-b border-line px-5">
            <Logo to="/admin" />
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Admin">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 text-[13px] tracking-[0.04em]",
                    isActive ? "bg-ink text-paper" : "text-mute hover:bg-mist hover:text-ink",
                  )
                }
              >
                <l.icon className="h-4 w-4" strokeWidth={1.6} />
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-line p-4">
            <p className="truncate text-[12px] text-mute">{user.email}</p>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="mt-3 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] text-ink"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-[72px] items-center justify-between border-b border-line bg-paper px-4 md:px-8">
            <div className="flex items-center gap-3 md:hidden">
              <LogoMark className="h-6 w-6" />
              <span className="text-[13px] uppercase tracking-[0.18em]">Admin</span>
            </div>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-mute md:block">
              Quadrick Admin
            </p>
            <div className="flex items-center gap-4">
              <p className="hidden text-[13px] text-mute sm:block">{user.email}</p>
              <button
                type="button"
                onClick={() => void onLogout()}
                className="text-[12px] uppercase tracking-[0.12em]"
              >
                Logout
              </button>
            </div>
          </header>

          <nav className="flex gap-1 overflow-x-auto border-b border-line bg-paper px-3 py-2 md:hidden" aria-label="Admin mobile">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    "shrink-0 px-3 py-2 text-[12px] uppercase tracking-[0.12em]",
                    isActive ? "bg-ink text-paper" : "text-mute",
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <main id="admin-main" className="flex-1 px-4 py-8 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
