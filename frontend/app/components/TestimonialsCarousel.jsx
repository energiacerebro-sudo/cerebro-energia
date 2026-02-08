"use client";

import { useEffect, useRef, useState } from "react";

export default function TestimonialsCarousel({ testimonials }) {
  const items = testimonials || [];
  const loopItems = items.concat(items);
  const trackRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(420);
  const gap = 16;

  const backgroundFor = (t) => {
    const key = (t.country || "").toLowerCase();
    const map = {
      india:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      spain:
        "https://images.unsplash.com/photo-1464790719320-516ecd75af6c?auto=format&fit=crop&w=1200&q=80",
      uae:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      "united states":
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
      canada:
        "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?auto=format&fit=crop&w=1200&q=80",
      germany:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
      italy:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    };
    return map[key] || "";
  };

  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardWidth(280);
      } else if (width < 1024) {
        setCardWidth(320);
      } else {
        setCardWidth(420);
      }
    };
    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    let rafId;
    const speed = 0.35; // px per frame for smooth continuous scroll
    const tick = () => {
      if (!isInteracting && trackRef.current) {
        trackRef.current.scrollLeft += speed;
        if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth / 2) {
          trackRef.current.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInteracting]);

  const scrollBy = (delta) => {
    if (!trackRef.current) return;
    setIsInteracting(true);
    trackRef.current.scrollBy({ left: delta, behavior: "smooth" });
    setTimeout(() => setIsInteracting(false), 5000);
  };

  useEffect(() => {
    if (!trackRef.current || items.length === 0) return;
    const el = trackRef.current;
    const handleScroll = () => {
      const step = cardWidth + gap;
      const index = Math.round(el.scrollLeft / step) % items.length;
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [items.length, cardWidth]);

  return (
    <section className="relative">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-mist font-display sm:text-3xl">
            What clients say
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-cta border border-ember/60 px-3 py-2 text-sm text-mist"
            onClick={() => scrollBy(-(cardWidth + gap))}
          >
            ←
          </button>
          <button
            type="button"
            className="btn-cta border border-ember/60 px-3 py-2 text-sm text-mist"
            onClick={() => scrollBy(cardWidth + gap)}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
      >
        {loopItems.map((t, idx) => (
          <div
            key={`${t.name}-${idx}`}
            className="snap-start shrink-0 glass rounded-3xl p-5 sm:p-6 relative overflow-hidden"
            style={{ width: cardWidth, height: cardWidth }}
          >
            {backgroundFor(t) ? (
              <div className="pointer-events-none absolute inset-0">
                <img
                  src={backgroundFor(t)}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover opacity-50"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/60" />
              </div>
            ) : null}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mist/10 sm:h-20 sm:w-20">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt={t.name}
                      className="h-16 w-16 rounded-2xl object-cover sm:h-20 sm:w-20"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : t.gender === "female" ? (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="10" r="6" stroke="#FF7A2F" strokeWidth="2" />
                      <path d="M13 16 V24" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 20 H17" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : t.gender === "male" ? (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle cx="11" cy="15" r="6" stroke="#0F6B5F" strokeWidth="2" />
                      <path d="M15 11 L22 4" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                      <path d="M17 4 H22 V9" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <circle cx="13" cy="13" r="6" stroke="#0B0F1A" strokeWidth="2" opacity="0.6" />
                      <path d="M13 7 V19" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                      <path d="M7 13 H19" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-base font-semibold text-mist sm:text-lg">
                    {t.name}
                  </p>
                  <p className="text-xs text-mist/60 sm:text-sm">
                    {t.city}, {t.state}, {t.country}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm text-mist/80 leading-relaxed sm:text-base">
                {t.review}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to testimonial ${idx + 1}`}
            onClick={() => {
              if (!trackRef.current) return;
              setIsInteracting(true);
              trackRef.current.scrollTo({
                left: idx * (cardWidth + gap),
                behavior: "smooth",
              });
              setTimeout(() => setIsInteracting(false), 5000);
            }}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "bg-ember shadow-[0_0_12px_rgba(255,122,47,0.9)] scale-125"
                : "bg-mist/30 hover:bg-ember/70 hover:shadow-[0_0_8px_rgba(255,122,47,0.6)]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
