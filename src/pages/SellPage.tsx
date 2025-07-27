import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import CreateListingForm from "@/components/sell/CreateListingForm";
import UserListings from "@/components/sell/UserListings";

const SellPage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const fetchListings = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user_listings")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching listings:", error);
    } else {
      setListings(data);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Create and Manage Your Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <CreateListingForm onListingCreated={fetchListings} />
          <UserListings listings={listings} />
        </div>
      </div>
    </div>
  );
};

export default SellPage;
