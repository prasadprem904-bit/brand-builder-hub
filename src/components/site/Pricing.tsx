import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "one-time",
    tagline: "For solopreneurs launching fast.",
    features: [
      "5-page responsive website",
      "Free domain (1 year)",
      "Free SSL & hosting",
      "Contact form + WhatsApp",
      "Basic SEO setup",
      "3 days delivery",
    ],
  },
  {
    name: "Growth",
    price: "₹12,999",
    period: "one-time",
    tagline: "Most popular — for serious businesses.",
    popular: true,
    features: [
      "10-page premium website",
      "Free domain + business email",
      "Advanced SEO + analytics",
      "Google Business listing",
      "Blog & CMS ready",
      "Monthly maintenance (3 mo)",
      "Priority WhatsApp support",
    ],
  },
  {
    name: "Premium",
    price: "₹29,999",
    period: "one-time",
    tagline: "For scaling brands & ecommerce.",
    features: [
      "Unlimited pages + ecommerce",
      "Custom design system",
      "Payment gateway integration",
      "Advanced automation",
      "Full-year maintenance",
      "Dedicated account manager",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            Simple, honest <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-base text-foreground/60">
            Everything included. No hidden fees, ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-[28px] p-8 ${
                p.popular
                  ? "bg-gradient-to-br from-primary to-[hsl(224_76%_48%)] text-white shadow-[0_30px_80px_-20px_hsl(221_83%_53%/0.5)]"
                  : "card-premium"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 h-7 px-3 rounded-full bg-white text-primary text-[11px] font-bold shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  MOST POPULAR
                </div>
              )}
              <h3 className={`text-lg font-bold ${p.popular ? "text-white" : "text-foreground"}`}>
                {p.name}
              </h3>
              <p className={`text-sm mt-1 ${p.popular ? "text-white/70" : "text-foreground/55"}`}>
                {p.tagline}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className={`text-5xl font-extrabold tracking-tight ${p.popular ? "text-white" : "text-foreground"}`}>
                  {p.price}
                </span>
                <span className={`text-sm ${p.popular ? "text-white/60" : "text-foreground/50"}`}>
                  {p.period}
                </span>
              </div>
              <a
                href="#contact"
                className={`mt-6 flex items-center justify-center h-12 rounded-2xl font-semibold transition-all ${
                  p.popular
                    ? "bg-white text-primary hover:brightness-95"
                    : "bg-primary text-primary-foreground btn-glow hover:brightness-110"
                }`}
              >
                Get Started
              </a>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${p.popular ? "text-white" : "text-primary"}`} />
                    <span className={p.popular ? "text-white/90" : "text-foreground/75"}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
