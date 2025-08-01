import Navigation from "@/components/Navigation";
import { Users, Briefcase, Target, Shield, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PostJobsPage = () => {
  const jobTypes = [
    {
      title: "AI Engineers",
      description: "Full-stack AI development and implementation specialists",
      avgSalary: "$120k-180k",
      timeToHire: "2-4 weeks",
      skills: ["Python", "TensorFlow", "PyTorch", "MLOps"]
    },
    {
      title: "Data Scientists",
      description: "Analytics experts for AI model development and insights",
      avgSalary: "$100k-160k",
      timeToHire: "3-5 weeks",
      skills: ["R", "Python", "Statistics", "Machine Learning"]
    },
    {
      title: "ML Researchers",
      description: "Advanced research and algorithm development specialists",
      avgSalary: "$140k-220k",
      timeToHire: "4-6 weeks",
      skills: ["Research", "Publications", "Deep Learning", "Mathematics"]
    },
    {
      title: "AI Product Managers",
      description: "Strategic leadership for AI product development",
      avgSalary: "$130k-200k",
      timeToHire: "3-5 weeks",
      skills: ["Strategy", "Roadmapping", "Technical Understanding", "Leadership"]
    },
    {
      title: "Prompt Engineers",
      description: "Specialists in AI prompt optimization and LLM integration",
      avgSalary: "$80k-140k",
      timeToHire: "1-3 weeks",
      skills: ["LLM", "Prompt Design", "API Integration", "Testing"]
    },
    {
      title: "AI Consultants",
      description: "Strategic advisors for AI transformation and implementation",
      avgSalary: "$100k-180k",
      timeToHire: "2-4 weeks",
      skills: ["Strategy", "Implementation", "Business Analysis", "Change Management"]
    }
  ];

  const benefits = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Verified Profiles",
      description: "Access pre-screened AI professionals with verified skills"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Hiring",
      description: "Find qualified candidates 3x faster than traditional methods"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Guarantee",
      description: "30-day replacement guarantee for all hires"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Top Talent",
      description: "Access to AI professionals from leading companies"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$299",
      period: "per job posting",
      features: [
        "30-day job posting",
        "Basic candidate screening",
        "Email support",
        "Standard promotion"
      ],
      recommended: false
    },
    {
      name: "Professional",
      price: "$599",
      period: "per job posting",
      features: [
        "60-day job posting",
        "Advanced candidate screening",
        "Priority support",
        "Featured job promotion",
        "Candidate matching",
        "Interview scheduling"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      features: [
        "Unlimited job postings",
        "Dedicated account manager",
        "Custom screening process",
        "API access",
        "Bulk hiring solutions",
        "White-label options"
      ],
      recommended: false
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Post Your Job",
      description: "Create detailed job descriptions with requirements and compensation"
    },
    {
      number: "2",
      title: "Review Candidates",
      description: "Browse qualified profiles and review applications"
    },
    {
      number: "3",
      title: "Interview & Hire",
      description: "Conduct interviews and make offers through our platform"
    },
    {
      number: "4",
      title: "Onboard Success",
      description: "Get ongoing support during the first 30 days"
    }
  ];

  const testimonials = [
    {
      company: "TechCorp AI",
      role: "CTO",
      name: "David Kim",
      quote: "Found an exceptional ML engineer within 2 weeks. The quality of candidates exceeded our expectations."
    },
    {
      company: "StartupXYZ",
      role: "Founder",
      name: "Sarah Johnson",
      quote: "The verified profiles saved us countless hours. Hired 3 AI engineers who are now core team members."
    },
    {
      company: "Innovation Labs",
      role: "Head of AI",
      name: "Michael Chen",
      quote: "Best platform for AI talent. The screening process ensures we only see qualified candidates."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-success/10 rounded-full">
              <Users className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">Hire AI Talent</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-earn bg-clip-text text-transparent">
                Find Top AI Professionals
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with pre-screened AI experts, data scientists, and machine learning engineers. Build your dream AI team faster than ever.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-earn text-white hover:opacity-90">
                <Briefcase className="h-5 w-5 mr-2" />
                Post a Job
              </Button>
              <Button size="lg" variant="outline">
                Browse Talent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular AI Roles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the right AI professionals for your specific needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg. Salary</span>
                      <div className="font-semibold text-success">{type.avgSalary}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Time to Hire</span>
                      <div className="font-semibold">{type.timeToHire}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Key Skills:</span>
                    <div className="flex flex-wrap gap-2">
                      {type.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    Post {type.title} Job
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Hire With Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Streamline your AI hiring process with our comprehensive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your hiring needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.recommended ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.recommended ? 'bg-primary' : ''}`} variant={plan.recommended ? "default" : "outline"}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple steps to find and hire top AI talent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how companies are building successful AI teams with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-success/20">
                <CardContent className="p-6">
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-earn flex items-center justify-center text-white font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Hire Top AI Talent?</h2>
            <p className="text-muted-foreground mb-8">
              Join hundreds of companies building exceptional AI teams with our platform.
            </p>
            <Button size="lg" className="bg-gradient-earn text-white hover:opacity-90">
              <Briefcase className="h-5 w-5 mr-2" />
              Post Your First Job
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostJobsPage;