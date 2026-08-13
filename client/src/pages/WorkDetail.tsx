import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Seo } from "@/components/Seo";
import { getNextProject, getProject } from "@/data/projects";

export function WorkDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  if (!project) return <Navigate to="/work" replace />;
  const next = getNextProject(project.slug);

  return (
    <>
      <Seo
        title={project.name}
        path={`/work/${project.slug}`}
        description={project.description}
        image={project.image}
      />

      <article>
        <header className="border-b border-line">
          <div className="mx-auto max-w-page px-5 py-14 md:px-8 md:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
              <Link to="/work" className="hover:text-ink">
                Work
              </Link>
              <span className="mx-2">/</span>
              {project.name}
            </p>
            <h1 className="mt-6 text-4xl tracking-tightest md:text-6xl">{project.name}</h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-mute">{project.summary}</p>
            <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Industry</dt>
                <dd className="mt-2 text-[15px]">{project.industry}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Services</dt>
                <dd className="mt-2 text-[15px]">{project.services.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Year</dt>
                <dd className="mt-2 text-[15px]">{project.year}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Type</dt>
                <dd className="mt-2 text-[15px]">
                  {project.category}
                  {project.placeholder ? " · Sample" : ""}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="bg-mist">
          <div className="mx-auto max-w-page px-5 py-8 md:px-8 md:py-12">
            <img
              src={project.image}
              alt={project.imageAlt}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>

        <div className="mx-auto grid max-w-page gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
          <section className="md:col-span-7 space-y-10">
            <div>
              <h2 className="text-2xl tracking-tightest">Challenge</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-mute">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tightest">Approach</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-mute">{project.approach}</p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tightest">Outcome</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-mute">{project.outcome}</p>
            </div>
          </section>
          <aside className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Technologies</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {project.technologies.map((t) => (
                <li key={t} className="py-3 text-[15px]">
                  {t}
                </li>
              ))}
            </ul>
            <ButtonLink to="/contact" className="mt-10">
              Start a Project
            </ButtonLink>
          </aside>
        </div>

        {project.gallery.length > 1 ? (
          <div className="border-t border-line bg-mist">
            <div className="mx-auto grid max-w-page gap-6 px-5 py-10 md:grid-cols-2 md:px-8">
              {project.gallery.slice(1).map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
              ))}
            </div>
          </div>
        ) : null}

        <div className="border-t border-line">
          <Link
            to={`/work/${next.slug}`}
            className="group mx-auto flex max-w-page items-end justify-between gap-6 px-5 py-12 md:px-8"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">Next project</p>
              <p className="mt-2 text-3xl tracking-tightest md:text-4xl">{next.name}</p>
            </div>
            <ArrowUpRight className="mb-1 h-6 w-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </>
  );
}
