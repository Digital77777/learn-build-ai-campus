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
    <div className="space-y-4 sm:space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-start">
            <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-xl sm:text-2xl md:text-3xl">
                {getInitials(profile?.full_name, profile?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3 sm:space-y-4 w-full">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 break-words">
                    {profile?.full_name || "Anonymous User"}
                  </h2>
                  {profile?.headline && (
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                      <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span className="break-words">{profile.headline}</span>
                    </p>
                  )}
                </div>
                <Button onClick={onEdit} variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm shrink-0">
                  <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Edit Profile
                </Button>
              </div>

              {profile?.location && (
                <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="break-words">{profile.location}</span>
                </p>
              )}

              {profile?.bio && (
                <div className="pt-1 sm:pt-2">
                  <p className="text-sm sm:text-base text-foreground whitespace-pre-wrap break-words">{profile.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Expertise */}
      {profile?.skills && profile.skills.length > 0 && (
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg md:text-xl">Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {profile.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1">
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
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-1.5 sm:gap-2">
              <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              Links & Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
            {profile?.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
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
