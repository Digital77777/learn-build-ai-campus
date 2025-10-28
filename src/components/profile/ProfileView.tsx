import { User, Briefcase, MapPin, Link as LinkIcon, Linkedin, Github, Twitter, Mail, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface ProfileViewProps {
  profile: any;
  onEdit: () => void;
}

export const ProfileView = ({ profile, onEdit }: ProfileViewProps) => {
  const getInitials = (name: string | undefined, email: string | undefined) => {
    if (name) {
      return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    if (email) {
      return email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="w-32 h-32">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-3xl">
                {getInitials(profile?.full_name, profile?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-1">
                    {profile?.full_name || "Anonymous User"}
                  </h2>
                  {profile?.headline && (
                    <p className="text-lg text-muted-foreground flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {profile.headline}
                    </p>
                  )}
                </div>
                <Button onClick={onEdit} variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {profile?.location && (
                <p className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </p>
              )}

              {profile?.bio && (
                <div className="pt-2">
                  <p className="text-foreground whitespace-pre-wrap">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Expertise */}
      {profile?.skills && profile.skills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Links & Contact */}
      {(profile?.website || profile?.linkedin_url || profile?.github_url || profile?.twitter_url || profile?.email) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Links & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{profile.email}</span>
              </a>
            )}

            {profile?.website && (
              <>
                <Separator />
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <LinkIcon className="w-5 h-5" />
                  <span>{profile.website}</span>
                </a>
              </>
            )}

            {profile?.linkedin_url && (
              <>
                <Separator />
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                </a>
              </>
            )}

            {profile?.github_url && (
              <>
                <Separator />
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub Profile</span>
                </a>
              </>
            )}

            {profile?.twitter_url && (
              <>
                <Separator />
                <a
                  href={profile.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter / X Profile</span>
                </a>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
