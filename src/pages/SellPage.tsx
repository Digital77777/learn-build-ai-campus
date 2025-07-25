import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";

const SellPage = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a listing.");
      return;
    }
    const { data, error } = await supabase
      .from("user_listings")
      .insert([{ title, description, price: parseFloat(price), category, user_id: user.id }]);
    if (error) {
      console.error("Error creating listing:", error);
    } else {
      fetchListings();
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Create and Manage Your Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Create a New Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g., GPT-4 Prompt Engineering Course"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-muted-foreground">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your product or service"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-muted-foreground">
                      Price
                    </label>
                    <Input
                      id="price"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g., 49.99"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-muted-foreground">
                      Category
                    </label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., Courses"
                      required
                    />
                  </div>
                  <Button type="submit">Create Listing</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Listings</h2>
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{listing.title}</h3>
                    <p className="text-muted-foreground">{listing.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-primary">${listing.price}</span>
                      <Badge variant="secondary">{listing.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
