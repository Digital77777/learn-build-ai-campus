import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCommunity } from "@/hooks/useCommunity";
import { useAuth } from "@/hooks/useAuth";
import { MediaUploader } from "@/components/media/MediaUploader";

const ShareInsightPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createInsight } = useCommunity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    readTime: ""
  });
  const [coverImages, setCoverImages] = useState<string[]>([]);
  const [coverVideos, setCoverVideos] = useState<string[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate("/auth");
      return;
    }
    
    if (!formData.title || !formData.content || !formData.category) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createInsight.mutateAsync({
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        read_time: formData.readTime || undefined,
        cover_image: coverImages[0] || undefined,
      });
      navigate("/community");
    } finally {
      setIsSubmitting(false);
    }
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

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Share Your Insight</CardTitle>
            <CardDescription className="text-sm sm:text-base">
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
                <MediaUploader
                  images={coverImages}
                  videos={coverVideos}
                  onImagesChange={setCoverImages}
                  onVideosChange={setCoverVideos}
                  maxImages={1}
                  maxVideos={0}
                  maxFileSize={5}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button type="submit" className="w-full sm:w-auto bg-gradient-ai text-white" disabled={isSubmitting}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Publishing..." : "Publish Insight"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/community")}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
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
