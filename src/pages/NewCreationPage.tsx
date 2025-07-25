import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NewCreationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file) {
      alert("You must be logged in and select a file to upload.");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("creations")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }

    const { data, error } = await supabase
      .from("user_creations")
      .insert([
        {
          title,
          description,
          price: parseFloat(price),
          user_id: user.id,
          file_path: filePath,
        },
      ]);

    if (error) {
      console.error("Error creating creation:", error);
    } else {
      navigate("/my-creations");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Add a New Creation</h1>
        <Card>
          <CardHeader>
            <CardTitle>Creation Details</CardTitle>
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
                  placeholder="e.g., My Awesome AI Creation"
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
                  placeholder="Describe your creation"
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
                  placeholder="e.g., 19.99"
                  required
                />
              </div>
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-muted-foreground">
                  File
                </label>
                <Input id="file" type="file" onChange={handleFileChange} required />
              </div>
              <Button type="submit">Add Creation</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewCreationPage;
