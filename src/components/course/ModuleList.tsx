import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle } from "lucide-react";

interface Module {
  title: string;
  description: string;
  duration: string;
  completed: boolean;
}

interface ModuleListProps {
  modules: Module[];
  currentModule: number;
  onModuleSelect: (index: number) => void;
}

const ModuleList = ({ modules, currentModule, onModuleSelect }: ModuleListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Course Modules
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {modules.map((module, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              index === currentModule
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onModuleSelect(index)}
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
  );
};

export default ModuleList;