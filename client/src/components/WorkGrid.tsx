import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";

function Card({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={cn(featured && "md:col-span-2")}>
      <Link to={`/work/${project.slug}`} className="group block focus-visible:outline-offset-4">
        <div className={cn("img-reveal bg-mist", featured ? "aspect-[16/9]" : "aspect-[4/3]")}>
          <img
            src={project.image}
            alt={project.imageAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              <span>{project.industry}</span>
              <span aria-hidden>·</span>
              <span>{project.year}</span>
              {project.placeholder ? (
                <>
                  <span aria-hidden>·</span>
                  <span>Sample</span>
                </>
              ) : null}
            </div>
            <h3 className="mt-2 text-2xl tracking-tightest md:text-[28px]">{project.name}</h3>
            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-mute">{project.description}</p>
          </div>
          <span className="mt-1 hidden shrink-0 items-center gap-1 text-[12px] uppercase tracking-[0.12em] text-mute transition-colors group-hover:text-ink sm:inline-flex">
            View Project <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function WorkGrid({ featuredFirst = false, limit }: { featuredFirst?: boolean; limit?: number }) {
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");

  const visible = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [filter, limit]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className="filter-btn border border-line px-3 py-1.5 text-[12px] uppercase tracking-[0.12em]"
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
        {visible.map((project, i) => (
          <Card key={project.slug} project={project} featured={featuredFirst && i === 0 && filter === "All"} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-mute">No projects in this category yet.</p>
      ) : null}
    </div>
  );
}
