"use client";

import { useEffect, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

export default function Navbar() {
  const [services, setServices] = useState([]);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadServices() {
      try {
        const res = await fetch(`${API_BASE}/services/`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (active) {
          const list = Array.isArray(data?.services)
            ? data.services
            : Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data)
                ? data
                : [];
          setServices(list);
        }
      } catch (err) {
        // Ignore fetch errors; dropdown can still render without data.
      }
    }

    loadServices();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects/`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (active) {
          const list = Array.isArray(data?.projects)
            ? data.projects
            : Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data)
                ? data
                : [];
          setProjects(list);
        }
      } catch (err) {
        // Ignore fetch errors; dropdown can still render without data.
      }
    }

    loadProjects();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadBlogs() {
      try {
        const res = await fetch(`${API_BASE}/blog/?page=1&page_size=12`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        if (active) {
          const list = Array.isArray(data?.posts)
            ? data.posts
            : Array.isArray(data?.results)
              ? data.results
              : Array.isArray(data)
                ? data
                : [];
          setBlogs(list);
        }
      } catch (err) {
        // Ignore fetch errors; dropdown can still render without data.
      }
    }

    loadBlogs();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const dropdownItems = services.slice(0, 12);
  const projectItems = projects.slice(0, 12);
  const blogItems = blogs.slice(0, 12);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-mist/10 bg-ink/80 backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:px-10">
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ember text-ink font-semibold">
            CE
          </div>
          <div className="text-base font-semibold text-mist font-display sm:text-lg">
            Cerebro Energia
          </div>
        </a>

        <div className="relative hidden items-center gap-8 text-sm font-medium text-mist/80 md:flex">
          <a className="hover:text-mist" href="#about">
            About
          </a>

          <div
            className="relative"
            onMouseEnter={() => {
              setServicesOpen(true);
              setProjectsOpen(false);
            }}
          >
            <a
              className="hover:text-mist"
              href="#services"
              onFocus={() => setServicesOpen(true)}
              onBlur={() => setServicesOpen(false)}
            >
              Services
            </a>
          </div>

          <div
            className="relative"
            onMouseEnter={() => {
              setProjectsOpen(true);
              setServicesOpen(false);
              setBlogsOpen(false);
            }}
          >
            <a
              className="hover:text-mist"
              href="#projects"
              onFocus={() => setProjectsOpen(true)}
              onBlur={() => setProjectsOpen(false)}
            >
              Projects
            </a>
          </div>
          <div
            className="relative"
            onMouseEnter={() => {
              setBlogsOpen(true);
              setServicesOpen(false);
              setProjectsOpen(false);
            }}
          >
            <a
              className="hover:text-mist"
              href="#blog"
              onFocus={() => setBlogsOpen(true)}
              onBlur={() => setBlogsOpen(false)}
            >
              Blog
            </a>
          </div>
          <a className="hover:text-mist" href="#insights">
            Insights
          </a>
        </div>

        <button
          type="button"
          className="md:hidden rounded-xl border border-mist/20 px-3 py-2 text-sm text-mist"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          Menu
        </button>

        {servicesOpen && dropdownItems.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-4"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="w-full rounded-2xl border border-mist/10 bg-ink/95 px-10 py-6 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-6 gap-5">
                {dropdownItems.map((service) => (
                  <a
                    key={service.id || service.slug}
                    href={`/services/${service.slug || service.id}`}
                    className="group grid aspect-square gap-3 rounded-2xl border border-mist/10 bg-ink/70 p-4 transition hover:border-ember/40 hover:bg-ember/10"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-xl bg-mist/10">
                      {service.card_image ? (
                        <img
                          src={service.card_image}
                          alt={service.title || service.name}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-ember/20 to-mist/10" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-mist">
                        {service.title || service.name}
                      </div>
                      {service.category && (
                        <div className="mt-1 text-xs text-mist/60">
                          {service.category}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {projectsOpen && projectItems.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-4"
            onMouseEnter={() => setProjectsOpen(true)}
            onMouseLeave={() => setProjectsOpen(false)}
          >
            <div className="w-full rounded-2xl border border-mist/10 bg-ink/95 px-10 py-6 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-6 gap-5">
                {projectItems.map((project) => (
                  <a
                    key={project.slug || project.id}
                    href={`/projects/${project.slug || project.id}`}
                    className="group grid aspect-square gap-3 rounded-2xl border border-mist/10 bg-ink/70 p-4 transition hover:border-ember/40 hover:bg-ember/10"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-xl bg-mist/10">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-ember/20 to-mist/10" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-mist">
                        {project.title}
                      </div>
                      {project.location && (
                        <div className="mt-1 text-xs text-mist/60">
                          {project.location}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {blogsOpen && blogItems.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-4"
            onMouseEnter={() => setBlogsOpen(true)}
            onMouseLeave={() => setBlogsOpen(false)}
          >
            <div className="w-full rounded-2xl border border-mist/10 bg-ink/95 px-10 py-6 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-6 gap-5">
                {blogItems.map((post) => (
                  <a
                    key={post.slug || post.id}
                    href={`/blog/${post.slug || post.id}`}
                    className="group grid aspect-square gap-3 rounded-2xl border border-mist/10 bg-ink/70 p-4 transition hover:border-ember/40 hover:bg-ember/10"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-xl bg-mist/10">
                      {post.hero_image ? (
                        <img
                          src={post.hero_image}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-ember/20 to-mist/10" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-mist">
                        {post.title}
                      </div>
                      {post.category && (
                        <div className="mt-1 text-xs text-mist/60">
                          {post.category}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        <a
          href="#contact"
          className="btn-cta hidden bg-ember px-5 py-2 text-sm font-semibold text-ink sm:inline-flex"
        >
          Get Started
        </a>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/90 backdrop-blur md:hidden">
          <div className="mx-auto flex h-full w-full flex-col px-6 pb-10 pt-24">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-ember">
                Menu
              </span>
              <button
                type="button"
                className="rounded-xl border border-mist/20 px-3 py-2 text-sm text-mist"
                onClick={() => setMobileOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-4 text-base text-mist">
              <a
                href="#about"
                className="block rounded-xl border border-mist/10 bg-ink/50 px-4 py-3"
                onClick={() => setMobileOpen(false)}
              >
                About
              </a>

              <div className="rounded-xl border border-mist/10 bg-ink/50 px-4 py-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                >
                  <span>Services</span>
                  <span className="text-mist/60">{mobileServicesOpen ? "−" : "+"}</span>
                </button>
                {mobileServicesOpen ? (
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    {dropdownItems.map((service) => (
                      <a
                        key={service.id || service.slug}
                        href={`/services/${service.slug || service.id}`}
                        className="rounded-lg border border-mist/10 bg-ink/60 px-3 py-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {service.title || service.name}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-xl border border-mist/10 bg-ink/50 px-4 py-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setMobileProjectsOpen((prev) => !prev)}
                >
                  <span>Projects</span>
                  <span className="text-mist/60">{mobileProjectsOpen ? "−" : "+"}</span>
                </button>
                {mobileProjectsOpen ? (
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    {projectItems.map((project) => (
                      <a
                        key={project.slug || project.id}
                        href={`/projects/${project.slug || project.id}`}
                        className="rounded-lg border border-mist/10 bg-ink/60 px-3 py-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {project.title}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-xl border border-mist/10 bg-ink/50 px-4 py-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setMobileBlogsOpen((prev) => !prev)}
                >
                  <span>Blog</span>
                  <span className="text-mist/60">{mobileBlogsOpen ? "−" : "+"}</span>
                </button>
                {mobileBlogsOpen ? (
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    {blogItems.map((post) => (
                      <a
                        key={post.slug || post.id}
                        href={`/blog/${post.slug || post.id}`}
                        className="rounded-lg border border-mist/10 bg-ink/60 px-3 py-2"
                        onClick={() => setMobileOpen(false)}
                      >
                        {post.title}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>

              <a
                href="#insights"
                className="block rounded-xl border border-mist/10 bg-ink/50 px-4 py-3"
                onClick={() => setMobileOpen(false)}
              >
                Insights
              </a>
            </div>

            <a
              href="#contact"
              className="btn-cta mt-6 inline-flex items-center justify-center bg-ember px-5 py-3 text-sm font-semibold text-ink"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
