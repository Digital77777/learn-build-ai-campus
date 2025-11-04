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
    const { data, error } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', courseId);

    if (error) {
      console.error('Error fetching course data:', error);
    } else {
      const courseDetails = {
        id: courseId,
        title: courseId?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        modules: data,
      };
      setCourse(courseDetails);
    }
    setLoading(false);
  };

  const fetchCourseProgress = async () => {
    const { data, error } = await supabase
      .from('user_course_progress')
      .select('module_id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .eq('is_completed', true);

    if (error) {
      console.error('Error fetching course progress:', error);
    } else {
      const completedModules = data.map((progress) => progress.module_id);
      const updatedModules = course.modules.map((module: any) => ({
        ...module,
        completed: completedModules.includes(module.id),
      }));
      setCourse({ ...course, modules: updatedModules });
    }
  };

  const markModuleAsComplete = async (moduleId: number) => {
    if (user) {
      const { error } = await supabase.from('user_course_progress').upsert({
        user_id: user.id,
        course_id: course.id,
        module_id: moduleId,
        is_completed: true,
        completed_at: new Date().toISOString(),
      });
      if (error) {
        console.error('Error marking module as complete:', error);
      } else {
        fetchCourseProgress();
      }
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
        <div className="container mx-auto px-6 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6 group"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Learning Paths
          </Button>

          <div className="grid lg-grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.video_id}?rel=0&modestbranding=1&showinfo=0&controls=1`}
                      title={currentVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        border: 'none',
                        outline: 'none'
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Current Module Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{currentVideo.title}</CardTitle>
                      <p className="text-muted-foreground mt-2">{currentVideo.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary">{currentVideo.duration}</Badge>
                      <Button onClick={() => markModuleAsComplete(currentVideo.id)} disabled={currentVideo.completed}>
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                </CardHeader>
              </Card>

              {/* Module List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Course Modules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {course.modules.map((module: any, index: number) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        index === currentModule
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setCurrentModule(index)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{module.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-xs text-muted-foreground">{module.duration}</span>
                          {module.completed && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
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
