import { useEffect, useId, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/Button";
import { site } from "@/data/site";
import { useLockBody } from "@/hooks/useLockBody";
import { useScrolled } from "@/hooks/useScroll";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const location = useLocation();
  const menuId = useId();

  useLockBody(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-line bg-paper/95 backdrop-blur-sm" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "text-[13px] tracking-[0.04em] text-mute transition-colors hover:text-ink",
                  isActive && "text-ink",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" className="px-4 py-2.5 text-[12px]">
            Start a Project
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-line bg-paper lg:hidden"
      >
        <nav className="flex flex-col px-5 py-6" aria-label="Mobile">
          {site.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "border-b border-line py-4 text-2xl tracking-tightest",
                  isActive ? "text-ink" : "text-mute",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/contact" className="mt-8 w-full justify-center">
            Start a Project
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
