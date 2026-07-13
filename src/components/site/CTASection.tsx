import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary via-[hsl(217_91%_55%)] to-[hsl(224_76%_48%)] px-8 sm:px-16 py-16 sm:py-20 text-center shadow-[0_40px_100px_-20px_hsl(221_83%_53%/0.4)]"
        >
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-white leading-[1.05] max-w-3xl mx-auto">
              Ready to grow your business?
            </h2>
            <p className="mt-5 text-white/80 text-lg max-w-xl mx-auto">
              Let's build something amazing together. It takes 60 seconds to get started.
            </p>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 h-14 px-8 rounded-2xl bg-white text-primary font-bold text-base hover:brightness-95 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
