import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Briefcase, Users, TrendingUp } from 'lucide-react';

const PostJobsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Post Job Opportunities</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with talented AI professionals and find the perfect match for your projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Quality Talent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access a curated pool of AI experts, data scientists, and machine learning engineers
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Easy Hiring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Streamlined posting process with built-in applicant management and communication tools
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Fast Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get qualified applications within 24 hours of posting your job opportunity
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={() => navigate('/create-job-posting')}
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Post a Job
        </Button>
      </div>
    </div>
  );
};

export default PostJobsPage;