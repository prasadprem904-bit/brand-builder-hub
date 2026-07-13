import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { name: "Rahul Sharma", role: "Founder, ChaiPoint Cafe", quote: "They delivered in 2 days flat. Bookings tripled in the first month.", rating: 5 },
  { name: "Priya Verma", role: "Owner, Verma Boutique", quote: "The design is stunning. Customers keep asking who built our website.", rating: 5 },
  { name: "Dr. Amit Patel", role: "Sunrise Clinic", quote: "Patient inquiries jumped 4x once we went live. Support is excellent.", rating: 5 },
  { name: "Neha Kapoor", role: "Kapoor Real Estate", quote: "Best decision. The SEO alone paid for the entire project in a month.", rating: 5 },
  { name: "Sameer Khan", role: "Khan Motors", quote: "Professional, fast and honest. Rare combination these days.", rating: 5 },
  { name: "Ananya Iyer", role: "Iyer Yoga Studio", quote: "The booking flow is beautiful. My students love it.", rating: 5 },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-bg py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Testimonials
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            Loved by <span className="gradient-text">500+ businesses</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card-premium p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary" fill="currentColor" />
                ))}
              </div>
              <p className="text-[15px] text-foreground/80 leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-foreground/50">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
