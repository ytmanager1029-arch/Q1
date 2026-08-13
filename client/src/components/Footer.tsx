import { Link } from "react-router-dom";
import { LogoMark } from "@/components/Logo";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-20">
        <p className="overflow-hidden text-[18vw] font-medium leading-[0.8] tracking-tightest text-ink md:text-[11vw] lg:text-[9.5rem]">
          QUADRICK
        </p>
        <div className="mt-12 flex items-start justify-between gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-7 w-7" />
              <span className="text-[13px] font-medium uppercase tracking-[0.22em]">Quadrick</span>
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-mute">
              A web development studio creating distinctive digital experiences for ambitious
              businesses.
            </p>
          </div>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-mute sm:block">
            QRK / 26.08
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Navigate</p>
            <ul className="mt-4 space-y-2">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-[15px] hover:text-mute">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Social</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="text-[15px] hover:text-mute">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="text-[15px] hover:text-mute">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.social.github} target="_blank" rel="noreferrer" className="text-[15px] hover:text-mute">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Contact</p>
            <ul className="mt-4 space-y-2 text-[15px]">
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-mute">
                  {site.email}
                </a>
              </li>
              <li className="text-mute">{site.location}</li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Legal</p>
            <ul className="mt-4 space-y-2">
              {site.legal.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-[15px] hover:text-mute">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-[12px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Quadrick. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Design + Development</p>
        </div>
      </div>
    </footer>
  );
}
