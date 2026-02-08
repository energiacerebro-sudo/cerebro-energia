"use client";

import { useMemo, useState } from "react";

const CATEGORY_LABELS = {
  all: "All",
  mobile: "Mobile",
  web: "Web",
  design: "Design",
  cloud: "Cloud",
  devops: "DevOps",
  qa: "QA",
  game: "Game",
};

export default function ServicesClient({ data }) {
  const [active, setActive] = useState("all");
  const services = useMemo(() => data.services || [], [data.services]);

  const filtered = useMemo(() => {
    if (active === "all") return services;
    return services.filter((service) => service.category === active);
  }, [active, services]);

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">Services</p>
            <h1 className="service-hero__title">What we build</h1>
            <p className="service-hero__subtitle">
              Mobile apps, web platforms, cloud systems, and game experiences
              designed to scale.
            </p>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-filter">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              className={`service-filter__btn ${
                active === key ? "service-filter__btn--active" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="service-grid">
          {filtered.map((service) => (
            <div key={service.slug} className="service-card">
              <div className="service-card__media">
                <img
                  src={service.card_image}
                  alt={service.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="service-card__content">
                <h3 className="text-xl font-semibold text-mist font-display">
                  {service.title}
                </h3>
                <p className="mt-3 text-mist/80">{service.description}</p>
                <div className="service-card__actions">
                  {service.slug ? (
                    <a
                      href={`/services/${service.slug}`}
                      className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-4 py-2 text-sm font-semibold text-mist"
                    >
                      Read More
                      <span aria-hidden="true">→</span>
                    </a>
                  ) : (
                    <span className="text-sm text-mist/70">Details coming soon</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
