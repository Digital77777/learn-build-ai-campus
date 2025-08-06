import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MessageSquare, Clock, CheckCircle, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProjectInquiryData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  preferredContact: string;
}

const projectTypes = [
  "Custom AI Models",
  "AI Integration", 
  "MLOps & Infrastructure",
  "Computer Vision Solutions",
  "NLP & Chatbots",
  "AI Consulting",
  "Data Science & Analytics",
  "Other"
];

const budgetRanges = [
  "Under $10,000",
  "$10,000 - $25,000",
  "$25,000 - $50,000", 
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000+"
];

const timelines = [
  "ASAP (Rush project)",
  "1-2 months",
  "3-4 months",
  "5-6 months",
  "6+ months",
  "Flexible"
];

const contactMethods = [
  "Email",
  "Phone", 
  "Video call",
  "In-person meeting"
];

const StartProjectPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ProjectInquiryData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    preferredContact: "Email"
  });

  const handleInputChange = (field: keyof ProjectInquiryData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Simulate sending inquiry
    console.log("Project inquiry data:", formData);
    
    toast.success("Your project inquiry has been sent! Our team will contact you within 24 hours.");
    
    // Navigate back
    setTimeout(() => {
      navigate("/marketplace/ai-development");
    }, 2000);
  };

  const steps = [
    {
      number: "1",
      title: "Tell us about your project",
      description: "Share your vision and requirements"
    },
    {
      number: "2", 
      title: "Get matched with experts",
      description: "We'll connect you with the right AI specialists"
    },
    {
      number: "3",
      title: "Receive custom proposal",
      description: "Get a detailed project plan and timeline"
    },
    {
      number: "4",
      title: "Start development",
      description: "Begin building your AI solution"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto px-6 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 group"
            onClick={() => navigate("/marketplace/ai-development")}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to AI Development
          </Button>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Start Your AI Project</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform your business with custom AI solutions. Our expert team will guide you from concept to deployment.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Project Inquiry Form
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            placeholder="Your company"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Project Type</Label>
                          <Select 
                            value={formData.projectType} 
                            onValueChange={(value) => handleInputChange("projectType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              {projectTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Budget Range</Label>
                          <Select 
                            value={formData.budget} 
                            onValueChange={(value) => handleInputChange("budget", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Timeline</Label>
                          <Select 
                            value={formData.timeline} 
                            onValueChange={(value) => handleInputChange("timeline", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              {timelines.map((timeline) => (
                                <SelectItem key={timeline} value={timeline}>
                                  {timeline}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Preferred Contact Method</Label>
                          <Select 
                            value={formData.preferredContact} 
                            onValueChange={(value) => handleInputChange("preferredContact", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {contactMethods.map((method) => (
                                <SelectItem key={method} value={method}>
                                  {method}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Project Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          placeholder="Describe your project goals, current challenges, expected outcomes, and any specific requirements..."
                          className="min-h-32"
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        <Code className="h-4 w-4 mr-2" />
                        Send Project Inquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Direct Contact */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Prefer to Contact Us Directly?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a 
                          href="mailto:digitalintelligencemarketplace@gmail.com"
                          className="text-primary hover:underline"
                        >
                          digitalintelligencemarketplace@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a 
                          href="tel:+27695513572"
                          className="text-primary hover:underline"
                        >
                          +27 69 551 3572
                        </a>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mt-4">
                      Our team typically responds within 24 hours during business days.
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Process Steps */}
              <div>
                <h2 className="text-2xl font-bold mb-6">How It Works</h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                            {step.number}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Benefits */}
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-success" />
                      Why Choose Our AI Development Team?
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Expert team with 10+ years of AI experience</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>End-to-end solutions from concept to deployment</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Enterprise-grade security and compliance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Ongoing support and maintenance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>Proven track record with 50+ successful projects</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartProjectPage;