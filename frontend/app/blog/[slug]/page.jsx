const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchPost(slug) {
  const res = await fetch(`${API_BASE}/blog/${slug}/`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await fetchPost(params.slug);
  if (!data) return { title: "Article Not Found" };
  const post = data.post;
  const title = post.title;
  const description = post.excerpt || "";
  const image = post.hero_image || "";
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

export default async function BlogDetailPage({ params }) {
  const data = await fetchPost(params.slug);
  if (!data) {
    return (
      <main className="px-6 py-24 text-mist">
        <h1 className="text-3xl font-semibold">Article not found</h1>
      </main>
    );
  }

  const post = data.post;
  const gallery = data.gallery || [];
  const carousel = data.carousel || [];
  const reviews = data.reviews || [];
  const average =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <main className="service-page">
      <section className="service-hero">
        <div className="service-hero__inner">
          <div className="service-hero__content">
            <p className="service-hero__eyebrow">{post.category || "Blog"}</p>
            <h1 className="service-hero__title">{post.title}</h1>
            <p className="service-hero__subtitle">{post.excerpt}</p>
            <div className="service-hero__highlight">
              <p>By {post.author || "Cerebro Energia"} • {post.reading_time || 5} min read</p>
            </div>
          </div>
          <div className="service-hero__media">
            {post.hero_image ? (
              <img src={post.hero_image} alt={post.title} loading="lazy" />
            ) : (
              <div className="service-hero__placeholder">
                <div className="service-hero__placeholder-inner" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="service-section">
        <div
          className="service-rich"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </section>

      {carousel.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">Carousel</p>
            <h2 className="service-section__title">Visual highlights</h2>
          </div>
          <div className="service-carousel">
            <div className="service-carousel__track">
              {carousel.map((item, idx) => (
                <div className="service-carousel__item" key={idx}>
                  <img
                    src={item.image_url}
                    alt={item.title || post.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {item.title ? <p>{item.title}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">Gallery</p>
            <h2 className="service-section__title">Image gallery</h2>
          </div>
          <div className="service-gallery">
            {gallery.map((item, idx) => (
              <img
                key={idx}
                src={item.image_url}
                alt={item.title || post.title}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </section>
      ) : null}

      {reviews.length ? (
        <section className="service-section">
          <div className="service-section__header">
            <p className="service-section__eyebrow">Reviews</p>
            <h2 className="service-section__title">Reader feedback</h2>
          </div>
          <div className="mb-4 flex items-center gap-3 text-sm text-mist/70">
            <span>Average rating:</span>
            <span className="text-ember font-semibold">{average}</span>
            <span>({reviews.length} reviews)</span>
          </div>
          <div className="service-cards">
            {reviews.map((review, idx) => (
              <div className="service-card-detail" key={idx}>
                <h3>{review.reviewer_name}</h3>
                <div className="mt-2 flex items-center gap-1 text-ember">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "" : "text-mist/30"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
