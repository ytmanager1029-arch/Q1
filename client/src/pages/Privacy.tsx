import { Seo } from "@/components/Seo";

export function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy Policy" path="/privacy" description="How Quadrick handles the information you send us." />
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Legal</p>
        <h1 className="mt-4 text-4xl tracking-tightest md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-mute">Last updated 13 August 2026</p>

        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-mute">
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Who we are</h2>
            <p className="mt-3">
              Quadrick (“we”, “us”) is a web development studio. This policy explains what we collect
              when you use this website and how we use it.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">What we collect</h2>
            <p className="mt-3">
              If you send a project inquiry we store the details you submit: name, email, and any
              optional fields (phone, company, website, project type, budget, timeline, message,
              source). We also store technical metadata such as the time of submission.
            </p>
            <p className="mt-3">
              If you sign in to the admin area we store your account email, a hashed password, and
              session information in an HTTP-only cookie.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">How we use it</h2>
            <p className="mt-3">
              Inquiry data is used to reply to you and to manage potential work. Admin data is used
              to protect the dashboard. We do not sell personal information. We do not use
              advertising trackers on this site.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Where it is stored</h2>
            <p className="mt-3">
              Data is stored in a MongoDB database accessed only by our backend. Hosting may be
              provided by third-party infrastructure (for example Render, Vercel, and MongoDB
              Atlas). Those providers process data under their own terms.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">How long we keep it</h2>
            <p className="mt-3">
              We keep inquiries for as long as they are useful to run the studio, then delete or
              archive them. You can ask us to delete an inquiry you submitted.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Your rights</h2>
            <p className="mt-3">
              Depending on where you live you may have the right to access, correct, or delete
              personal data we hold. Email hello@quadrick.dev and we will respond.
            </p>
          </section>
          <section>
            <h2 className="text-xl text-ink tracking-tightest">Contact</h2>
            <p className="mt-3">
              Questions about this policy: hello@quadrick.dev.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
