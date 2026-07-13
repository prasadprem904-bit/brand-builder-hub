import { Sparkles, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="section-bg border-t border-border/60 pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center btn-glow">
                <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-base tracking-tight text-foreground">
                Business<span className="gradient-text">Growth</span>
              </span>
            </div>
            <p className="text-sm text-foreground/55 leading-relaxed max-w-sm">
              Premium websites, hosting, SEO & maintenance for small businesses that want to grow online.
            </p>
            <div className="flex gap-2 mt-5">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm text-foreground/60">
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#process" className="hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm text-foreground/60">
              <li><a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} BusinessGrowth. All rights reserved.
          </p>
          <p className="text-xs text-foreground/40">Made with care in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
