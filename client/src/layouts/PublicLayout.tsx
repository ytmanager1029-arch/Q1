import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main" className="pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
