import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Briefcase, MapPin, Link as LinkIcon, Linkedin, Github, Twitter, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const profileSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  headline: z.string().max(120, "Headline must be less than 120 characters").optional(),
  bio: z.string().max(2000, "Bio must be less than 2000 characters").optional(),
  location: z.string().max(100).optional(),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin_url: z.string().url("Must be a valid LinkedIn URL").optional().or(z.literal("")),
  github_url: z.string().url("Must be a valid GitHub URL").optional().or(z.literal("")),
  twitter_url: z.string().url("Must be a valid Twitter URL").optional().or(z.literal("")),
  avatar_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileEditFormProps {
  profile: any;
  onSuccess?: () => void;
}

export const ProfileEditForm = ({ profile, onSuccess }: ProfileEditFormProps) => {
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || "",
      headline: profile?.headline || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      website: profile?.website || "",
      linkedin_url: profile?.linkedin_url || "",
      github_url: profile?.github_url || "",
      twitter_url: profile?.twitter_url || "",
      avatar_url: profile?.avatar_url || "",
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && skills.length < 50) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          skills,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", profile.user_id);

      if (error) throw error;

      toast.success("Profile updated successfully!");
      onSuccess?.();
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            This information will be visible to other members of the community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={form.watch("avatar_url")} />
              <AvatarFallback className="text-xl">
                {form.watch("full_name") ? getInitials(form.watch("full_name")) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Label htmlFor="avatar_url">Profile Picture URL</Label>
              <Input
                id="avatar_url"
                placeholder="https://example.com/avatar.jpg"
                {...form.register("avatar_url")}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter a URL to your profile picture
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Professional Headline
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer | AI Enthusiast | Building the future"
                        {...field}
                        maxLength={120}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief professional tagline (max 120 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About / Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself, your experience, interests, and what you're passionate about..."
                        className="min-h-[120px]"
                        {...field}
                        maxLength={2000}
                      />
                    </FormControl>
                    <FormDescription>
                      Share your story and what makes you unique (max 2000 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills Section */}
              <div className="space-y-3">
                <Label>Skills & Expertise</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill (e.g., React, Python, Design)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" variant="secondary" onClick={addSkill}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Add up to 50 skills. Press Enter or click + to add.
                </p>
              </div>

              {/* Links Section */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Links & Social Media
                </h3>

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website / Portfolio</FormLabel>
                      <FormControl>
                        <Input placeholder="https://yourwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Linkedin className="w-4 h-4" />
                        LinkedIn Profile
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub Profile
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Twitter className="w-4 h-4" />
                        Twitter / X Profile
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
