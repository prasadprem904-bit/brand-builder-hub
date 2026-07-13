const brands = [
  "Acme Corp", "Nova Labs", "Quantum", "Vertex", "Lumen",
  "Orbit", "Prism", "Nimbus", "Fable", "Zenith",
  "Ember", "Halo",
];

const TrustedBy = () => {
  return (
    <section className="py-14 border-y border-border/60 bg-white overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-foreground/40 mb-8">
        Trusted by 500+ growing businesses
      </p>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex marquee-track w-max">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="mx-8 text-2xl font-bold tracking-tight text-foreground/30 hover:text-foreground/60 transition-colors whitespace-nowrap"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
