"use client";

import { useMemo, useState } from "react";

export default function ProjectsClient({ data }) {
  const projects = useMemo(() => data.projects || [], [data.projects]);
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [projects]);
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [projects, active]);

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">Projects</p>
            <h1 className="service-hero__title">Real work, real impact</h1>
            <p className="service-hero__subtitle">
              Case studies across healthcare, real estate, AI, and product
              platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`service-filter__btn ${
                active === category ? "service-filter__btn--active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="service-grid">
          {filtered.map((project) => (
            <div key={project.slug} className="service-card">
              <div className="service-card__media">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="service-card__content">
                <h3 className="text-xl font-semibold text-mist font-display">
                  {project.title}
                </h3>
                <p className="mt-3 text-mist/80">{project.summary}</p>
                <div className="service-card__actions">
                  {project.slug ? (
                    <a
                      href={`/projects/${project.slug}`}
                      className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-4 py-2 text-sm font-semibold text-mist"
                    >
                      View Project
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
