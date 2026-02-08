import ServiceDetailClient from "./service-detail-client";

const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchService(slug) {
  const res = await fetch(`${API_BASE}/services/${slug}/`, {
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const data = await fetchService(params.slug);
  if (!data) {
    return { title: "Service Not Found" };
  }

  const detail = data.detail || {};
  const title = detail.meta_title || data.service?.title || "Service";
  const description =
    detail.meta_description || data.service?.description || "Service details.";
  const image = detail.meta_image || data.service?.card_image || "";

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

export default async function ServiceDetailPage({ params }) {
  const data = await fetchService(params.slug);
  if (!data) {
    return (
      <main className="px-6 py-24 text-mist">
        <h1 className="text-3xl font-semibold">Service not found</h1>
      </main>
    );
  }

  return <ServiceDetailClient data={data} />;
}
