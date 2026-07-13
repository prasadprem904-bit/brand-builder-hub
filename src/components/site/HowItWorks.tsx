import { motion } from "framer-motion";

const steps = [
  { n: "01", t: "Choose Plan", d: "Pick the plan that fits your goals." },
  { n: "02", t: "Secure Payment", d: "Pay safely via UPI, card or netbanking." },
  { n: "03", t: "WhatsApp Meeting", d: "We connect within an hour." },
  { n: "04", t: "Share Requirements", d: "Content, branding, style — we guide you." },
  { n: "05", t: "UI Preview", d: "See your design before development." },
  { n: "06", t: "Development", d: "Our team builds fast and clean." },
  { n: "07", t: "Review", d: "Rounds of polish until you love it." },
  { n: "08", t: "Launch", d: "We publish, DNS, SSL, analytics — done." },
  { n: "09", t: "Monthly Support", d: "We stay by your side, forever." },
];

const HowItWorks = () => {
  return (
    <section id="process" className="section-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            From idea to launch, in <span className="gradient-text">nine calm steps</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          <div className="space-y-6 md:space-y-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className={`md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div className={`card-premium p-6 md:my-4 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8 md:col-start-2"}`}>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold gradient-text tracking-tight">
                      {s.n}
                    </span>
                    <h3 className="text-lg font-bold text-foreground">{s.t}</h3>
                  </div>
                  <p className="text-sm text-foreground/60 mt-2 leading-relaxed">{s.d}</p>
                </div>
                {/* spacer for opposite column */}
                <div className="hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
