import { InquiryForm } from "@/components/InquiryForm";
import { SectionLabel } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { site } from "@/data/site";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description="Start a project with Quadrick. Tell us what you’re building and we’ll reply with next steps."
      />

      <div className="mx-auto grid max-w-page gap-16 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <aside className="md:col-span-5">
          <SectionLabel index="08" label="Start a Project" />
          <h1 className="mt-6 max-w-[12ch] text-4xl leading-[0.94] tracking-tightest md:text-5xl">
            Have something worth building?
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-mute">
            Tell us what you’re working on. We’ll figure out the best way to build it.
          </p>

          <dl className="mt-12 space-y-6 border-t border-line pt-8">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${site.email}`} className="text-[16px] hover:text-mute">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Availability</dt>
              <dd className="mt-2 flex items-center gap-2 text-[16px]">
                <span className="h-1.5 w-1.5 rounded-full bg-oxide" aria-hidden />
                {site.availability}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Location</dt>
              <dd className="mt-2 text-[16px]">{site.location}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Social</dt>
              <dd className="mt-2 flex flex-col gap-1 text-[16px]">
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="hover:text-mute">
                  Instagram
                </a>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-mute">
                  LinkedIn
                </a>
                <a href={site.social.github} target="_blank" rel="noreferrer" className="hover:text-mute">
                  GitHub
                </a>
              </dd>
            </div>
          </dl>
        </aside>

        <div className="md:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </>
  );
}
