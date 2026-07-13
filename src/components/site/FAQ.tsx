import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How long does it take to build my website?", a: "Most websites are delivered in 48–72 hours. Larger projects like ecommerce or custom web apps typically take 5–10 business days." },
  { q: "Do you provide hosting and domain?", a: "Yes. Every plan includes a free domain for the first year, blazing-fast hosting, and free SSL — all managed by us." },
  { q: "Can I request changes after the site is live?", a: "Absolutely. Growth and Premium plans include monthly maintenance and unlimited minor edits." },
  { q: "Do you help with SEO and Google listing?", a: "Yes — every project includes on-page SEO, sitemap, schema markup, and a Google Business Profile setup." },
  { q: "What if I don't like the design?", a: "You'll see a UI preview before development starts. We iterate until you love it — no launch until you're happy." },
  { q: "How do I get support?", a: "24/7 WhatsApp support. Most replies come within 15 minutes during working hours." },
];

const Item = ({ q, a, i }: { q: string; a: string; i: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
      className="card-premium overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-left p-6 gap-4"
      >
        <span className="text-base font-semibold text-foreground">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center"
        >
          <Plus className="w-4 h-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm text-foreground/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            FAQ
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
            Questions, <span className="gradient-text">answered</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
