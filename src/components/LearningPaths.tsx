import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const learningPaths = [
  {
    id: "ai-fundamentals",
    title: "AI Fundamentals",
    description: "Master the basics of artificial intelligence, machine learning, and neural networks",
    duration: "4-6 weeks",
    students: "2,341",
    level: "Beginner",
    earnings: "$500-1,000",
    modules: ["Introduction to AI", "Machine Learning Basics", "Neural Networks", "Python for AI"],
    gradient: "bg-gradient-learning"
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    description: "Build chatbots, language models, and text analysis applications",
    duration: "6-8 weeks", 
    students: "1,847",
    level: "Intermediate",
    earnings: "$1,000-2,500",
    modules: ["Text Processing", "Language Models", "Chatbot Development", "Sentiment Analysis"],
    gradient: "bg-gradient-ai"
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Create image recognition systems, object detection, and visual AI applications",
    duration: "8-10 weeks",
    students: "1,234",
    level: "Intermediate",
    earnings: "$1,500-3,000",
    modules: ["Image Processing", "Object Detection", "Face Recognition", "AI Art Generation"],
    gradient: "bg-gradient-earn"
  },
  {
    id: "ai-business",
    title: "AI for Business",
    description: "Learn to implement AI solutions for real-world business problems",
    duration: "6-8 weeks",
    students: "987",
    level: "Advanced",
    earnings: "$2,000-5,000",
    modules: ["Business AI Strategy", "ROI Analysis", "Implementation", "Client Consulting"],
    gradient: "bg-gradient-learning"
  }
];

const LearningPaths = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Structured Learning Paths</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Follow our expertly designed curricula to build AI expertise step-by-step, 
            with real projects and earning opportunities at every stage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {learningPaths.map((path, index) => (
            <Card key={index} className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="secondary">{path.level}</Badge>
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                  </div>
                  <div className={`p-3 rounded-lg ${path.gradient}`}>
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-muted-foreground">{path.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{path.duration}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{path.students}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-success">{path.earnings}</div>
                    <div className="text-xs text-muted-foreground">Potential earnings</div>
                  </div>
                </div>

                {/* Modules */}
                <div>
                  <h4 className="font-semibold mb-3">Key Modules:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {path.modules.map((module, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground bg-background p-2 rounded">
                        {module}
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full group" 
                  variant="default"
                  onClick={() => navigate(`/course/${path.id}`)}
                >
                  Start Learning Path
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;