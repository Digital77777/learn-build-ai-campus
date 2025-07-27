import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const CreateListingForm = ({ onListingCreated }: { onListingCreated: () => void }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a listing.");
      return;
    }
    const { error } = await supabase
      .from("user_listings")
      .insert([{ title, description, price: parseFloat(price), category, user_id: user.id }]);
    if (error) {
      console.error("Error creating listing:", error);
    } else {
      onListingCreated();
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("");
    }
  };

  return (
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
  );
};

export default CreateListingForm;
