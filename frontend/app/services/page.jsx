import ServicesClient from "./services-client";

const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchServices() {
  const res = await fetch(`${API_BASE}/services/`, { cache: "no-store" });
  if (!res.ok) return { services: [] };
  return res.json();
}

export default async function ServicesPage() {
  const data = await fetchServices();
  return <ServicesClient data={data} />;
}
