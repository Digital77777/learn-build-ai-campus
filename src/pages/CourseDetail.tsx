import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [currentModule, setCurrentModule] = useState(0);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    if (user && course) {
      fetchCourseProgress();
    }
  }, [user, course]);

  const fetchCourseData = async () => {
    setLoading(true);
    // Mock data for course modules since table doesn't exist yet
    const mockData = [
      {
        id: 1,
        title: 'Introduction',
        description: 'Get started with the basics',
        video_id: 'dQw4w9WgXcQ',
        duration: '10 min',
        completed: false
      }
    ];
    
    const courseDetails = {
      id: courseId,
      title: courseId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      modules: mockData,
    };
    setCourse(courseDetails);
    setLoading(false);
  };

  const fetchCourseProgress = async () => {
    // Mock implementation since table doesn't exist yet
    console.log('Course progress would be fetched here');
  };

  const markModuleAsComplete = async (moduleId: number) => {
    if (user) {
      // Mock implementation - update local state
      const updatedModules = course.modules.map((module: any) => 
        module.id === moduleId ? { ...module, completed: true } : module
      );
      setCourse({ ...course, modules: updatedModules });
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <Navigate to="/learning-paths" replace />;
  }

  const currentVideo = course.modules[currentModule];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 group"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Learning Paths
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Player */}
              <Card className="mb-6 shadow-soft">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-black rounded-t-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.video_id}?rel=0&modestbranding=1&showinfo=0&controls=1`}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none', outline: 'none' }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Current Module Info */}
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold">{currentVideo.title}</CardTitle>
                      <p className="text-muted-foreground mt-2">{currentVideo.description}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2 mt-4 sm:mt-0">
                      <Badge variant="secondary" className="text-sm">{currentVideo.duration}</Badge>
                      <Button
                        onClick={() => markModuleAsComplete(currentVideo.id)}
                        disabled={currentVideo.completed}
                        className="w-full sm:w-auto"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {currentVideo.completed ? 'Completed' : 'Mark as Complete'}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Course Sidebar */}
            <div className="space-y-6">
              {/* Course Info */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                </CardHeader>
              </Card>

              {/* Module List */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2 font-semibold">
                    <BookOpen className="h-5 w-5" />
                    Course Modules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {course.modules.map((module: any, index: number) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        index === currentModule
                          ? 'border-primary bg-primary/10 shadow-ai'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                      onClick={() => setCurrentModule(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{module.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-sm text-muted-foreground">{module.duration}</span>
                          {module.completed && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
