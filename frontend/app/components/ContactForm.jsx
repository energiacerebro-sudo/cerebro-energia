"use client";

import { useState } from "react";

export default function ContactForm({ apiBase }) {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch(`${apiBase}/contact/`, {
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
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
          placeholder="Full name"
          value={form.name}
          onChange={(event) =>
            setForm({ ...form, name: event.target.value })
          }
          required
        />
        <input
          className="rounded-2xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm({ ...form, email: event.target.value })
          }
          required
        />
      </div>
      <textarea
        className="mt-4 min-h-[140px] w-full rounded-2xl border border-mist/20 bg-transparent px-4 py-3 text-mist"
        placeholder="Tell us about your project"
        value={form.message}
        onChange={(event) =>
          setForm({ ...form, message: event.target.value })
        }
        required
      />
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="btn-cta bg-ember px-6 py-3 text-sm font-semibold text-ink"
        >
          Send message
        </button>
        <span className="text-sm text-mist/70">{status}</span>
      </div>
    </form>
  );
}
