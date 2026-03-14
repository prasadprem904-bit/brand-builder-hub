import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "prasadprem904@gmail.com";
    const ADMIN_WHATSAPP = Deno.env.get("ADMIN_WHATSAPP") || "916290561559";

    const servicesText = services?.length ? services.join(", ") : "None selected";

    // Log for debugging
    console.log("=== NEW BUSINESS LEAD ===");
    console.log(`Name: ${full_name}`);
    console.log(`Business: ${business_name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`City: ${city}`);
    console.log(`Income: ${income_range}`);
    console.log(`Services: ${servicesText}`);
    console.log(`Admin Email: ${ADMIN_EMAIL}`);
    console.log("========================");

    // Build WhatsApp notification URL for admin
    const cleanWhatsApp = ADMIN_WHATSAPP.replace(/[^0-9]/g, "");
    const whatsappMessage = encodeURIComponent(
      `🆕 *New Business Lead!*\n\n` +
      `👤 *Name:* ${full_name}\n` +
      `🏢 *Business:* ${business_name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `📍 *City:* ${city}\n` +
      `📝 *Description:* ${description}\n` +
      `💰 *Income:* ${income_range}\n` +
      `🛠 *Services:* ${servicesText}`
    );
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${whatsappMessage}`;

    return new Response(
      JSON.stringify({
        success: true,
        whatsapp_url: whatsappUrl,
        admin_email: ADMIN_EMAIL,
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
