import { ButtonLink } from "@/components/Button";
import { Seo } from "@/components/Seo";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <div className="mx-auto flex min-h-[70svh] max-w-page flex-col justify-center px-5 py-24 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">404</p>
        <h1 className="mt-4 text-4xl tracking-tightest md:text-6xl">This page isn’t here.</h1>
        <p className="mt-5 max-w-md text-mute">The link may be old, or the page may have moved.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/">Back home</ButtonLink>
          <ButtonLink to="/contact" variant="ghost">
            Start a Project
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
