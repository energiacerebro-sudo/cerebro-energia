import { motion } from "framer-motion";
import { GridPattern } from "./grid-pattern";

function GenderIcon({ gender }) {
  if (gender === "female") {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="10" r="6" stroke="#FF7A2F" strokeWidth="2" />
        <path d="M13 16 V24" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 20 H17" stroke="#FF7A2F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (gender === "male") {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="11" cy="15" r="6" stroke="#0F6B5F" strokeWidth="2" />
        <path d="M15 11 L22 4" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 4 H22 V9" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <circle cx="13" cy="13" r="6" stroke="#0B0F1A" strokeWidth="2" opacity="0.6" />
      <path d="M13 7 V19" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M7 13 H19" stroke="#0B0F1A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function TestimonialsSection({ testimonials }) {
  const items = testimonials || [];

  return (
    <section className="relative w-full pt-16 pb-24 px-4">
      <div aria-hidden className="absolute inset-0 isolate z-0 contain-strict">
        <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)] absolute top-0 left-0 h-320 w-140 -translate-y-87.5 -rotate-45 rounded-full" />
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 [translate:5%_-50%] -rotate-45 rounded-full" />
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,--theme(--color-foreground/.04)_0,--theme(--color-foreground/.01)_80%,transparent_100%)] absolute top-0 left-0 h-320 w-60 -translate-y-87.5 -rotate-45 rounded-full" />
      </div>
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold tracking-wide text-balance md:text-5xl lg:text-6xl xl:text-7xl xl:font-extrabold font-display uppercase">
            Real Results, Real Voices
          </h1>
          <p className="text-muted-foreground text-base md:text-lg lg:text-xl">
            Insights from teams across industries — real stories, real impact.
          </p>
        </div>
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, index) => {
            const location = [t.city, t.state, t.country].filter(Boolean).join(", ");
            return (
              <motion.div
                initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
                whileInView={{
                  filter: "blur(0px)",
                  translateY: 0,
                  opacity: 1,
                }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index + 0.1, duration: 0.8 }}
                key={`${t.name}-${index}`}
                className="border-foreground/25 relative grid min-h-[420px] grid-cols-[auto_1fr] gap-x-5 overflow-hidden border border-dashed p-7 md:p-8 bg-ink/40 rounded-3xl shadow-[0_14px_45px_rgba(11,15,26,0.45)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(11,15,26,0.55)]"
              >
                <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                  <div className="from-foreground/5 to-foreground/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
                    <GridPattern
                      width={25}
                      height={25}
                      x={-12}
                      y={4}
                      strokeDasharray="3"
                      className="stroke-foreground/20 absolute inset-0 h-full w-full mix-blend-overlay"
                    />
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-3 rounded-none bg-[radial-gradient(circle_at_top,#FF7A2F55,transparent_70%)] blur-lg" />
                  <div className="absolute -inset-1 rounded-none border border-dashed border-ember/60" />
                  {t.image ? (
                    <img
                      alt={t.name}
                      src={t.image}
                      loading="lazy"
                      className="h-28 w-28 rounded-none object-cover"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-none bg-mist/10">
                      <GenderIcon gender={t.gender} />
                    </div>
                  )}
                  <svg
                    className="absolute -bottom-3 -right-3"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="11" stroke="#FF7A2F" strokeWidth="2" />
                    <path d="M7 12 H17" stroke="#0F6B5F" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <div className="-mt-0.5 -space-y-0.5">
                    <p className="text-lg md:text-xl font-semibold tracking-wide">{t.name}</p>
                    <span className="text-muted-foreground block text-xs md:text-sm font-light tracking-tight">
                      {t.role || "Client"} {location ? `• ${location}` : ""}
                    </span>
                  </div>
                  <blockquote className="mt-3">
                    <p className="text-foreground text-base md:text-lg font-light tracking-wide leading-relaxed">
                      {t.review}
                    </p>
                  </blockquote>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
