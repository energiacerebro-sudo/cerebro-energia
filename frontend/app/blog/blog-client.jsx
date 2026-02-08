"use client";

import { useEffect, useMemo, useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

export default function BlogClient({ data }) {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(data.posts || []);
  const [total, setTotal] = useState(data.total || 0);
  const pageSize = 6;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const pages = Array.from({ length: maxPage }, (_, i) => i + 1);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE}/blog/?page=${page}&page_size=${pageSize}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const json = await res.json();
      setPosts(json.posts || []);
      setTotal(json.total || 0);
    }
    load();
  }, [page]);


  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">Blog</p>
            <h1 className="service-hero__title">Insights and delivery notes</h1>
            <p className="service-hero__subtitle">
              Articles on product strategy, engineering quality, and delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="service-section">
        <div className="service-grid">
          {posts.map((post) => (
            <div key={post.slug} className="service-card">
              <div className="service-card__media">
                {post.hero_image ? (
                  <img
                    src={post.hero_image}
                    alt={post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
              </div>
              <div className="service-card__content">
                <h3 className="text-xl font-semibold text-mist font-display">
                  {post.title}
                </h3>
                <p className="mt-3 text-mist/80">{post.excerpt}</p>
                <div className="service-card__actions">
                  <a
                    href={`/blog/${post.slug}`}
                    className="btn-cta inline-flex items-center gap-2 border border-ember/60 px-4 py-2 text-sm font-semibold text-mist"
                  >
                    Read Article
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            className="btn-cta border border-ember/60 px-4 py-2 text-sm text-mist"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>
          {pages.map((p) => (
            <button
              key={p}
              className={`btn-cta border border-ember/60 px-3 py-2 text-sm ${
                p === page ? "bg-ember text-ink" : "text-mist"
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className="btn-cta border border-ember/60 px-4 py-2 text-sm text-mist"
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
            disabled={page >= maxPage}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}
