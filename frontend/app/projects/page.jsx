import ProjectsClient from "./projects-client";

const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects/`, { cache: "no-store" });
  if (!res.ok) return { projects: [] };
  return res.json();
}

export default async function ProjectsPage() {
  const data = await fetchProjects();
  return <ProjectsClient data={data} />;
}
