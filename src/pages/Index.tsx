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
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#2563eb", "#eab308", "#22c55e", "#f43f5e", "#a855f7"],
    });

    frame();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-background px-4 overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div className="text-center max-w-md mx-auto">
        <motion.div
          className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          >
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-extrabold text-foreground">Thank you!</h2>
            <PartyPopper className="w-6 h-6 text-secondary" />
          </div>
        </motion.div>

        <motion.p
          className="text-muted-foreground text-base leading-relaxed mt-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          आपकी details successfully submit हो गई हैं! 🚀
        </motion.p>

        <motion.div
          className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          <span>अब WhatsApp पर message भेजें</span>
          <Sparkles className="w-4 h-4 text-secondary" />
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <AnimatePresence>
        {showWhatsApp && (
          <motion.button
            onClick={onWhatsAppSend}
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center z-50 hover:brightness-110"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-8 h-8" fill="white" />
          </motion.button>
        )}
      </AnimatePresence>

      {showWhatsApp && (
        <motion.div
          className="fixed bottom-28 right-6 bg-card border border-border rounded-xl px-4 py-3 shadow-xl max-w-[220px] z-50"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <p className="text-sm font-semibold text-foreground">📩 WhatsApp पर भेजें!</p>
          <p className="text-xs text-muted-foreground mt-1">Details हमारे WhatsApp पर send करें</p>
          <div className="absolute bottom-[-6px] right-10 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
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

    try {
      const { error } = await supabase.from("business_submissions").insert(submission);
      if (error) throw error;

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
    } catch (err: any) {
      console.error("Submission failed:", err);
      toast({
        title: "Submission failed",
        description: err?.message || "कृपया दोबारा कोशिश करें।",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleWhatsAppSend = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "done" ? (
        <SuccessScreen key="success" />
      ) : step === "whatsapp" ? (
        <motion.div
          key="whatsapp"
          className="min-h-screen flex items-center justify-center bg-background px-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="text-center max-w-md mx-auto">
            <motion.div
              className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <MessageCircle className="w-10 h-10 text-green-600" />
            </motion.div>

            <motion.h2
              className="text-2xl font-extrabold text-foreground mb-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Almost Done! 🎯
            </motion.h2>

            <motion.p
              className="text-muted-foreground text-base leading-relaxed mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              आपकी details save हो गई हैं! अब WhatsApp पर message भेजना <strong>ज़रूरी</strong> है ताकि हम आपसे जल्दी contact कर सकें।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={handleWhatsAppSend}
                  className="w-full h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white gap-2"
                >
                  <Send className="w-5 h-5" />
                  WhatsApp पर Message भेजें
                </Button>
              </motion.div>
            </motion.div>

            <motion.p
              className="text-xs text-muted-foreground mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              WhatsApp खुलेगा → Send बटन दबाएं → Done! ✅
            </motion.p>
          </motion.div>
        </motion.div>
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
