import Hero from "./components/Hero";
import Section from "./components/Section";
import TestimonialsCarousel from "./components/TestimonialsCarousel";

const SERVER_API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

const PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

async function fetchJson(path) {
  const res = await fetch(`${SERVER_API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function Home() {
  const [site, pages, services, projects, blog, testimonials] = await Promise.all([
    fetchJson("/site/"),
    fetchJson("/pages/"),
    fetchJson("/services/"),
    fetchJson("/projects/"),
    fetchJson("/blog/"),
    fetchJson("/testimonials/"),
  ]);

  const aboutPage = pages?.pages?.find((page) => page.slug === "about");
  const missionPage = pages?.pages?.find((page) => page.slug === "mission");
  const tickerItems = [
    "Mobile App Development",
    "iOS & Android Engineering",
    "Cross-Platform Apps",
    "UI/UX Product Design",
    "Web App Development",
    "Backend APIs & Microservices",
    "Cloud Architecture",
    "DevOps & CI/CD",
    "Quality Assurance",
    "Product Strategy",
    "Game Development",
    "AR/VR Experiences",
    "Real-time Systems",
    "Data Analytics",
    "Security & Compliance",
    "Maintenance & Support",
  ];

  return (
    <main>
      <Hero site={site} />

      <section className="ticker border-y border-mist/10 bg-ink/40 py-6">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div className="ticker-item" key={`${item}-${index}`}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <div id="about" />
      <Section title="About Cerebro Energia" eyebrow="About">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10">
            <h3 className="text-xl font-semibold text-mist font-display sm:text-2xl">
              {aboutPage?.title || "We build products people love to use"}
            </h3>
            <p className="mt-4 text-mist/80">
              {aboutPage?.body ||
                "Cerebro Energia is a mobile app and software development company that helps teams launch faster and scale smarter. We blend product strategy, UI/UX, and engineering to ship reliable experiences across iOS, Android, and the web."}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Product Strategy",
                  desc: "Clarity on scope, roadmap, and measurable outcomes.",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="13" cy="13" r="11" stroke="#FF7A2F" strokeWidth="2" />
                      <path d="M13 6 L13 13 L18 16" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  title: "UI/UX Design",
                  desc: "Human‑centered design systems and smooth flows.",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="4" width="20" height="14" rx="3" stroke="#0F6B5F" strokeWidth="2" />
                      <path d="M6 9 H15" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 13 H12" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  ),
                },
                {
                  title: "Engineering",
                  desc: "Mobile + web development with modern stacks.",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7 L4 13 L8 19" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                      <path d="M18 7 L22 13 L18 19" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                      <rect x="10" y="6" width="6" height="14" rx="2" stroke="#0F6B5F" strokeWidth="2" />
                    </svg>
                  ),
                },
                {
                  title: "QA & Support",
                  desc: "Testing, releases, and long‑term maintenance.",
                  icon: (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 13 L11 18 L20 8" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                      <rect x="4" y="4" width="18" height="18" rx="4" stroke="#FF7A2F" strokeWidth="2" opacity="0.8" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <div key={item.title} className="card-hover rounded-2xl border border-mist/10 bg-ink/50 p-4 min-h-[140px]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist/10">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
                      {item.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-mist/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-6">
            <div className="card-hover glass rounded-3xl p-6 sm:p-8 min-h-[220px]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist/10">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="9" r="4" stroke="#FF7A2F" strokeWidth="2" />
                    <path d="M5 22 C6 17, 10 15, 13 15 C16 15, 20 17, 21 22" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-mist font-display sm:text-xl">
                {missionPage?.title || "From idea to impact"}
                </h3>
              </div>
              <p className="mt-4 text-mist/80">
                {missionPage?.body ||
                  "We begin with your users and business goals, then shape the roadmap, design the experience, and build the platform that brings it to life. You get a partner that stays through launch and beyond."}
              </p>
            </div>
            <div className="card-hover glass rounded-3xl p-6 sm:p-8 min-h-[220px]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist/10">
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="6" width="18" height="14" rx="4" stroke="#0F6B5F" strokeWidth="2" />
                    <path d="M8 10 H18" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 14 H15" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </div>
              <h3 className="text-lg font-semibold text-mist font-display sm:text-xl">
                Built for scale and stability
              </h3>
              </div>
              <p className="mt-4 text-mist/80">
                Our teams engineer with longevity in mind — resilient
                infrastructure, secure foundations, and clean code that lets
                you ship faster today and scale confidently tomorrow.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <section id="services" className="py-16">
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-ember">
              Capabilities
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-mist font-display sm:text-3xl">
              Services
            </h2>
          </div>
          <div className="service-grid">
          {(services?.services?.length
            ? services.services
            : [
                {
                  slug: "mobile-app-development",
                  title: "Mobile App Development",
                  description:
                    "High‑performance iOS and Android experiences built for scale.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "ios-android-engineering",
                  title: "iOS & Android Engineering",
                  description:
                    "Native expertise for smooth UI, speed, and stability.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "cross-platform-apps",
                  title: "Cross‑Platform Apps",
                  description:
                    "Ship faster with shared code and native‑level polish.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "ui-ux-design",
                  title: "UI/UX Product Design",
                  description:
                    "Research‑driven UX and design systems that scale.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "web-app-development",
                  title: "Web App Development",
                  description:
                    "Modern web platforms with clean architecture.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "backend-apis",
                  title: "Backend APIs & Microservices",
                  description:
                    "Secure, composable services built for growth.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "cloud-architecture",
                  title: "Cloud Architecture",
                  description:
                    "Reliable infrastructure with cost‑aware scaling.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "devops-cicd",
                  title: "DevOps & CI/CD",
                  description:
                    "Automated delivery pipelines and observability.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "quality-assurance",
                  title: "Quality Assurance",
                  description:
                    "Manual + automated testing to protect releases.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
                },
                {
                  slug: "game-development",
                  title: "Game Development",
                  description:
                    "Interactive experiences built for engagement.",
                  card_image_url:
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
                },
              ]
          ).map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card__media">
                <img
                  src={service.card_image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
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
        </div>
      </section>

      <div id="projects" />
      <Section title="Projects" eyebrow="Work">
        <div className="grid gap-6 lg:grid-cols-2">
          {(projects?.projects || []).map((project, index) => (
            <div key={index} className="glass rounded-3xl p-6 sm:p-8">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="mb-5 h-40 w-full rounded-2xl object-cover sm:h-48"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <div className="text-sm uppercase tracking-[0.2em] text-ember">
                {project.category || "Project"}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-mist font-display">
                {project.title}
              </h3>
              <p className="mt-4 text-mist/80">{project.summary}</p>
              <div className="mt-4 grid gap-3 text-sm text-mist/70">
                <p>
                  <span className="text-mist/90">Approach:</span>{" "}
                  {project.approach}
                </p>
                <p>
                  <span className="text-mist/90">Scrum:</span>{" "}
                  {project.scrum_overview}
                </p>
                <p>
                  <span className="text-mist/90">Duration:</span>{" "}
                  {project.duration_weeks} weeks
                </p>
              </div>
              {project.deliverables ? (
                <div className="mt-4 text-sm text-mist/80">
                  {project.deliverables
                    .split("\n")
                    .filter(Boolean)
                    .map((line, idx) => (
                      <p key={idx}>- {line.replace(/^-\\s?/, "")}</p>
                    ))}
                </div>
              ) : null}
              {project.slug ? (
                <div className="mt-6">
                  <a
                    href={`/projects/${project.slug}`}
                    className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-4 py-2 text-sm font-semibold text-mist"
                  >
                    View Project
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      <div id="blog" />
      <Section title="Blog" eyebrow="Blog">
        {(blog?.featured || blog?.posts?.length) ? (
          <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass rounded-3xl p-6 sm:p-8">
              {(blog.featured?.hero_image || blog.posts?.[0]?.hero_image) ? (
                <img
                  src={blog.featured?.hero_image || blog.posts?.[0]?.hero_image}
                  alt={blog.featured?.title || blog.posts?.[0]?.title}
                  className="mb-5 h-48 w-full rounded-2xl object-cover sm:h-56"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <div className="text-xs uppercase tracking-[0.2em] text-ember">
                {blog.featured?.category || blog.posts?.[0]?.category || "Insights"}
              </div>
              <h3 className="mt-3 text-xl font-semibold text-mist font-display sm:text-2xl">
                {blog.featured?.title || blog.posts?.[0]?.title}
              </h3>
              <p className="mt-3 text-mist/80">{blog.featured?.excerpt || blog.posts?.[0]?.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-mist/60">
                <span>{blog.featured?.author || blog.posts?.[0]?.author || "Cerebro Energia"}</span>
                <span>{blog.featured?.reading_time || blog.posts?.[0]?.reading_time || 5} min</span>
              </div>
              <div className="mt-5">
                <a
                  href={`/blog/${blog.featured?.slug || blog.posts?.[0]?.slug}`}
                  className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-3 py-2 text-xs font-semibold text-mist"
                >
                  Read Article
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {blog.posts.slice(1, 4).map((post) => (
                <div key={post.slug} className="glass rounded-3xl p-5 sm:p-6">
                  <div className="text-xs uppercase tracking-[0.2em] text-ember">
                    {post.category || "Insights"}
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-mist font-display sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-mist/80">{post.excerpt}</p>
                  <div className="mt-3">
                    <a
                      href={`/blog/${post.slug}`}
                      className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-3 py-2 text-xs font-semibold text-mist"
                    >
                      Read Article
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-3">
          {(blog?.posts || []).slice(4, 10).map((post) => (
            <div key={post.slug} className="glass rounded-3xl p-5 sm:p-6">
              {post.hero_image ? (
                <img
                  src={post.hero_image}
                  alt={post.title}
                  className="mb-4 h-36 w-full rounded-2xl object-cover sm:h-40"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <div className="text-xs uppercase tracking-[0.2em] text-ember">
                {post.category || "Insights"}
              </div>
              <h3 className="mt-3 text-base font-semibold text-mist font-display sm:text-lg">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-mist/80">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-mist/60">
                <span>{post.author || "Cerebro Energia"}</span>
                <span>{post.reading_time || 5} min</span>
              </div>
              <div className="mt-4">
                <a
                  href={`/blog/${post.slug}`}
                  className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-3 py-2 text-xs font-semibold text-mist"
                >
                  Read Article
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Testimonials" eyebrow="Testimonials">
        <TestimonialsCarousel testimonials={testimonials?.testimonials || []} />
      </Section>

      <div id="insights" />
      <Section title="Insights" eyebrow="Insights">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass rounded-3xl p-8">
            <h3 className="text-xl font-semibold text-mist font-display">
              What we’re seeing across products
            </h3>
            <p className="mt-4 text-mist/80">
              We track patterns across mobile, web, AI, and cloud delivery to
              help teams ship with confidence. Here are the themes guiding our
              builds right now.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Fast time‑to‑value",
                  desc: "Lean MVPs, measurable KPIs, and release checkpoints.",
                },
                {
                  title: "AI‑assisted workflows",
                  desc: "Automation, prediction, and intelligence built in.",
                },
                {
                  title: "Scalable foundations",
                  desc: "Modular architecture and maintainable codebases.",
                },
                {
                  title: "Delightful UX",
                  desc: "Human‑centered design that improves retention.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-mist/10 bg-ink/50 p-4">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-ember">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-mist/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-mist font-display">
                Delivery snapshot
              </h3>
              <div className="mt-6 grid gap-4">
                <div className="flex items-center justify-between rounded-2xl border border-mist/10 bg-ink/50 p-4">
                  <span className="text-sm text-mist/70">Services delivered</span>
                  <span className="text-2xl font-semibold text-mist">
                    {(services?.services?.length || 10).toString()}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-mist/10 bg-ink/50 p-4">
                  <span className="text-sm text-mist/70">Active domains</span>
                  <span className="text-2xl font-semibold text-mist">7</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-mist/10 bg-ink/50 p-4">
                  <span className="text-sm text-mist/70">Projects showcased</span>
                  <span className="text-2xl font-semibold text-mist">
                    {(projects?.projects?.length || 7).toString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-mist font-display">
                Service focus areas
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Mobile Apps",
                  "Web Platforms",
                  "AI & ML",
                  "Cloud",
                  "DevOps",
                  "QA",
                  "Game Dev",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-mist/20 bg-ink/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-mist/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-mist/70">
                Each engagement aligns to measurable outcomes and a clear
                delivery roadmap.
              </p>
            </div>
          </div>
        </div>
      </Section>

    </main>
  );
}
