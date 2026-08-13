import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { FaqList } from "@/components/FaqList";
import { LogoMark } from "@/components/Logo";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal, SectionLabel } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { WorkGrid } from "@/components/WorkGrid";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { principles, technologies, testimonials } from "@/data/testimonials";

export function Home() {
  return (
    <>
      <Seo path="/" />

      <section className="relative isolate overflow-hidden">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden />
        <div className="pointer-events-none absolute -right-16 top-20 hidden text-ink/[0.05] md:block" aria-hidden>
          <LogoMark className="h-[28rem] w-[28rem]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-page flex-col justify-between px-5 pb-0 md:px-8">
          <div className="flex items-center justify-between pt-8">
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-oxide opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-oxide" />
              </span>
              Available for new projects
            </p>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-mute sm:block">
              QRK — Studio / 26.08
            </p>
          </div>

          <div className="py-16 md:py-20">
            <h1 className="max-w-[18ch] text-[42px] font-medium leading-[0.92] tracking-tightest sm:text-6xl md:text-7xl lg:text-[88px]">
              Digital experiences built to move businesses forward.
            </h1>

            <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-end">
              <p className="max-w-md text-[16px] leading-relaxed text-mute md:col-span-6 md:text-[17px]">
                Quadrick designs and develops high-performance websites and web applications for
                ambitious businesses, startups, and founders.
              </p>
              <div className="flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end">
                <ButtonLink to="/contact">Start a Project</ButtonLink>
                <ButtonLink to="/work" variant="ghost">
                  View Our Work
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="border-t border-line py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mute">
              {site.trust.join("  ·  ")}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-page gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="md:col-span-4">
            <SectionLabel index="01" label="Quadrick" />
          </Reveal>
          <div className="md:col-span-8">
            <Reveal>
              <h2 className="max-w-[16ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl lg:text-[56px]">
                We turn ideas into digital experiences.
              </h2>
            </Reveal>
            <Reveal delay={1} className="mt-8 max-w-xl space-y-5 text-[16px] leading-relaxed text-mute">
              <p>
                Quadrick is a web development studio focused on creating distinctive, fast,
                functional digital experiences.
              </p>
              <p>
                We combine thoughtful design with modern development to create websites and web
                applications that look exceptional and work even better.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <SectionLabel index="02" label="Services" />
            </Reveal>
            <Reveal className="md:col-span-8">
              <h2 className="max-w-[14ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
                Everything you need to build better online.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 border-t border-line">
            {services.map((svc) => (
              <Link
                key={svc.id}
                to={`/services#${svc.id}`}
                className="service-row group grid grid-cols-12 items-center gap-4 border-b border-line px-2 py-6 md:px-3"
              >
                <span className="col-span-2 font-mono text-[12px] text-mute md:col-span-1">
                  {svc.number}
                </span>
                <span className="col-span-8 text-xl tracking-tightest md:col-span-4 md:text-2xl">
                  {svc.name}
                </span>
                <span className="col-span-12 text-[15px] leading-relaxed text-mute md:col-span-6">
                  {svc.short}
                </span>
                <span className="svc-arrow col-span-2 flex justify-end text-mute md:col-span-1" aria-hidden>
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <SectionLabel index="03" label="Selected Work" />
            </Reveal>
            <Reveal className="md:col-span-8">
              <h2 className="max-w-[14ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
                Work we’re proud to put our name on.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] text-mute">
                Sample studies until live work is published. Each one is editable in the project
                data file.
              </p>
            </Reveal>
          </div>
          <div className="mt-12">
            <WorkGrid featuredFirst limit={4} />
          </div>
          <div className="mt-12">
            <ButtonLink to="/work" variant="ghost">
              All selected work
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-page gap-16 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <Reveal>
              <SectionLabel index="04" label="Why Quadrick" />
              <h2 className="mt-6 max-w-[10ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
                Built with intention.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            {principles.map((item) => (
              <Reveal key={item.number} className="grid grid-cols-12 gap-4 border-t border-line py-8">
                <span className="col-span-2 font-mono text-[12px] text-mute">{item.number}</span>
                <div className="col-span-10">
                  <h3 className="text-xl tracking-tightest md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-mute">{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionLabel index="05" label="Technology" />
            <h2 className="mt-6 max-w-[12ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
              Modern tools. Solid foundations.
            </h2>
          </Reveal>
          <ul className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <li key={tech.name} className="border-b border-line py-6 sm:pr-8 lg:odd:border-r lg:[&:nth-child(3n)]:border-r-0 sm:odd:border-r">
                <p className="text-xl tracking-tightest">{tech.name}</p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                  {tech.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionLabel index="06" label="Client Feedback" />
            <h2 className="mt-6 max-w-[12ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
              Good work speaks for itself.
            </h2>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Placeholder notes — replace with real clients
            </p>
          </Reveal>
          <div className="mt-14 grid gap-12 lg:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="border-t border-line pt-8">
                <p className="text-xl leading-snug tracking-tightest md:text-[22px]">“{t.quote}”</p>
                <footer className="mt-8 text-[14px]">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-mute">
                    {t.company} · {t.projectType}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                    Sample
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-page gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="md:col-span-5">
            <SectionLabel index="07" label="FAQ" />
            <h2 className="mt-6 max-w-[10ch] text-4xl leading-[0.96] tracking-tightest md:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>
          <div className="md:col-span-7">
            <FaqList />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            08 — Start a Project
          </p>
          <h2 className="mt-6 max-w-[14ch] text-4xl leading-[0.96] tracking-tightest md:text-6xl">
            Have something worth building?
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-paper/65">
            Tell us what you’re working on. We’ll figure out the best way to build it.
          </p>
          <div className="mt-14 border-t border-white/10 pt-12">
            <div className="bg-paper px-5 py-8 text-ink md:px-10 md:py-12">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
