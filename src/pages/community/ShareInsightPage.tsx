import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const ShareInsightPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    readTime: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would save to your database
    toast({
      title: "Insight Shared!",
      description: "Your insight has been published successfully.",
    });
    
    navigate("/community");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/community")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Community
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Share Your Insight</CardTitle>
            <CardDescription>
              Share your knowledge, experiences, and learnings with the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Insight Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., The Future of AI in Education"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground">
                  Make it compelling and descriptive
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai-tools">AI Tools</SelectItem>
                      <SelectItem value="machine-learning">Machine Learning</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime">Estimated Read Time</Label>
                  <Input
                    id="readTime"
                    placeholder="e.g., 5 min"
                    value={formData.readTime}
                    onChange={(e) => handleChange("readTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Share your insights, experiences, and knowledge with the community..."
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  rows={15}
                  maxLength={5000}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.content.length}/5000 characters. Use markdown for formatting.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Cover Image (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-gradient-ai text-white">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Publish Insight
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/community")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareInsightPage;
