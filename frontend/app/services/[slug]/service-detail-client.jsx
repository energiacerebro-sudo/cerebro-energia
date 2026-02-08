"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function ServiceDetailClient({ data }) {
  const rootRef = useRef(null);
  const carouselRef = useRef(null);
  const service = data.service;
  const detail = data.detail || {};

  const sections = useMemo(() => data.sections || [], [data.sections]);
  const faqs = useMemo(() => data.faqs || [], [data.faqs]);
  const gallery = useMemo(() => data.gallery || [], [data.gallery]);
  const carouselItems = useMemo(() => data.carousel || [], [data.carousel]);
  const related = useMemo(() => data.related || [], [data.related]);
  const addOns = useMemo(() => {
    const category = service?.category || "mobile";
    const sets = {
      mobile: [
        "App store optimization and rollout",
        "Offline-first data sync",
        "Push notifications and in-app messaging",
        "Crash reporting and performance monitoring",
      ],
      web: [
        "API-first architecture design",
        "Analytics and event tracking",
        "Role-based access control",
        "Performance budgets and audits",
      ],
      design: [
        "Design system and UI kit",
        "Usability testing sessions",
        "Prototyping for stakeholder alignment",
        "Accessibility audits",
      ],
      cloud: [
        "Cost optimization and FinOps",
        "Disaster recovery planning",
        "Infrastructure as code",
        "Security posture reviews",
      ],
      devops: [
        "Release automation and rollback",
        "Observability dashboards",
        "SLOs and incident workflows",
        "Environment parity and staging",
      ],
      qa: [
        "Automation test suites",
        "Regression test plans",
        "Load and stress testing",
        "Release sign-off checklists",
      ],
      game: [
        "Performance profiling",
        "Live ops and analytics",
        "Multiplayer infrastructure",
        "Content pipeline tooling",
      ],
    };

    const items = sets[category] || sets.mobile;
    const hash = (service?.title || "").length % 2;
    return hash === 0 ? items.slice(0, 3) : items.slice(1, 4);
  }, [service]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const amount = direction === "left" ? -320 : 320;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".service-hero__eyebrow, .service-hero__title, .service-hero__subtitle", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
      });
      gsap.from(".service-hero__highlight, .service-hero__actions", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(".service-section", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="service-page" ref={rootRef}>
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">Service</p>
            <h1 className="service-hero__title">{service.title}</h1>
            <p className="service-hero__subtitle">
              {detail.hero_subtitle || service.description}
            </p>
            {detail.hero_highlight ? (
              <div className="service-hero__highlight">
                {detail.hero_highlight}
              </div>
            ) : null}
            <div className="service-hero__actions">
              <a className="btn-cta service-cta" href={detail.cta_link || "#contact"}>
                {detail.cta_text || "Start your project"}
              </a>
              <a className="btn-cta service-cta service-cta--ghost" href="#overview">
                Learn More
              </a>
            </div>
          </div>
          <div className="service-hero__media">
            {detail.hero_image ? (
              <img
                src={detail.hero_image}
                alt={service.title}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="service-hero__placeholder">
                <div className="service-hero__placeholder-inner" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="overview" className="service-section">
        <div className="service-section__header">
          <p className="service-section__eyebrow">Overview</p>
          <h2 className="service-section__title">Big picture, practical delivery</h2>
        </div>
        <div className="service-section__body">
          <p className="service-section__lead">
            {detail.overview ||
              "We align product goals with real user needs, then design and build a scalable solution with a clear roadmap, measurable outcomes, and a long-term support plan."}
          </p>
          <div className="service-highlight">
            <p>
              We specialize in discovery, UI/UX, engineering, QA, and rollout —
              keeping teams aligned and shipping with confidence.
            </p>
          </div>
        </div>
      </section>

      {sections.map((section, index) => (
        <section key={`${section.title}-${index}`} className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">{section.section_type}</p>
            <h2 className="service-section__title">{section.title}</h2>
          </div>

          {section.section_type === "text" ? (
            <p className="service-section__lead">{section.body}</p>
          ) : null}

          {section.section_type === "rich" ? (
            <div
              className="service-rich"
              dangerouslySetInnerHTML={{ __html: section.rich_body || "" }}
            />
          ) : null}

          {section.section_type === "cards" ? (
            <div className="service-cards">
              {(section.items || []).map((item, idx) => (
                <div key={idx} className="service-card-detail">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          ) : null}

          {section.section_type === "bullets" ? (
            <div className="service-bullets">
              {(section.items || []).map((item, idx) => (
                <p key={idx}>- {item}</p>
              ))}
            </div>
          ) : null}

          {section.section_type === "accordion" ? (
            <div className="service-accordion">
              {(section.items || []).map((item, idx) => (
                <details key={idx}>
                  <summary>{item.title}</summary>
                  <p>{item.body}</p>
                </details>
              ))}
            </div>
          ) : null}

          {section.section_type === "gallery" ? (
            <div className="service-gallery">
              {(section.items || gallery).map((item, idx) => {
                const src = item.image_url || item;
                const alt = item.title || "Gallery image";
                return (
                  <img
                    key={idx}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                );
              })}
            </div>
          ) : null}

          {section.section_type === "carousel" ? (
            <div className="service-carousel">
              <div className="service-carousel__controls">
                <button type="button" onClick={() => scrollCarousel("left")}>
                  ←
                </button>
                <button type="button" onClick={() => scrollCarousel("right")}>
                  →
                </button>
              </div>
              <div className="service-carousel__track" ref={carouselRef}>
                {(section.items || carouselItems).map((item, idx) => (
                  <div className="service-carousel__item" key={idx}>
                    <img
                      src={item.image_url || item}
                      alt={item.title || "Carousel image"}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {item.title ? <p>{item.title}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ))}

      {faqs.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">FAQ</p>
            <h2 className="service-section__title">Frequently asked questions</h2>
          </div>
          <div className="service-accordion">
            {faqs.map((faq, idx) => (
              <details key={idx}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {addOns.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">Add-ons</p>
            <h2 className="service-section__title">Tailored improvements</h2>
          </div>
          <div className="service-bullets">
            {addOns.map((item, idx) => (
              <p key={idx}>- {item}</p>
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">Related</p>
            <h2 className="service-section__title">Related services</h2>
          </div>
          <div className="service-cards">
            {related.map((item) => (
              <div key={item.slug} className="service-card-detail">
                <img
                  src={item.card_image_url}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a
                  className="btn-cta service-cta service-cta--ghost"
                  href={`/services/${item.slug}`}
                >
                  Explore
                </a>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
