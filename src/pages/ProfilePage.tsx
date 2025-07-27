import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfilePage = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<any[]>([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("purchases")
          .select("*, featured_listings(*)")
          .eq("user_id", user.id);
        if (error) console.error("Error fetching purchases:", error);
        else setPurchases(data);
      }
    };

    fetchPurchases();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
          </CardHeader>
          <CardContent>
            {purchases.length > 0 ? (
              <ul>
                {purchases.map((purchase) => (
                  <li key={purchase.id} className="mb-4">
                    <h3 className="text-xl font-semibold">
                      {purchase.featured_listings.title}
                    </h3>
                    <p className="text-muted-foreground">
                      Purchased on: {new Date(purchase.created_at).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't made any purchases yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
