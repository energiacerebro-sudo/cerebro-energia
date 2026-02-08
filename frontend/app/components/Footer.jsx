"use client";

import { useState } from "react";

const PUBLIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000/api";

export default function Footer() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${PUBLIC_API_BASE}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        setStatus(data.error || "Something went wrong.");
        return;
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("Thanks! We'll reach out soon.");
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  }

  return (
    <footer id="contact" className="mt-16 border-t border-mist/10 bg-ink/70">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr] md:py-14">
        <div>
          <h3 className="text-2xl font-semibold text-mist font-display">
            Cerebro Energia
          </h3>
          <p className="mt-4 text-mist/80">
            Mobile app development, software engineering, cloud systems, and
            digital products that scale with your business.
          </p>
          <div className="mt-6 space-y-2 text-sm text-mist/70">
            <p>hello@cerebroenergia.com</p>
            <p>
              Level 4, Dynasty Business Park, Andheri - Kurla Rd, A-Wing, Vijay
              Nagar Colony, J B Nagar, Andheri East, Mumbai, Maharashtra 400059
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-mist/10 bg-ink/60 p-6">
          <h4 className="text-lg font-semibold text-mist font-display">
            Start a conversation
          </h4>
          <p className="mt-2 text-sm text-mist/70">
            Tell us about your product and timeline. We’ll respond within 1–2
            business days.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              className="w-full rounded-xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
              placeholder="Full name"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
              required
            />
            <input
              className="w-full rounded-xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
              placeholder="Email address"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
              required
            />
            <textarea
              className="min-h-[120px] w-full rounded-xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
              placeholder="What can we build together?"
              value={form.message}
              onChange={(event) =>
                setForm({ ...form, message: event.target.value })
              }
              required
            />
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="btn-cta bg-ember px-5 py-2 text-sm font-semibold text-ink"
              >
                Send message
              </button>
              <span className="text-sm text-mist/70">{status}</span>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-mist/10 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between px-6 text-xs text-mist/60">
          <span>© {new Date().getFullYear()} Cerebro Energia. All rights reserved.</span>
          <span>Privacy • Terms • Security</span>
        </div>
      </div>
    </footer>
  );
}
