import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Shield, TrendingUp } from "lucide-react";

const stats = [
  { value: "500+", label: "Businesses" },
  { value: "99%", label: "Satisfaction" },
  { value: "48h", label: "Delivery" },
  { value: "4.9★", label: "Rating" },
];

const Hero = ({ spotsLeft }: { spotsLeft: number }) => {
  return (
    <section id="top" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Radial hero background */}
      <div className="absolute inset-0 hero-radial pointer-events-none" />

      {/* Floating gradient orbs */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 70%), transparent 70%)" }}
      />
      <div
        className="absolute top-40 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(221 83% 65%), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        {/* Announcement pill */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-full glass text-[12px] font-semibold text-primary mb-6"
        >
          <span className="relative flex w-2 h-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          Only {spotsLeft} spots left — 1 Year FREE offer
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="text-[40px] sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-foreground max-w-4xl mx-auto"
        >
          Build professional websites{" "}
          <span className="gradient-text">that grow your business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed"
        >
          Premium websites with hosting, SSL, SEO, maintenance and 24/7 support.
          Delivered in 48 hours by a team obsessed with quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold btn-glow hover:brightness-110 transition-all"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-2xl bg-white border border-border font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
          >
            View Portfolio
          </a>
        </motion.div>

        {/* Hero mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative mx-auto max-w-4xl"
        >
          <div className="relative rounded-[28px] overflow-hidden glass-strong p-2">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/50">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 h-6 rounded-md bg-muted/60 max-w-sm mx-auto" />
            </div>
            {/* Mock content */}
            <div className="relative bg-gradient-to-br from-white via-[hsl(214_100%_98%)] to-[hsl(214_100%_94%)] p-6 sm:p-10 min-h-[280px] sm:min-h-[360px]">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="col-span-2 space-y-3">
                  <div className="h-3 rounded-full bg-primary/20 w-2/3" />
                  <div className="h-8 rounded-lg bg-foreground/80 w-3/4" />
                  <div className="h-8 rounded-lg bg-foreground/80 w-1/2" />
                  <div className="h-2 rounded-full bg-foreground/10 w-full mt-3" />
                  <div className="h-2 rounded-full bg-foreground/10 w-4/5" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-9 w-28 rounded-xl bg-primary btn-glow" />
                    <div className="h-9 w-24 rounded-xl bg-white border border-border" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-24 rounded-xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] btn-glow" />
                  <div className="h-16 rounded-xl bg-white border border-border" />
                  <div className="h-12 rounded-xl bg-white border border-border" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute -left-8 top-1/3 glass-strong rounded-2xl p-4 gap-3 items-center"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[11px] text-foreground/50 font-medium">Traffic</div>
              <div className="text-sm font-bold text-foreground">+248%</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:flex absolute -right-6 top-16 glass-strong rounded-2xl p-4 gap-3 items-center"
          >
            <Star className="w-5 h-5 text-primary" fill="currentColor" />
            <div className="text-left">
              <div className="text-[11px] text-foreground/50 font-medium">Rating</div>
              <div className="text-sm font-bold text-foreground">4.9 / 5.0</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden sm:flex absolute -right-10 bottom-8 glass-strong rounded-2xl p-4 gap-3 items-center"
          >
            <Zap className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-[11px] text-foreground/50 font-medium">Delivery</div>
              <div className="text-sm font-bold text-foreground">48 hours</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight gradient-text">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-foreground/50 font-medium mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
