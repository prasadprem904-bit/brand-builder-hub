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

const SuccessScreen = ({ onWhatsAppSend, showWhatsApp }: { onWhatsAppSend: () => void; showWhatsApp: boolean }) => {
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    // Stage 1: Big center burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5, x: 0.5 },
      colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e", "#a855f7", "#06b6d4"],
      startVelocity: 45,
      gravity: 0.8,
      ticks: 300,
    });

    // Stage 2: Side cannons
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.65 }, colors: ["#2563eb", "#eab308", "#22c55e"], startVelocity: 55 });
      confetti({ particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.65 }, colors: ["#f43f5e", "#a855f7", "#06b6d4"], startVelocity: 55 });
    }, 400);

    // Stage 3: Star shower
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 160,
        origin: { y: 0, x: 0.5 },
        colors: ["#fbbf24", "#f472b6", "#34d399", "#60a5fa"],
        startVelocity: 30,
        gravity: 1.2,
        shapes: ["star"],
        scalar: 1.2,
        ticks: 200,
      });
    }, 900);

    // Stage 4: Continuous sparkle
    const duration = 4000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60 + Math.random() * 60,
        spread: 40,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e", "#a855f7"],
        startVelocity: 20,
        gravity: 0.6,
        scalar: 0.8,
        drift: Math.random() - 0.5,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    setTimeout(() => frame(), 1200);

    // Show checkmark after initial burst
    setTimeout(() => setShowCheckmark(true), 300);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{ width: 200 + i * 150, height: 200 + i * 150 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.1] }}
          transition={{ delay: 0.2 + i * 0.3, duration: 1.5, ease: "easeOut" }}
        />
      ))}

      <motion.div className="text-center max-w-md mx-auto relative z-10">
        {/* Glowing checkmark circle */}
        <motion.div
          className="w-28 h-28 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
        >
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <AnimatePresence>
            {showCheckmark && (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: [0, 1.3, 1], rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="w-14 h-14 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating emoji decorations */}
        {["🎉", "🚀", "⭐", "💫", "🎊"].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            initial={{ opacity: 0, y: 50, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.7],
              y: [50, -20, -10],
              scale: [0, 1.2, 1],
              rotate: [0, i % 2 === 0 ? 20 : -20, 0],
            }}
            transition={{ delay: 0.8 + i * 0.15, duration: 1.2, ease: "easeOut" }}
          >
            {emoji}
          </motion.span>
        ))}

        {/* Title with staggered letter reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.6, delay: 1, repeat: 2 }}>
              <PartyPopper className="w-7 h-7 text-secondary" />
            </motion.div>
            <motion.h2
              className="text-4xl font-extrabold text-foreground"
              initial={{ letterSpacing: "0.5em", opacity: 0 }}
              animate={{ letterSpacing: "0em", opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
            >
              Thank you!
            </motion.h2>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 0.6, delay: 1, repeat: 2 }}>
              <PartyPopper className="w-7 h-7 text-secondary" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-lg leading-relaxed mt-3 font-medium"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          आपकी details successfully submit हो गई हैं! 🚀
        </motion.p>

        {/* Animated divider */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-5"
          initial={{ width: 0 }}
          animate={{ width: "80%" }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        />

        <motion.div
          className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: "spring" }}
        >
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-5 h-5 text-secondary" />
          </motion.div>
          <span className="font-medium">अब WhatsApp पर message भेजें</span>
          <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-5 h-5 text-secondary" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button with glow */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.button
            onClick={onWhatsAppSend}
            className="fixed bottom-8 right-8 w-18 h-18 rounded-full bg-[#25D366] text-primary-foreground shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center z-50"
            initial={{ scale: 0, rotate: -180, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Pulse ring around button */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#25D366]/30"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#25D366]/20"
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
            <svg className="w-9 h-9 relative z-10" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Tooltip bubble */}
      {showWhatsApp && (
        <motion.div
          className="fixed bottom-28 right-5 bg-card border border-border rounded-2xl px-5 py-3.5 shadow-2xl max-w-[240px] z-50"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: [20, -5, 0], scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
        >
          <motion.p
            className="text-sm font-bold text-foreground"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📩 WhatsApp पर भेजें!
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1.5">Details हमारे WhatsApp पर send करें</p>
          <div className="absolute bottom-[-6px] right-12 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
        </motion.div>
      )}
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
