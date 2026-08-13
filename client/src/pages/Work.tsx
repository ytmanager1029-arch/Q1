import { Reveal, SectionLabel } from "@/components/Reveal";
import { Seo } from "@/components/Seo";
import { WorkGrid } from "@/components/WorkGrid";

export function WorkPage() {
  return (
    <>
      <Seo
        title="Work"
        path="/work"
        description="Selected websites, stores, and products designed and built by Quadrick."
      />
      <header className="border-b border-line">
        <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
          <Reveal>
            <SectionLabel index="03" label="Selected Work" />
            <h1 className="mt-6 max-w-[14ch] text-4xl leading-[0.94] tracking-tightest md:text-6xl">
              Work we’re proud to put our name on.
            </h1>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-mute">
              These are editable sample studies. They are not live client claims. Replace them with
              real projects when you have them.
            </p>
          </Reveal>
        </div>
      </header>
      <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-20">
        <WorkGrid featuredFirst />
      </div>
    </>
  );
}
