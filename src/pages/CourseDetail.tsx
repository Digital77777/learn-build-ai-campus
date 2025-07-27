import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { getCourseById } from "@/integrations/supabase";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [currentModule, setCurrentModule] = useState(0);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (courseId) {
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!course) {
    return <Navigate to="/learning-paths" replace />;
  }

  const currentVideo = course.modules[currentModule];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="aspect-video relative bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo.videoId}?rel=0&modestbranding=1&showinfo=0&controls=1`}
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
                    <Badge variant="secondary">{currentVideo.duration}</Badge>
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
                  <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <Badge className="w-fit">{course.level}</Badge>
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
                  {course.modules.map((module, index) => (
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
                            <CheckCircle className="h-4 w-4 text-success" />
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