import { Briefcase, Target, Users, TrendingUp, FileText, CheckCircle, Building2, MapPin, DollarSign, Clock, Search, Filter, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

const JobPlacementPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const placementServices = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Resume Optimization",
      description: "AI-powered resume review and enhancement"
    },
    {
      icon: <Users className="h-8 w-8 text-accent-foreground" />,
      title: "Interview Prep",
      description: "Mock interviews with AI and industry experts"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Job Matching",
      description: "Smart matching with top AI companies"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-accent-foreground" />,
      title: "Career Coaching",
      description: "Personal guidance from AI career experts"
    }
  ];

  const matchedJobs = [
    {
      id: 1,
      title: "Senior AI Engineer",
      company: "TechCorp AI",
      location: "Remote",
      salary: "$120k - $180k",
      type: "Full-time",
      match: 95,
      posted: "2 days ago",
      skills: ["Python", "TensorFlow", "ML", "Deep Learning"]
    },
    {
      id: 2,
      title: "Machine Learning Developer",
      company: "DataScience Inc",
      location: "San Francisco, CA",
      salary: "$100k - $150k",
      type: "Full-time",
      match: 88,
      posted: "1 week ago",
      skills: ["Python", "PyTorch", "NLP", "Cloud"]
    },
    {
      id: 3,
      title: "AI Product Manager",
      company: "Innovation Labs",
      location: "Remote",
      salary: "$110k - $160k",
      type: "Full-time",
      match: 82,
      posted: "3 days ago",
      skills: ["Product Strategy", "AI/ML", "Leadership", "Agile"]
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Analytics Pro",
      location: "New York, NY",
      salary: "$95k - $140k",
      type: "Full-time",
      match: 78,
      posted: "5 days ago",
      skills: ["Statistics", "Python", "SQL", "Visualization"]
    }
  ];

  const applications = [
    {
      id: 1,
      title: "AI Research Engineer",
      company: "Future AI Labs",
      status: "interview",
      date: "2024-01-10",
      nextStep: "Technical Interview - Jan 20"
    },
    {
      id: 2,
      title: "ML Solutions Architect",
      company: "CloudTech",
      status: "pending",
      date: "2024-01-08",
      nextStep: "Awaiting response"
    },
    {
      id: 3,
      title: "AI Engineer",
      company: "StartupXYZ",
      status: "offer",
      date: "2024-01-05",
      nextStep: "Offer received - Review by Jan 22"
    }
  ];

  const placementStats = [
    { label: "Job Matches", value: "24", icon: <Briefcase className="h-6 w-6 text-primary" /> },
    { label: "Applications", value: "8", icon: <FileText className="h-6 w-6 text-accent-foreground" /> },
    { label: "Interviews", value: "3", icon: <Users className="h-6 w-6 text-primary" /> },
    { label: "Success Rate", value: "87%", icon: <TrendingUp className="h-6 w-6 text-accent-foreground" /> }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline", label: string }> = {
      interview: { variant: "default", label: "Interview Scheduled" },
      pending: { variant: "secondary", label: "Under Review" },
      offer: { variant: "default", label: "Offer Received" }
    };
    const config = variants[status] || { variant: "outline", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Elite Placement Program</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Job Placement <span className="text-primary">Assistance</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with top AI companies and land your dream role with personalized placement support
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {placementStats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  {stat.icon}
                  <div className="text-2xl md:text-3xl font-bold mt-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {placementServices.map((service, idx) => (
            <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="matches" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-2xl mx-auto">
            <TabsTrigger value="matches">Job Matches</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Job Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs by title, company, or skills..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="gap-2 w-full md:w-auto">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {matchedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                            <div className="flex items-center gap-2 text-muted-foreground flex-wrap">
                              <Building2 className="h-4 w-4" />
                              <span>{job.company}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="gap-1 w-fit">
                            <Star className="h-3 w-3 fill-current" />
                            {job.match}% Match
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.posted}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-48">
                        <Button className="w-full">Apply Now</Button>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="text-lg font-bold">{app.title}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-muted-foreground">{app.company}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Applied on {new Date(app.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="font-medium">{app.nextStep}</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full md:w-auto">View Application</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resume Builder
                  </CardTitle>
                  <CardDescription>Create and optimize your AI career resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Build Resume</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Interview Prep
                  </CardTitle>
                  <CardDescription>Practice with AI mock interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Practice</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Career Coaching
                  </CardTitle>
                  <CardDescription>1-on-1 sessions with career experts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Schedule Session</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Salary Negotiation
                  </CardTitle>
                  <CardDescription>Tools and tips for better offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default JobPlacementPage;
