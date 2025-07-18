import Navigation from "@/components/Navigation";
import { BookOpen, Clock, Star, Users, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LearningPaths = () => {
  const paths = [
    {
      id: 1,
      title: "AI Fundamentals",
      description: "Master the basics of artificial intelligence and machine learning",
      duration: "6 weeks",
      level: "Beginner",
      students: 2500,
      rating: 4.8,
      image: "🤖",
      lessons: 24,
      skills: ["Python", "Neural Networks", "Data Science"]
    },
    {
      id: 2,
      title: "Deep Learning Mastery",
      description: "Advanced deep learning techniques and neural architectures",
      duration: "10 weeks",
      level: "Advanced",
      students: 1200,
      rating: 4.9,
      image: "🧠",
      lessons: 45,
      skills: ["TensorFlow", "PyTorch", "Computer Vision"]
    },
    {
      id: 3,
      title: "AI Ethics & Society",
      description: "Understanding the ethical implications of AI in modern society",
      duration: "4 weeks",
      level: "Intermediate",
      students: 800,
      rating: 4.7,
      image: "⚖️",
      lessons: 16,
      skills: ["Ethics", "Policy", "Philosophy"]
    },
    {
      id: 4,
      title: "Natural Language Processing",
      description: "Build intelligent systems that understand human language",
      duration: "8 weeks",
      level: "Intermediate",
      students: 1800,
      rating: 4.8,
      image: "💬",
      lessons: 32,
      skills: ["NLP", "Transformers", "BERT"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-ai bg-clip-text text-transparent">
                Learning Paths
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Structured learning journeys designed to take you from beginner to expert in AI and machine learning
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>100+ Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>5,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paths.map((path) => (
              <Card key={path.id} className="group hover:shadow-ai transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-4">{path.image}</div>
                    <Badge variant="secondary" className="text-xs">
                      {path.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {path.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{path.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{path.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{path.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{path.students.toLocaleString()} students</span>
                    </div>
                    <Button className="group/btn">
                      <Play className="h-4 w-4 mr-2" />
                      Start Learning
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already mastering AI and building the future
          </p>
          <Button size="lg" className="bg-gradient-ai text-white hover:opacity-90">
            Get Started Free
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LearningPaths;