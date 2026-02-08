"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero({ site }) {
  const heroRef = useRef(null);
  const splitWords = (text) =>
    text
      .split(" ")
      .map((word, index) => ({ word, key: `${word}-${index}` }));

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-eyebrow-mark, .hero-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
      });
      gsap.from(".hero-title-word", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.05,
        stagger: 0.05,
      });
      gsap.from(".hero-title-underline", {
        scaleX: 0,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.25,
        transformOrigin: "left center",
      });
      gsap.from(".hero-subtitle-word, .hero-subtitle-mark", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.2,
        stagger: 0.02,
      });
      gsap.from(".hero-cta", {
        y: 12,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.35,
        stagger: 0.08,
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={heroRef}
      className="relative min-h-[calc(100vh-72px)] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0f6b5f55,transparent_60%)]" />
      <div className="flex min-h-[calc(100vh-72px)] w-full items-start">
        <div className="m-4 flex w-full min-h-[calc(100vh-72px-40px)] items-center rounded-[12px] bg-[radial-gradient(circle_at_top_left,#ffffff,#f1f3f5_45%,#d9dee3)] p-6 sm:p-8 md:p-12">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
            <div className="hero-eyebrow-row text-sm uppercase tracking-[0.3em] text-ink/60">
              <svg
                className="hero-eyebrow-mark"
                width="36"
                height="14"
                viewBox="0 0 36 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="3" width="10" height="8" rx="4" fill="#0F6B5F" opacity="0.35" />
                <rect x="10" y="5" width="10" height="4" rx="2" fill="#0F6B5F" />
                <rect x="20" y="3" width="14" height="8" rx="4" stroke="#FF7A2F" strokeWidth="2" />
                <circle cx="30" cy="7" r="2" fill="#FF7A2F" />
              </svg>
              <p className="hero-eyebrow">
                {site?.tagline || "Mobile apps and software, built with clarity"}
              </p>
            </div>
            <h1 className="hero-title mt-6 text-3xl font-semibold text-ink font-display sm:text-4xl lg:text-5xl">
              {splitWords(
                site?.hero_title ||
                  "Cerebro Energia builds digital products that move businesses forward"
              ).map((part) => (
                <span key={part.key} className="hero-title-word">
                  {part.word}
                </span>
              ))}
              <span className="hero-title-underline" aria-hidden="true" />
            </h1>
            <div className="hero-subtitle mt-6 text-base text-ink/70 sm:text-lg">
              <svg
                className="hero-subtitle-mark"
                width="44"
                height="16"
                viewBox="0 0 44 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 8 H26" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                <circle cx="34" cy="8" r="4" fill="#FF7A2F" />
                <path d="M39 4 L42 8 L39 12" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p>
                {splitWords(
                  site?.hero_subtitle ||
                    "We design and engineer mobile apps, web platforms, and internal tools that are fast, secure, and ready to scale."
                ).map((part) => (
                  <span key={part.key} className="hero-subtitle-word">
                    {part.word}
                  </span>
                ))}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
              <a
                href="#contact"
                className="hero-cta btn-cta bg-ember px-5 py-3 text-sm font-semibold text-ink sm:px-6"
              >
                Get Started
              </a>
              <a
                href="#projects"
                className="hero-cta btn-cta border border-ink/20 px-5 py-3 text-sm font-semibold text-ink sm:px-6"
              >
                See Our Work
              </a>
            </div>
            </div>
            <div className="relative hidden h-[380px] items-center justify-center lg:flex">
              <div className="absolute -inset-10 rounded-[32px] bg-[radial-gradient(circle,#0f6b5f33,transparent_60%)] blur-2xl" />
              <svg
                className="hero-frame h-[360px] w-[440px]"
                viewBox="0 0 440 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="orbitStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0F6B5F" />
                    <stop offset="100%" stopColor="#FF7A2F" />
                  </linearGradient>
                  <radialGradient
                    id="coreGlow"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(160 160) rotate(90) scale(110)"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="55%" stopColor="#F2F4F7" />
                    <stop offset="100%" stopColor="#D2D8DD" />
                  </radialGradient>
                </defs>
                <rect
                  x="40"
                  y="50"
                  width="360"
                  height="220"
                  rx="26"
                  stroke="url(#orbitStroke)"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <rect x="26" y="36" width="388" height="248" rx="34" stroke="#0B0F1A" strokeWidth="1" opacity="0.12" />
                <circle cx="220" cy="160" r="58" fill="url(#coreGlow)" />
                <circle cx="220" cy="160" r="58" stroke="#0B0F1A" strokeWidth="1" opacity="0.15" />
                <text
                  x="220"
                  y="167"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="'Space Grotesk', sans-serif"
                  fill="#0B0F1A"
                  letterSpacing="4"
                >
                  AI
                </text>

                <g className="hero-float" transform="translate(-40 -10)">
                  <rect x="126" y="88" width="68" height="112" rx="10" stroke="#0B0F1A" strokeWidth="2" />
                  <rect x="134" y="100" width="52" height="80" rx="6" fill="#F2F4F7" />
                  <circle cx="160" cy="190" r="4" fill="#0B0F1A" opacity="0.6" />
                </g>

                <g className="hero-float" transform="translate(36 -18)">
                  <path
                    d="M72 156 C72 136, 88 122, 108 122 C114 102, 134 90, 156 90 C180 90, 200 108, 202 132 C220 136, 234 152, 234 172 C234 194, 216 212, 194 212 L104 212 C84 212, 68 196, 68 176"
                    stroke="#0F6B5F"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.7"
                  />
                </g>

                <g className="hero-float" transform="translate(-46 18)">
                  <path d="M78 228 L98 212 L78 196" stroke="#FF7A2F" strokeWidth="4" strokeLinecap="round" />
                  <path d="M242 228 L222 212 L242 196" stroke="#FF7A2F" strokeWidth="4" strokeLinecap="round" />
                </g>

                <g className="hero-float" transform="translate(56 26)">
                  <rect x="208" y="222" width="60" height="30" rx="12" stroke="#0B0F1A" strokeWidth="2" />
                  <circle cx="224" cy="237" r="4" fill="#0F6B5F" />
                  <circle cx="240" cy="237" r="4" fill="#FF7A2F" />
                  <rect x="258" y="233" width="8" height="8" rx="2" fill="#0B0F1A" opacity="0.6" />
                </g>

                <circle className="hero-pulse" cx="110" cy="110" r="7" fill="#FF7A2F" />
                <circle className="hero-pulse" cx="320" cy="118" r="6" fill="#0F6B5F" />
                <circle className="hero-pulse" cx="300" cy="250" r="7" fill="#0B0F1A" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
