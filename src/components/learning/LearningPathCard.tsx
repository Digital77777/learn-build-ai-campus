import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  duration: string;
  students: string;
  level: string;
  earnings: string;
  modules: string[];
  gradient: string;
}

interface LearningPathCardProps {
  path: LearningPath;
}

const LearningPathCard = ({ path }: LearningPathCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1">
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
  );
};

export default LearningPathCard;