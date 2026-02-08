export default function Section({ title, eyebrow, children }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-8">
          {eyebrow ? (
            <p className="text-sm uppercase tracking-[0.3em] text-ember">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-2xl font-semibold text-mist font-display sm:text-3xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
