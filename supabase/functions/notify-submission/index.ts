import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { full_name, business_name, phone, email, city, description, income_range, services } = body;

    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "";
    const ADMIN_WHATSAPP = Deno.env.get("ADMIN_WHATSAPP") || "";

    // Build notification content
    const servicesText = services?.length ? services.join(", ") : "None selected";

    // Send admin email notification using Supabase's built-in email (Resend)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Log the submission for admin notification
    console.log("=== NEW BUSINESS LEAD ===");
    console.log(`Name: ${full_name}`);
    console.log(`Business: ${business_name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`City: ${city}`);
    console.log(`Description: ${description}`);
    console.log(`Income: ${income_range}`);
    console.log(`Services: ${servicesText}`);
    console.log("========================");

    // Build WhatsApp notification URL
    let whatsappUrl = "";
    if (ADMIN_WHATSAPP) {
      const whatsappMessage = encodeURIComponent(
        `🆕 New Business Lead!\n\n` +
        `👤 ${full_name}\n` +
        `🏢 ${business_name}\n` +
        `📱 ${phone}\n` +
        `📧 ${email}\n` +
        `📍 ${city}\n` +
        `💰 ${income_range}\n` +
        `🛠 Services: ${servicesText}`
      );
      whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${whatsappMessage}`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Notification processed",
        whatsapp_url: whatsappUrl,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    console.error("Notification error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
