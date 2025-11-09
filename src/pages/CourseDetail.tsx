import { useParams, Navigate } from "react-router-dom";

import { ArrowLeft, Clock, Users, Star, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Course data with YouTube video IDs
const courseData = {
  "ai-fundamentals": {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Master the basics of artificial intelligence, machine learning, and neural networks",
    instructor: "Dr. Sarah Chen",
    duration: "4-6 weeks",
    students: "2,341",
    level: "Beginner",
    rating: 4.8,
    modules: [
      {
        title: "Introduction to AI",
        description: "Understanding what AI is and its applications",
        videoId: "ad79nYk2keg", // What is Artificial Intelligence? In 5 minutes
        duration: "45 min",
        completed: false
      },
      {
        title: "Machine Learning Basics",
        description: "Core concepts of machine learning algorithms",
        videoId: "Gv9_4yMHFhI", // Machine Learning Explained
        duration: "38 min",
        completed: false
      },
      {
        title: "Neural Networks",
        description: "How neural networks work and their applications",
        videoId: "bfmFfD2RIcg", // Neural Networks Explained
        duration: "52 min",
        completed: false
      },
      {
        title: "Python for AI",
        description: "Programming fundamentals for AI development",
        videoId: "WGJJIrtnfpk", // Python for AI and Machine Learning
        duration: "41 min",
        completed: false
      }
    ]
  },
  "nlp": {
    id: "nlp",
    title: "Natural Language Processing",
    description: "Build chatbots, language models, and text analysis applications",
    instructor: "Prof. Michael Rodriguez",
    duration: "6-8 weeks",
    students: "1,847",
    level: "Intermediate",
    rating: 4.9,
    modules: [
      {
        title: "Text Processing",
        description: "Preprocessing and analyzing text data",
        videoId: "fOvTtapxa9c", // Natural Language Processing
        duration: "35 min",
        completed: false
      },
      {
        title: "Language Models",
        description: "Understanding and building language models",
        videoId: "zizonToFXDs", // Large Language Models explained
        duration: "42 min",
        completed: false
      },
      {
        title: "Chatbot Development",
        description: "Creating intelligent conversational AI",
        videoId: "EPnRSVreMzI", // How to Build a Chatbot
        duration: "48 min",
        completed: false
      },
      {
        title: "Sentiment Analysis",
        description: "Analyzing emotions and opinions in text",
        videoId: "QpzMWQvxXWk", // Sentiment Analysis Explained
        duration: "33 min",
        completed: false
      }
    ]
  },
  "computer-vision": {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Create image recognition systems, object detection, and visual AI applications",
    instructor: "Dr. Lisa Zhang",
    duration: "8-10 weeks",
    students: "1,234",
    level: "Intermediate",
    rating: 4.7,
    modules: [
      {
        title: "Image Processing",
        description: "Fundamentals of digital image processing",
        videoId: "XkVdwrmN_h0", // Computer Vision Explained
        duration: "40 min",
        completed: false
      },
      {
        title: "Object Detection",
        description: "Detecting and classifying objects in images",
        videoId: "tFNJGim3FXw", // Object Detection Explained
        duration: "45 min",
        completed: false
      },
      {
        title: "Face Recognition",
        description: "Building facial recognition systems",
        videoId: "FgakZw6K1QQ", // Face Recognition
        duration: "38 min",
        completed: false
      },
      {
        title: "AI Art Generation",
        description: "Creating art using AI algorithms",
        videoId: "SVcsDDABEkM", // AI Art Generation
        duration: "36 min",
        completed: false
      }
    ]
  },
  "ai-business": {
    id: "ai-business",
    title: "AI for Business",
    description: "Learn to implement AI solutions for real-world business problems",
    instructor: "James Wilson, MBA",
    duration: "6-8 weeks",
    students: "987",
    level: "Advanced",
    rating: 4.8,
    modules: [
      {
        title: "Business AI Strategy",
        description: "Developing AI strategies for business growth",
        videoId: "t4kyRyKyOpo", // AI Business Strategy
        duration: "44 min",
        completed: false
      },
      {
        title: "ROI Analysis",
        description: "Measuring return on investment for AI projects",
        videoId: "RSKlSkgV_gI", // AI ROI Analysis
        duration: "32 min",
        completed: false
      },
      {
        title: "Implementation",
        description: "Best practices for AI implementation",
        videoId: "SN5KToeTfUY", // AI Implementation
        duration: "50 min",
        completed: false
      },
      {
        title: "Client Consulting",
        description: "Consulting clients on AI solutions",
        videoId: "wjZofJX0v4M", // AI Consulting
        duration: "39 min",
        completed: false
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const [currentModule, setCurrentModule] = useState(0);
  
  const course = courseData[courseId as keyof typeof courseData];
  
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