import { useEffect } from "react";
import { ButtonLink } from "@/components/Button";
import { SectionLabel } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { services } from "@/data/services";

export function ServicesPage() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      el?.scrollIntoView({ block: "start" });
    }
  }, []);

  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Web design, development, e-commerce, web applications, SaaS, and website redesign from Quadrick."
      />

      <header className="border-b border-line">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <SectionLabel index="02" label="Services" />
          <h1 className="mt-6 max-w-[16ch] text-4xl leading-[0.94] tracking-tightest md:text-6xl">
            Everything you need to build better online.
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-mute">
            Design and engineering as one practice. Pick a starting point — most projects use more
            than one.
          </p>
        </div>
      </header>

      {services.map((svc, i) => (
        <section
          key={svc.id}
          id={svc.id}
          className="scroll-mt-24 border-b border-line"
        >
          <div className="mx-auto grid max-w-page gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
            <div className="md:col-span-5">
              <p className="font-mono text-[12px] text-mute">{svc.number}</p>
              <h2 className="mt-3 text-3xl tracking-tightest md:text-5xl">{svc.name}</h2>
              <p className="mt-5 max-w-md text-[16px] leading-relaxed text-mute">{svc.description}</p>
              {i === services.length - 1 ? null : (
                <div className="mt-8 hidden md:block">
                  <ButtonLink to="/contact" variant="ghost">
                    Start a Project
                  </ButtonLink>
                </div>
              )}
            </div>
            <div className="grid gap-10 md:col-span-7 md:grid-cols-2">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                  Deliverables
                </p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {svc.deliverables.map((d) => (
                    <li key={d} className="py-3 text-[15px]">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
                  Use cases
                </p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {svc.useCases.map((d) => (
                    <li key={d} className="py-3 text-[15px]">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-ink text-paper">
        <div className="mx-auto flex max-w-page flex-col items-start justify-between gap-8 px-5 py-20 md:flex-row md:items-end md:px-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">08 — Next</p>
            <h2 className="mt-4 text-4xl tracking-tightest md:text-5xl">Have a project in mind?</h2>
          </div>
          <ButtonLink to="/contact" variant="inverse">
            Start a Project
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
