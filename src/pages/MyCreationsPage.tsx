import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const MyCreationsPage = () => {
  const { user } = useAuth();
  const [creations, setCreations] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  const fetchCreations = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("user_creations")
      .select("*")
      .eq("user_id", user.id);
    if (error) {
      console.error("Error fetching creations:", error);
    } else {
      setCreations(data);
    }
  };

  const deleteCreation = async (id: number) => {
    const { error } = await supabase.from("user_creations").delete().eq("id", id);
    if (error) {
      console.error("Error deleting creation:", error);
    } else {
      fetchCreations();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Creations</h1>
          <Link to="/sell/new">
            <Button>Add New Creation</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.map((creation) => (
            <Card key={creation.id}>
              <CardHeader>
                <CardTitle>{creation.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{creation.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-primary">${creation.price}</span>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteCreation(creation.id)}>Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCreationsPage;
