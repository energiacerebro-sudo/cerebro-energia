import BlogClient from "./blog-client";

const API_BASE =
  process.env.INTERNAL_API_BASE ||
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:8000/api";

async function fetchPosts() {
  const res = await fetch(`${API_BASE}/blog/`, { cache: "no-store" });
  if (!res.ok) return { posts: [] };
  return res.json();
}

export default async function BlogPage() {
  const data = await fetchPosts();
  return <BlogClient data={data} />;
}
