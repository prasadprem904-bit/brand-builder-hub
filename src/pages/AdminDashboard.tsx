import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Mail, Phone, MapPin, Briefcase, MessageCircle } from "lucide-react";

type Submission = Tables<"business_submissions">;

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data, error } = await supabase
        .from("business_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load submissions. Make sure you are logged in.");
      } else {
        setSubmissions(data || []);
      }
      setLoading(false);
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <p className="text-destructive text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-primary-foreground">Admin Dashboard</h1>
        <p className="text-primary-foreground/70 text-sm mt-1">
          <Users className="w-4 h-4 inline mr-1" />
          {submissions.length} lead{submissions.length !== 1 ? "s" : ""} submitted
        </p>
      </div>

      <div className="px-4 py-6 max-w-2xl mx-auto space-y-4">
        {submissions.length === 0 && (
          <p className="text-muted-foreground text-center py-12">No submissions yet.</p>
        )}

        {submissions.map((s) => (
          <Card key={s.id} className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center justify-between">
                <span>{s.full_name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {new Date(s.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-4 h-4" />
                <span className="text-foreground font-medium">{s.business_name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{s.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{s.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{s.city}</span>
              </div>
              <p className="text-muted-foreground">{s.description}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{s.income_range}</Badge>
              </div>
              {s.services.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {s.services.map((svc) => (
                    <Badge key={svc} variant="outline" className="text-xs">
                      {svc}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
