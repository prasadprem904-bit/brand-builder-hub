import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Rocket, Loader2, Sparkles, PartyPopper, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

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
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <Particle key={i} index={i} />
      ))}

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 50%), transparent)" }}
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(45 100% 51%), transparent)", right: -100, top: -100 }}
        animate={{ x: [50, -50, 50], y: [30, -30, 30], scale: [1.2, 1, 1.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
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

const Index = () => {
  const [step, setStep] = useState<"form" | "done">("form");
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [incomeRange, setIncomeRange] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [showWhatsApp, setShowWhatsApp] = useState(false);
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

    // Retry logic: try up to 3 times with delay
    const maxRetries = 3;
    let dbSuccess = false;
    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const { error } = await supabase.from("business_submissions").insert(submission);
        if (error) throw error;
        dbSuccess = true;
        break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Submission attempt ${attempt}/${maxRetries} failed:`, err?.message);
        if (attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 1000 * attempt));
        }
      }
    }

    // Fallback: save to localStorage if all DB attempts fail
    if (!dbSuccess) {
      try {
        const pending = JSON.parse(localStorage.getItem("pending_submissions") || "[]");
        pending.push({ ...submission, submitted_at: new Date().toISOString() });
        localStorage.setItem("pending_submissions", JSON.stringify(pending));
        console.log("Submission saved to localStorage as fallback");
      } catch (localErr) {
        console.error("LocalStorage fallback also failed:", localErr);
      }
      // Still show success to user — data is saved locally
      toast({
        title: "Submitted!",
        description: "आपकी details save हो गई हैं। Internet आने पर sync हो जाएगी।",
      });
    }

    // Always proceed to success screen
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
    <AnimatePresence mode="wait">
      {step === "done" ? (
        <SuccessScreen key="success" onWhatsAppSend={handleWhatsAppSend} showWhatsApp={showWhatsApp} />
      ) : (
        <motion.div
          key="form"
          className="min-h-screen bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero Section */}
          <motion.div
            className="bg-primary px-4 pt-12 pb-14 text-center relative overflow-hidden"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary-foreground/10"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Rocket className="w-7 h-7 text-secondary" />
              </motion.div>
              <span className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/70">
                Business Growth
              </span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold text-primary-foreground leading-tight mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Grow Your Business Online
            </motion.h1>

            <motion.p
              className="text-primary-foreground/80 text-base max-w-sm mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Submit your business details and we will help you build your brand.
            </motion.p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="px-4 -mt-6 pb-12 max-w-lg mx-auto"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="bg-card rounded-2xl shadow-lg border border-border p-6"
              whileHover={{ boxShadow: "0 20px 40px -15px hsl(217 91% 50% / 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-lg font-bold text-foreground mb-5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Submit Your Business Details
              </motion.h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "full_name", placeholder: "Full Name", type: "text", delay: 0.1 },
                  { name: "business_name", placeholder: "Business Name", type: "text", delay: 0.15 },
                  { name: "phone", placeholder: "WhatsApp / Mobile Number", type: "tel", delay: 0.2 },
                  { name: "email", placeholder: "Email Address", type: "email", delay: 0.25 },
                  { name: "city", placeholder: "City / Address", type: "text", delay: 0.3 },
                ].map((field) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + field.delay, duration: 0.4 }}
                  >
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      type={field.type}
                      required
                      className="h-12 transition-all duration-200 focus:scale-[1.01]"
                      maxLength={field.name === "email" ? 255 : field.name === "city" ? 200 : 100}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.05, duration: 0.4 }}
                >
                  <Textarea
                    name="description"
                    placeholder="Short Business Description"
                    required
                    className="min-h-[90px] resize-none transition-all duration-200 focus:scale-[1.01]"
                    maxLength={1000}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.4 }}
                >
                  <Select required value={incomeRange} onValueChange={setIncomeRange}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Monthly Income Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-10k">₹0 – ₹10k</SelectItem>
                      <SelectItem value="10k-50k">₹10k – ₹50k</SelectItem>
                      <SelectItem value="50k-1L">₹50k – ₹1L</SelectItem>
                      <SelectItem value="1L+">₹1L+</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.15, duration: 0.4 }}
                >
                  <p className="text-sm font-semibold text-foreground mb-3">Services Required</p>
                  <div className="space-y-3">
                    {services.map((service, i) => (
                      <motion.label
                        key={service}
                        className="flex items-center gap-3 cursor-pointer group"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + i * 0.05, duration: 0.3 }}
                        whileHover={{ x: 4 }}
                      >
                        <Checkbox
                          checked={selectedServices.includes(service)}
                          onCheckedChange={() => toggleService(service)}
                        />
                        <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                          {service}
                        </span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.4 }}
                >
                  <Button
                    type="submit"
                    disabled={loading || !incomeRange}
                    className="w-full h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:brightness-110 transition-all mt-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {loading ? "Submitting..." : "Submit Business Details"}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
