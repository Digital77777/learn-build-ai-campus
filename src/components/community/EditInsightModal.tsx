import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { CommunityInsight } from "@/types/community";

interface EditInsightModalProps {
  insight: CommunityInsight;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { title: string; content: string; category: string; read_time?: string }) => void;
  isLoading?: boolean;
}

export const EditInsightModal = ({ insight, open, onOpenChange, onSave, isLoading }: EditInsightModalProps) => {
  const [title, setTitle] = useState(insight.title);
  const [content, setContent] = useState(insight.content);
  const [category, setCategory] = useState(insight.category);
  const [readTime, setReadTime] = useState(insight.read_time || "");

  useEffect(() => {
    setTitle(insight.title);
    setContent(insight.content);
    setCategory(insight.category);
    setReadTime(insight.read_time || "");
  }, [insight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      category,
      read_time: readTime || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Insight</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter insight title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tutorial">Tutorial</SelectItem>
                <SelectItem value="News">News</SelectItem>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Best Practice">Best Practice</SelectItem>
                <SelectItem value="Case Study">Case Study</SelectItem>
                <SelectItem value="Opinion">Opinion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="readTime">Read Time (optional)</Label>
            <Input
              id="readTime"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
              placeholder="e.g., 5 min read"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your insight here..."
              className="min-h-[300px]"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
