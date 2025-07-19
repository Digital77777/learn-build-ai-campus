import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { AITool } from "@/types/aiTools";

interface Props {
  tool: AITool;
  onTry?: () => void;
}

const AIToolCard: FC<Props> = ({ tool, onTry }) => (
  <Card className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
    <div className={`absolute top-0 left-0 right-0 h-1 ${tool.gradient}`} />
    <CardHeader>
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${tool.gradient}`}>
          <tool.icon className="h-6 w-6 text-white" />
        </div>
        <Badge variant="secondary" className="text-xs">
          {tool.usage}
        </Badge>
      </div>
      <CardTitle className="text-lg">{tool.title}</CardTitle>
      <p className="text-muted-foreground text-sm">{tool.description}</p>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Features:</h4>
        <div className="space-y-1">
          {tool.features.map((feature, idx) => (
            <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              {feature}
            </div>
          ))}
        </div>
      </div>
      <Button className="w-full" variant="outline" onClick={onTry}>
        Try {tool.title}
      </Button>
    </CardContent>
  </Card>
);

export default AIToolCard;
