import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Rocket, Loader2, Sparkles, PartyPopper, MessageCircle, Send, X, Crown, Zap, Gift, Flame, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustedBy from "@/components/site/TrustedBy";
import Services from "@/components/site/Services";
import WhyUs from "@/components/site/WhyUs";
import HowItWorks from "@/components/site/HowItWorks";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import CTASection from "@/components/site/CTASection";
import Footer from "@/components/site/Footer";


const services = [
  "Website Creation",
  "Free Domain Name",
  "Google Business Listing",
  "Business Advertisement",
  "Brand Logo Design",
];

const statusSteps = [
  { label: "📩 Received", sublabel: "Your details have been received" },
  { label: "🔍 Analyzing", sublabel: "Our team is reviewing your business" },
  { label: "🚀 Work Started", sublabel: "We're building your growth plan!" },
];

const Particle = ({ index }: { index: number }) => {
  const size = 2 + Math.random() * 4;
  const left = Math.random() * 100;
  const delay = Math.random() * 5;
  const duration = 4 + Math.random() * 6;
  const hue = [217, 45, 142, 270, 180][index % 5];
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        bottom: -10,
        background: `hsl(${hue}, 80%, 65%)`,
        boxShadow: `0 0 ${size * 2}px hsl(${hue}, 80%, 65%)`,
      }}
      animate={{
        y: [0, -(window.innerHeight + 50)],
        x: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const SuccessScreen = ({ onWhatsAppSend, showWhatsApp }: { onWhatsAppSend: () => void; showWhatsApp: boolean }) => {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Confetti burst
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 }, colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e", "#a855f7"] });
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors: ["#2563eb", "#eab308"] });
      confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors: ["#f43f5e", "#a855f7"] });
    }, 500);

    setTimeout(() => setShowContent(true), 400);

    // Status step progression
    const t1 = setTimeout(() => setCurrentStatus(1), 2000);
    const t2 = setTimeout(() => setCurrentStatus(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating particles — reduced for smoothness */}
      {[...Array(12)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Static gradient orbs (no animation — GPU-friendly) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 50%), transparent)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(45 100% 51%), transparent)", right: -100, top: -100 }}
      />

      {/* Main popup card */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="relative z-10 bg-card/95 backdrop-blur-sm border border-border rounded-3xl shadow-2xl p-8 max-w-md w-full mx-auto"
            initial={{ scale: 0.5, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          >
            {/* Glow border effect */}
            <motion.div
              className="absolute -inset-[1px] rounded-3xl pointer-events-none"
              style={{ background: "linear-gradient(135deg, hsl(217 91% 50% / 0.3), hsl(45 100% 51% / 0.2), hsl(217 91% 50% / 0.3))" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative bg-card rounded-3xl p-8">
              {/* Animated checkmark */}
              <motion.div
                className="w-24 h-24 mx-auto mb-6 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
              >
                {/* Rotating ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: "3px solid transparent", borderTopColor: "hsl(217 91% 50%)", borderRightColor: "hsl(45 100% 51%)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full"
                  style={{ border: "2px solid transparent", borderBottomColor: "hsl(142 71% 45%)", borderLeftColor: "hsl(217 91% 50% / 0.5)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner glow */}
                <motion.div
                  className="absolute inset-4 rounded-full bg-accent flex items-center justify-center"
                  animate={{ boxShadow: ["0 0 20px hsl(217 91% 50% / 0.3)", "0 0 40px hsl(217 91% 50% / 0.5)", "0 0 20px hsl(217 91% 50% / 0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-3xl font-extrabold text-foreground text-center"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                🎉 Thank You!
              </motion.h2>
              <motion.p
                className="text-muted-foreground text-center mt-2 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                आपकी details successfully submit हो गई हैं
              </motion.p>

              {/* Dynamic status timeline */}
              <motion.div
                className="mt-8 space-y-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {statusSteps.map((s, i) => {
                  const isActive = i <= currentStatus;
                  const isCurrent = i === currentStatus;
                  return (
                    <motion.div key={i} className="flex items-start gap-3 relative">
                      {/* Vertical line */}
                      {i < statusSteps.length - 1 && (
                        <div className="absolute left-[15px] top-[32px] w-[2px] h-[calc(100%)] bg-border">
                          <motion.div
                            className="w-full bg-primary rounded-full"
                            initial={{ height: 0 }}
                            animate={{ height: isActive ? "100%" : 0 }}
                            transition={{ delay: i * 1.5 + 1, duration: 0.8 }}
                          />
                        </div>
                      )}
                      {/* Dot */}
                      <motion.div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 ${
                          isActive ? "bg-primary" : "bg-muted"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 1.5 + 0.8, type: "spring", stiffness: 300 }}
                      >
                        {isCurrent && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-primary/30"
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                          />
                        )}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: isActive ? 1 : 0 }}
                          transition={{ delay: i * 1.5 + 1 }}
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      </motion.div>
                      {/* Text */}
                      <motion.div
                        className="pb-6"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: isActive ? 1 : 0.4, x: 0 }}
                        transition={{ delay: i * 1.5 + 0.9, duration: 0.4 }}
                      >
                        <p className={`font-bold text-sm ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.sublabel}</p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Divider */}
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent my-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />

              {/* WhatsApp CTA inside card */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <p className="text-xs text-muted-foreground mb-3">
                  📩 अब WhatsApp पर details भेजें
                </p>
                <motion.button
                  onClick={onWhatsAppSend}
                  className="w-full py-3 rounded-xl bg-[#25D366] text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(37,211,102,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="relative z-10">WhatsApp पर भेजें</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.button
            onClick={onWhatsAppSend}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[#25D366] text-primary-foreground shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center z-50"
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-[#25D366]/30"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <svg className="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ============ PREMIUM ENTRY OFFER POPUP ============
const OfferPopup = ({ onClose, onClaim, spotsLeft, totalSpots }: { onClose: () => void; onClaim: () => void; spotsLeft: number; totalSpots: number }) => {
  const SPOTS_LEFT = spotsLeft;
  const TOTAL_SPOTS = totalSpots;
  const filled = Math.max(0, TOTAL_SPOTS - SPOTS_LEFT);

  useEffect(() => {
    // Lock body scroll
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Subtle confetti burst on open
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.35 },
        colors: ["#FFD700", "#FF4D4D", "#2563eb", "#22c55e", "#a855f7"],
        scalar: 0.9,
      });
    }, 350);
    return () => {
      document.body.style.overflow = original;
      clearTimeout(t);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Cinematic backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Soft gradient glow — single static layer (GPU-friendly) */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FFD700, transparent 70%)" }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-25 pointer-events-none"
        style={{ background: "radial-gradient(circle, #FF3D6E, transparent 70%)", right: -80, bottom: -80 }}
      />

      {/* Floating sparkles — fewer, lighter, no rotate */}
      {[...Array(8)].map((_, i) => {
        const left = (i * 13 + 7) % 100;
        const top = (i * 19 + 11) % 100;
        const delay = (i % 4) * 0.6;
        const size = 6 + (i % 3) * 3;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{ left: `${left}%`, top: `${top}%`, willChange: "opacity, transform" }}
            animate={{ y: [0, -14, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3.2, delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles style={{ width: size, height: size, color: i % 2 === 0 ? "#FFD700" : "#fff" }} />
          </motion.div>
        );
      })}

      {/* Popup card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 220, damping: 24, mass: 0.8 }}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Static gradient glow border (no animated blur — keeps it smooth) */}
        <div
          className="absolute -inset-[2px] rounded-3xl opacity-60 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #FFD700, #FF3D6E, #6366f1, #FFD700)",
            filter: "blur(6px)",
          }}
        />


        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0e27] via-[#1a0b2e] to-[#0a0e27] border border-white/10 shadow-2xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Top metallic shine */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #FFD700, transparent)" }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <div className="relative px-6 pt-8 pb-7">
            {/* Premium crown badge */}
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 12 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ background: "radial-gradient(circle, #FFD700, transparent)" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Crown className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>
              </div>
            </motion.div>

            {/* EXCLUSIVE label with shine */}
            <motion.div
              className="flex justify-center mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="relative overflow-hidden rounded-full px-4 py-1 border border-yellow-400/50 bg-gradient-to-r from-yellow-500/20 via-yellow-400/30 to-yellow-500/20">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative text-[10px] font-black tracking-[0.25em] text-yellow-300 uppercase">
                  ⚡ Exclusive Offer ⚡
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h2
              className="text-center text-2xl sm:text-3xl font-extrabold leading-tight mb-2"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 bg-clip-text text-transparent">
                1 Year FREE Service
              </span>
            </motion.h2>

            {/* Spots counter — huge animated number */}
            <motion.div
              className="text-center mb-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
            >
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Only</p>
              <div className="flex items-center justify-center gap-2">
                <motion.span
                  className="text-7xl font-black bg-gradient-to-b from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(239,68,68,0.6)]"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {SPOTS_LEFT}
                </motion.span>
                <div className="text-left">
                  <p className="text-white font-bold text-sm leading-tight">Spots</p>
                  <p className="text-red-400 font-bold text-sm leading-tight">Left!</p>
                </div>
              </div>
              <motion.p
                className="text-yellow-300/90 text-xs font-semibold mt-1 flex items-center justify-center gap-1"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame className="w-3 h-3" /> सिर्फ {SPOTS_LEFT} business owners बचे हैं <Flame className="w-3 h-3" />
              </motion.p>
            </motion.div>

            {/* Progress bar showing claimed spots */}
            <motion.div
              className="mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex justify-between text-[10px] text-white/60 mb-1 px-1">
                <span>{filled} Claimed</span>
                <span>{SPOTS_LEFT} Remaining</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: "linear-gradient(90deg, #ef4444, #f59e0b, #FFD700)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(filled / TOTAL_SPOTS) * 100}%` }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              className="grid grid-cols-2 gap-2 mb-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {[
                { icon: Zap, text: "Website Build" },
                { icon: Gift, text: "Free Domain" },
                { icon: Sparkles, text: "Google Listing" },
                { icon: Rocket, text: "Brand Logo" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2 backdrop-blur"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + i * 0.08 }}
                >
                  <item.icon className="w-3.5 h-3.5 text-yellow-300 flex-shrink-0" />
                  <span className="text-white text-xs font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.button
              onClick={onClaim}
              className="relative w-full py-4 rounded-2xl font-extrabold text-base text-gray-900 overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #FFD700, #FFA500, #FFD700)", backgroundSize: "200% 200%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                opacity: { delay: 1.4, duration: 0.5 },
                y: { delay: 1.4, duration: 0.5 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(255,215,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <Crown className="w-5 h-5" />
                Claim My FREE Year Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.p
              className="text-center text-white/50 text-[10px] mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              No credit card • Instant activation • Limited to first {TOTAL_SPOTS} owners
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Index = () => {
  const [step, setStep] = useState<"form" | "done">("form");
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [incomeRange, setIncomeRange] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState<number>(5);
  const [totalSpots, setTotalSpots] = useState<number>(10);

  // Show premium entry popup on mount
  useEffect(() => {
    const t = setTimeout(() => setShowOffer(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Live spots remaining — fetch once + subscribe to realtime changes
  useEffect(() => {
    let isMounted = true;

    const loadSpots = async () => {
      try {
        const { data, error } = await supabase
          .from("offer_settings")
          .select("spots_remaining, total_spots")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (!isMounted || error || !data) return;
        setSpotsLeft(data.spots_remaining);
        setTotalSpots(data.total_spots);
      } catch (err) {
        console.warn("offer_settings fetch failed:", err);
      }
    };
    loadSpots();

    const channel = supabase
      .channel("offer_settings_live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "offer_settings" },
        (payload: any) => {
          const row = payload.new ?? payload.old;
          if (!row) return;
          if (typeof row.spots_remaining === "number") setSpotsLeft(row.spots_remaining);
          if (typeof row.total_spots === "number") setTotalSpots(row.total_spots);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);
  const { toast } = useToast();

  // Sync any pending offline submissions on load
  useEffect(() => {
    const syncPending = async () => {
      try {
        const pending = JSON.parse(localStorage.getItem("pending_submissions") || "[]");
        if (pending.length === 0) return;
        const remaining: any[] = [];
        for (const sub of pending) {
          const { submitted_at, ...data } = sub;
          const { error } = await supabase.from("business_submissions").insert(data);
          if (error) {
            remaining.push(sub);
          }
        }
        localStorage.setItem("pending_submissions", JSON.stringify(remaining));
        if (remaining.length < pending.length) {
          console.log(`Synced ${pending.length - remaining.length} pending submissions`);
        }
      } catch (err) {
        console.warn("Pending sync failed, will retry next load:", err);
      }
    };
    syncPending();
  }, []);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const full_name = (formData.get("full_name") as string)?.trim();
    const business_name = (formData.get("business_name") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const city = (formData.get("city") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();

    if (!full_name || !business_name || !phone || !email || !city || !description || !incomeRange) {
      toast({
        title: "सभी fields भरें",
        description: "कृपया सभी required fields भरें।",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "कृपया सही email address डालें।",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const submission = {
      full_name,
      business_name,
      phone,
      email,
      city,
      description,
      income_range: incomeRange,
      services: selectedServices,
    };

    // INSTANT SUBMIT — fire DB save in background, show success immediately.
    // Keeps UX blazing fast even when 100s of leads submit non-stop.
    const saveInBackground = async () => {
      const maxRetries = 3;
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const { error } = await supabase.from("business_submissions").insert(submission);
          if (error) throw error;
          console.log("✅ Submission saved to DB");
          return;
        } catch (err: any) {
          console.warn(`BG attempt ${attempt}/${maxRetries} failed:`, err?.message);
          if (attempt < maxRetries) {
            await new Promise((r) => setTimeout(r, 400 * attempt));
          }
        }
      }
      // Fallback: queue in localStorage; auto-sync effect will retry later
      try {
        const pending = JSON.parse(localStorage.getItem("pending_submissions") || "[]");
        pending.push({ ...submission, submitted_at: new Date().toISOString() });
        localStorage.setItem("pending_submissions", JSON.stringify(pending));
        console.log("📦 Saved to localStorage for later sync");
      } catch (localErr) {
        console.error("LocalStorage fallback failed:", localErr);
      }
    };
    // Fire and forget — DO NOT await. User sees success instantly.
    void saveInBackground();

    // Immediately proceed to success screen — zero network wait
    const adminWhatsApp = "916290561559";
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "None";
    const whatsappMsg = encodeURIComponent(
      `🆕 *New Business Lead!*\n\n` +
      `👤 *Name:* ${full_name}\n` +
      `🏢 *Business:* ${business_name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `📍 *City:* ${city}\n` +
      `📝 *Description:* ${description}\n` +
      `💰 *Income:* ${incomeRange}\n` +
      `🛠 *Services:* ${servicesText}`
    );
    setWhatsappUrl(`https://wa.me/${adminWhatsApp}?text=${whatsappMsg}`);
    setStep("done");
    setTimeout(() => setShowWhatsApp(true), 2500);
    setLoading(false);
  };

  const handleWhatsAppSend = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {showOffer && (
          <OfferPopup
            key="offer"
            spotsLeft={spotsLeft}
            totalSpots={totalSpots}
            onClose={() => setShowOffer(false)}
            onClaim={() => {
              setShowOffer(false);
              setTimeout(() => {
                document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 200);
            }}
          />
        )}
      </AnimatePresence>
    <AnimatePresence mode="wait">
      {step === "done" ? (
        <SuccessScreen key="success" onWhatsAppSend={handleWhatsAppSend} showWhatsApp={showWhatsApp} />
      ) : (
        <motion.div
          key="form"
          className="min-h-screen bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
          <Hero spotsLeft={spotsLeft} />
          <TrustedBy />
          <Services />
          <WhyUs />
          <HowItWorks />
          <Pricing />
          <Testimonials />

          {/* Contact section with existing submission form */}
          <section id="contact" className="section-bg py-24 sm:py-32">
            <div className="mx-auto max-w-6xl px-4">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Get Started
                </p>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-[-0.02em] text-foreground">
                  Tell us about your <span className="gradient-text">business</span>
                </h2>
                <p className="mt-4 text-base text-foreground/60">
                  Fill this in 60 seconds. We'll reach out on WhatsApp within an hour.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Contact info card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2 space-y-4"
                >
                  <div className="card-premium p-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center btn-glow mb-4">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">WhatsApp us</h3>
                    <p className="text-sm text-foreground/60 mt-1">Fastest way to reach us</p>
                    <a
                      href="https://wa.me/916290561559"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                      +91 62905 61559 <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="card-premium p-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(217_91%_60%)] flex items-center justify-center btn-glow mb-4">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Email</h3>
                    <p className="text-sm text-foreground/60 mt-1">We reply within 2 hours</p>
                    <a
                      href="mailto:prasadprem904@gmail.com"
                      className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                    >
                      prasadprem904@gmail.com <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="card-premium p-6 bg-gradient-to-br from-primary to-[hsl(224_76%_48%)] text-white border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">Limited offer</span>
                    </div>
                    <p className="text-2xl font-extrabold leading-tight">
                      Only {spotsLeft} spots left
                    </p>
                    <p className="text-white/80 text-sm mt-1">1 Year FREE maintenance for the next {spotsLeft} businesses.</p>
                  </div>
                </motion.div>

                {/* Form card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-3 card-premium p-6 sm:p-8"
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: "full_name", placeholder: "Full Name", type: "text" },
                        { name: "business_name", placeholder: "Business Name", type: "text" },
                        { name: "phone", placeholder: "WhatsApp / Mobile", type: "tel" },
                        { name: "email", placeholder: "Email Address", type: "email" },
                      ].map((field) => (
                        <Input
                          key={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          type={field.type}
                          required
                          className="h-12 rounded-xl bg-white border-border/70 focus-visible:ring-primary/40"
                          maxLength={field.name === "email" ? 255 : 100}
                        />
                      ))}
                    </div>

                    <Input
                      name="city"
                      placeholder="City / Address"
                      type="text"
                      required
                      className="h-12 rounded-xl bg-white border-border/70 focus-visible:ring-primary/40"
                      maxLength={200}
                    />

                    <Textarea
                      name="description"
                      placeholder="Tell us briefly about your business…"
                      required
                      className="min-h-[110px] resize-none rounded-xl bg-white border-border/70 focus-visible:ring-primary/40"
                      maxLength={1000}
                    />

                    <Select required value={incomeRange} onValueChange={setIncomeRange}>
                      <SelectTrigger className="h-12 rounded-xl bg-white border-border/70">
                        <SelectValue placeholder="Monthly Income Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-10k">₹0 – ₹10k</SelectItem>
                        <SelectItem value="10k-50k">₹10k – ₹50k</SelectItem>
                        <SelectItem value="50k-1L">₹50k – ₹1L</SelectItem>
                        <SelectItem value="1L+">₹1L+</SelectItem>
                      </SelectContent>
                    </Select>

                    <div>
                      <p className="text-sm font-semibold text-foreground mb-3">Services Required</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {services.map((service) => {
                          const active = selectedServices.includes(service);
                          return (
                            <label
                              key={service}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border transition-all ${
                                active
                                  ? "bg-primary/5 border-primary/40"
                                  : "bg-white border-border/70 hover:border-primary/30"
                              }`}
                            >
                              <Checkbox
                                checked={active}
                                onCheckedChange={() => toggleService(service)}
                              />
                              <span className="text-sm text-foreground font-medium">{service}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading || !incomeRange}
                      className="w-full h-13 py-4 text-base font-bold bg-primary text-primary-foreground hover:brightness-110 btn-glow rounded-2xl transition-all"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          Submit Business Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-foreground/40">
                      By submitting, you agree to be contacted on WhatsApp & email.
                    </p>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          <FAQ />
          <CTASection />
          <Footer />
        </motion.div>

      )}
    </AnimatePresence>
    </>
  );
};

export default Index;
