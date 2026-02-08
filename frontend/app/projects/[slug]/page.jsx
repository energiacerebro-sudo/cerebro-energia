const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchProject(slug) {
  const res = await fetch(`${API_BASE}/projects/${slug}/`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await fetchProject(params.slug);
  if (!data) return { title: "Project Not Found" };

  const project = data.project;
  const title = project.meta_title || project.title;
  const description = project.meta_description || project.summary || "";
  const image = project.meta_image || project.image || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const data = await fetchProject(params.slug);
  if (!data) {
    return (
      <main className="px-6 py-24 text-mist">
        <h1 className="text-3xl font-semibold">Project not found</h1>
      </main>
    );
  }

  const project = data.project;
  const gallery = data.gallery || [];

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">{project.category || "Project"}</p>
            <h1 className="service-hero__title">{project.title}</h1>
            <p className="service-hero__subtitle">{project.summary}</p>
            <div className="service-hero__highlight">
              <p>{project.approach}</p>
            </div>
            <div className="service-hero__actions">
              <a className="btn-cta service-cta" href="/contact">
                Start a project
              </a>
              <a className="btn-cta service-cta service-cta--ghost" href="#deliverables">
                Deliverables
              </a>
            </div>
          </div>
          <div className="service-hero__media">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
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

      <section className="service-section">
        <div className="service-section__header">
          <p className="service-section__eyebrow">Scrum</p>
          <h2 className="service-section__title">Delivery framework</h2>
        </div>
        <p className="service-section__lead">{project.scrum_overview}</p>
        <div className="service-bullets">
          <p>- Duration: {project.duration_weeks} weeks</p>
          <p>- Continuous demos and backlog refinement</p>
          <p>- Release readiness checks every sprint</p>
        </div>
      </section>

      <section id="deliverables" className="service-section">
        <div className="service-section__header">
          <p className="service-section__eyebrow">Deliverables</p>
          <h2 className="service-section__title">What we shipped</h2>
        </div>
        <div className="service-bullets">
          {(project.deliverables || "")
            .split("\n")
            .filter(Boolean)
            .map((line, idx) => (
              <p key={idx}>- {line.replace(/^-\\s?/, "")}</p>
            ))}
        </div>
      </section>

      <section className="service-section">
        <div className="service-section__header">
          <p className="service-section__eyebrow">Gallery</p>
          <h2 className="service-section__title">Project visuals</h2>
        </div>
        <div className="service-carousel">
          <div className="service-carousel__track">
            {gallery.map((item, idx) => (
              <div className="service-carousel__item" key={idx}>
                <img
                  src={item.image_url}
                  alt={item.title || project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {item.title ? <p>{item.title}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
