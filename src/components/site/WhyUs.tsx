import { motion } from "framer-motion";
import { Rocket, Palette, Search, ShieldCheck, Server, Gauge, Lock, LineChart, Wrench, Headphones } from "lucide-react";

const features = [
  { icon: Rocket, title: "Fast Delivery", desc: "48-hour turnaround on most projects." },
  { icon: Palette, title: "Modern Design", desc: "Award-quality UI, made for your brand." },
  { icon: Search, title: "SEO Optimized", desc: "Rank higher, get discovered on Google." },
  { icon: ShieldCheck, title: "Free SSL", desc: "Every site secured by HTTPS by default." },
  { icon: Server, title: "Hosting Included", desc: "Blazing infrastructure, zero setup." },
  { icon: Gauge, title: "95+ Performance", desc: "Lighthouse-grade speed everywhere." },
  { icon: Lock, title: "Security First", desc: "Best practices baked into every layer." },
  { icon: LineChart, title: "Analytics", desc: "Understand every visitor and click." },
  { icon: Wrench, title: "Monthly Maintenance", desc: "Updates, backups, monitoring." },
  { icon: Headphones, title: "Unlimited Support", desc: "24/7 human help via WhatsApp." },
];

const WhyUs = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            The details others <span className="gradient-text">quietly skip</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              className="card-premium p-5"
            >
              <f.icon className="w-6 h-6 text-primary mb-3" strokeWidth={2} />
              <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
              <p className="text-xs text-foreground/55 mt-1 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
