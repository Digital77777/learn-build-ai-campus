import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    const fetchListing = async () => {
      const { data, error } = await supabase
        .from("featured_listings")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Error fetching listing:", error);
      else setListing(data);
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>{listing.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{listing.seller}</p>
            <p className="text-lg font-semibold">{listing.price}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{listing.type}</Badge>
              <Badge variant="secondary">{listing.category}</Badge>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p>{listing.description || "No description available."}</p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8">
          <Link to="/checkout" state={{ listing }}>
            <Button size="lg">Purchase</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
