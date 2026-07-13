import { motion } from "framer-motion";
import {
  Globe, LayoutTemplate, Building2, ShoppingBag, User, UtensilsCrossed,
  Stethoscope, GraduationCap, Home, CalendarCheck, Code2, Wrench,
  Search, Server, LinkIcon, BarChart3,
} from "lucide-react";

const services = [
  { icon: Globe, title: "Responsive Website", desc: "Pixel-perfect on every device." },
  { icon: LayoutTemplate, title: "Landing Pages", desc: "High-converting single pages." },
  { icon: Building2, title: "Business Website", desc: "Professional corporate presence." },
  { icon: ShoppingBag, title: "Ecommerce", desc: "Sell online with confidence." },
  { icon: User, title: "Portfolio", desc: "Showcase your work beautifully." },
  { icon: UtensilsCrossed, title: "Restaurant", desc: "Menu, booking & orders." },
  { icon: Stethoscope, title: "Medical", desc: "Clinics, doctors & hospitals." },
  { icon: GraduationCap, title: "Education", desc: "Schools, courses, coaching." },
  { icon: Home, title: "Real Estate", desc: "Property listings & leads." },
  { icon: CalendarCheck, title: "Booking Website", desc: "Appointments made simple." },
  { icon: Code2, title: "Custom Web App", desc: "Bespoke tools for your team." },
  { icon: Wrench, title: "Maintenance", desc: "Monthly updates & fixes." },
  { icon: Search, title: "SEO", desc: "Rank higher on Google." },
  { icon: Server, title: "Hosting", desc: "Fast, secure & reliable." },
  { icon: LinkIcon, title: "Free Domain", desc: "Own your brand address." },
  { icon: BarChart3, title: "Analytics", desc: "Know what your users do." },
];

const Services = () => {
  return (
    <section id="services" className="section-bg py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Services
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            Everything you need to <span className="gradient-text">grow online</span>
          </h2>
          <p className="mt-4 text-base text-foreground/60">
            From strategy to launch to scale — one team, end-to-end.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="card-premium p-6 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center mb-4 btn-glow group-hover:scale-110 transition-transform duration-500">
                <s.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="text-[15px] font-bold text-foreground">{s.title}</h3>
              <p className="text-[13px] text-foreground/55 mt-1 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
