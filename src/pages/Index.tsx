import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Rocket, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const services = [
  "Website Creation",
  "Free Domain Name",
  "Google Business Listing",
  "Business Advertisement",
  "Brand Logo Design",
];

const Index = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [incomeRange, setIncomeRange] = useState("");
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

    const submission = {
      full_name: (formData.get("full_name") as string).trim(),
      business_name: (formData.get("business_name") as string).trim(),
      phone: (formData.get("phone") as string).trim(),
      email: (formData.get("email") as string).trim(),
      city: (formData.get("city") as string).trim(),
      description: (formData.get("description") as string).trim(),
      income_range: incomeRange,
      services: selectedServices,
    };

    try {
      const { error } = await supabase.from("business_submissions").insert(submission);
      if (error) throw error;

      // Trigger notification edge function (fire and forget)
      supabase.functions.invoke("notify-submission", { body: submission }).catch(console.error);

      setSubmitted(true);
    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Thank you!</h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            Your business details have been submitted. We will contact you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-primary px-4 pt-12 pb-14 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Rocket className="w-7 h-7 text-secondary" />
          <span className="text-sm font-semibold tracking-widest uppercase text-primary-foreground/70">
            Business Growth
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground leading-tight mb-3">
          Grow Your Business Online
        </h1>
        <p className="text-primary-foreground/80 text-base max-w-sm mx-auto">
          Submit your business details and we will help you build your brand.
        </p>
      </div>

      {/* Form Card */}
      <div className="px-4 -mt-6 pb-12 max-w-lg mx-auto">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-5 text-center">
            Submit Your Business Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="full_name" placeholder="Full Name" required className="h-12" maxLength={100} />
            <Input name="business_name" placeholder="Business Name" required className="h-12" maxLength={100} />
            <Input name="phone" placeholder="WhatsApp / Mobile Number" type="tel" required className="h-12" maxLength={20} />
            <Input name="email" placeholder="Email Address" type="email" required className="h-12" maxLength={255} />
            <Input name="city" placeholder="City / Address" required className="h-12" maxLength={200} />
            <Textarea name="description" placeholder="Short Business Description" required className="min-h-[90px] resize-none" maxLength={1000} />

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

            {/* Services */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Services Required</p>
              <div className="space-y-3">
                {services.map((service) => (
                  <label key={service} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={selectedServices.includes(service)}
                      onCheckedChange={() => toggleService(service)}
                    />
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {service}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || !incomeRange}
              className="w-full h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:brightness-110 transition-all mt-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              {loading ? "Submitting..." : "Submit Business Details"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
