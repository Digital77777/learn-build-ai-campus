import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Building, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface JobFormData {
  title: string;
  company: string;
  description: string;
  requirements: string;
  category: string;
  location: string;
  locationType: string;
  salaryMin: string;
  salaryMax: string;
  applicationDeadline: string;
  skills: string[];
  benefits: string;
}

const categories = [
  "AI Engineers",
  "Data Scientists", 
  "ML Researchers",
  "AI Product Managers",
  "Prompt Engineers",
  "AI Consultants",
  "Computer Vision",
  "Natural Language Processing",
  "Machine Learning",
  "Robotics"
];

const locationTypes = [
  "Remote",
  "On-site",
  "Hybrid"
];

const CreateJobPostingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledRole = location.state?.role || "";

  const [formData, setFormData] = useState<JobFormData>({
    title: prefilledRole,
    company: "",
    description: "",
    requirements: "",
    category: prefilledRole || "",
    location: "",
    locationType: "Remote",
    salaryMin: "",
    salaryMax: "",
    applicationDeadline: "",
    skills: [],
    benefits: ""
  });

  const [skillInput, setSkillInput] = useState("");

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.company || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate job posting submission
    console.log("Job posting data:", formData);
    
    toast.success("Job posted successfully! Your job is now live and visible to candidates.");
    
    // Navigate back to jobs page
    setTimeout(() => {
      navigate("/marketplace/post-jobs");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 group"
            onClick={() => navigate("/marketplace/post-jobs")}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Jobs
          </Button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Post a New Job</h1>
              <p className="text-muted-foreground">
                Find the perfect AI talent for your team. Create a detailed job posting to attract qualified candidates.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Job Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="e.g., Senior AI Engineer"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                      className="min-h-32"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements & Qualifications</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="List required skills, experience, education, and qualifications..."
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Work Type</Label>
                      <Select 
                        value={formData.locationType} 
                        onValueChange={(value) => handleInputChange("locationType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {locationTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="e.g., San Francisco, CA or Worldwide"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.applicationDeadline}
                        onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Salary Range (Annual)</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          id="salaryMin"
                          value={formData.salaryMin}
                          onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                          placeholder="Min (e.g., 80000)"
                          type="number"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          value={formData.salaryMax}
                          onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                          placeholder="Max (e.g., 150000)"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Required Skills</Label>
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Type a skill and press Enter"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} ×
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="benefits">Benefits & Perks</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => handleInputChange("benefits", e.target.value)}
                      placeholder="Health insurance, remote work, flexible hours, stock options..."
                      className="min-h-20"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button type="submit" size="lg" className="flex-1">
                      <Users className="h-4 w-4 mr-2" />
                      Post Job - $299
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => navigate("/marketplace/post-jobs")}>
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPostingPage;