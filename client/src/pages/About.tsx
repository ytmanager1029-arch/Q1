import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { principles } from "@/data/testimonials";

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Quadrick is a web development studio. We design and build distinctive, fast digital experiences."
      />

      <header className="border-b border-line">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute">About Quadrick</p>
          <h1 className="mt-6 max-w-[16ch] text-4xl leading-[0.94] tracking-tightest md:text-6xl">
            We build digital experiences with purpose.
          </h1>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-page gap-10 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <Reveal className="md:col-span-5">
            <img
              src="/images/studio.jpg"
              alt="Empty studio room with a long oak table, black chair, and north-facing windows"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-[16px] leading-relaxed text-mute">
            <p>
              Quadrick is a web development studio. We design and build websites and applications
              for businesses that care how they show up online.
            </p>
            <p>
              We are not a production line and we are not a network of freelancers with a shared
              logo. The people who scope the work are the people who design and ship it.
            </p>
            <p>
              This page does not invent a backstory, a headcount, or a wall of awards. If you need
              those later, put the real ones here.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <div className="md:col-span-5">
            <h2 className="text-3xl tracking-tightest md:text-4xl">What we believe</h2>
          </div>
          <div className="space-y-8 text-[16px] leading-relaxed text-mute md:col-span-7">
            <p>
              A website is a business tool that happens to be visual. If it looks considered and
              fails to work, it failed.
            </p>
            <p>
              Type, space, and structure do more than decoration ever will. We would rather ship
              fewer effects and a clearer offer.
            </p>
            <p>
              Modern technology should be boring in the best way: typed, tested enough, and easy
              for the next person to open.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <h2 className="text-3xl tracking-tightest">Design philosophy</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-mute">
              Editorial first. Hierarchy you can feel. Photography and type carrying the brand so
              we don’t have to invent a visual gimmick for every page. Interfaces should be quiet
              enough that the content can speak.
            </p>
          </div>
          <div>
            <h2 className="text-3xl tracking-tightest">Development philosophy</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-mute">
              Build the real thing. Forms post to a real API. Auth is real. Performance is a
              constraint, not a slide. We choose a small, durable stack — React, TypeScript,
              Node, MongoDB — and we keep it readable.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <h2 className="text-3xl tracking-tightest md:text-4xl">What makes Quadrick different</h2>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {principles.map((p) => (
              <li key={p.number} className="grid grid-cols-12 gap-4 py-7">
                <span className="col-span-2 font-mono text-[12px] text-mute">{p.number}</span>
                <div className="col-span-10 md:col-span-9">
                  <p className="text-xl tracking-tightest">{p.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-mute">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <ButtonLink to="/contact">Start a Project</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
