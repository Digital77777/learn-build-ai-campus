import LearningPathCard from "@/components/learning/LearningPathCard";

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
            <LearningPathCard key={index} path={path} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;