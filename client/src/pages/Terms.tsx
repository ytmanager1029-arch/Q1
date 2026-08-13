import { Seo } from "@/components/Seo";

export function TermsPage() {
  return (
    <>
      <Seo title="Terms" path="/terms" description="Terms of use for the Quadrick website." />
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Legal</p>
        <h1 className="mt-4 text-4xl tracking-tightest md:text-5xl">Terms</h1>
        <p className="mt-3 text-sm text-mute">Last updated 13 August 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-mute">
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Using this site</h2>
            <p className="mt-3">
              This website is provided by Quadrick to describe our work and to receive project
              inquiries. Do not misuse the site, attempt to access the admin area without
              permission, or submit automated or abusive content.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Inquiries</h2>
            <p className="mt-3">
              Sending an inquiry is not a contract. We may accept, decline, or propose a different
              scope. Any engagement is confirmed in a separate written agreement.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Content</h2>
            <p className="mt-3">
              Sample projects and testimonials on this site are clearly marked as placeholders
              unless replaced with real work. Do not treat placeholder case studies as client
              results.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Intellectual property</h2>
            <p className="mt-3">
              The Quadrick name, mark, and site design are ours. Client work remains subject to the
              terms of that engagement.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Liability</h2>
            <p className="mt-3">
              This site is provided as-is. We are not liable for losses arising from your use of
              the public website beyond what the law requires.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Contact</h2>
            <p className="mt-3">hello@quadrick.dev</p>
          </section>
        </div>
      </article>
    </>
  );
}
