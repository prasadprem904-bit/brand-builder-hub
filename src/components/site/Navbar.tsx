import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-5 h-14 transition-all duration-500 ${
            scrolled
              ? "glass-strong"
              : "bg-white/40 backdrop-blur-md border border-white/50"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center btn-glow">
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-[15px] tracking-tight text-foreground">
              Business<span className="gradient-text">Growth</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-[13px] font-semibold btn-glow hover:brightness-110 transition-all"
            >
              Get Started
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/70 border border-border/60 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: open ? "auto" : 0,
            opacity: open ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="mt-2 glass-strong rounded-2xl p-3 flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-primary/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center btn-glow"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;
