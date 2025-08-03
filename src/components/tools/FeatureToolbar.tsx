import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Zap, 
  Brain, 
  Code, 
  FileText,
  TestTube,
  BookOpen
} from 'lucide-react';

interface FeatureToolbarProps {
  onAnalyze: () => void;
  onExplain: () => void;
  onGenerateTests: () => void;
  onReset: () => void;
  isAnalyzing: boolean;
  hasCode: boolean;
}

export const FeatureToolbar: React.FC<FeatureToolbarProps> = ({
  onAnalyze,
  onExplain,
  onGenerateTests,
  onReset,
  isAnalyzing,
  hasCode
}) => {
  const features = [
    {
      id: 'analyze',
      label: 'Analyze Code',
      icon: <Brain className="h-4 w-4" />,
      onClick: onAnalyze,
      disabled: !hasCode || isAnalyzing,
      variant: 'default' as const,
      description: 'Get AI-powered code analysis'
    },
    {
      id: 'explain',
      label: 'Explain Code',
      icon: <BookOpen className="h-4 w-4" />,
      onClick: onExplain,
      disabled: !hasCode || isAnalyzing,
      variant: 'outline' as const,
      description: 'Get plain English explanation'
    },
    {
      id: 'tests',
      label: 'Generate Tests',
      icon: <TestTube className="h-4 w-4" />,
      onClick: onGenerateTests,
      disabled: !hasCode || isAnalyzing,
      variant: 'outline' as const,
      description: 'Create unit tests automatically'
    },
    {
      id: 'reset',
      label: 'Reset',
      icon: <RotateCcw className="h-4 w-4" />,
      onClick: onReset,
      disabled: isAnalyzing,
      variant: 'ghost' as const,
      description: 'Clear all content'
    }
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-semibold">AI Features</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Powered by CodeLlama
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {features.map((feature) => (
            <Button
              key={feature.id}
              variant={feature.variant}
              size="sm"
              onClick={feature.onClick}
              disabled={feature.disabled}
              className="flex flex-col items-center gap-1 h-auto py-3"
              title={feature.description}
            >
              {isAnalyzing && feature.id === 'analyze' ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              ) : (
                feature.icon
              )}
              <span className="text-xs">{feature.label}</span>
            </Button>
          ))}
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          {isAnalyzing ? (
            <span className="flex items-center justify-center gap-1">
              <div className="animate-pulse w-2 h-2 bg-primary rounded-full"></div>
              AI is analyzing your code...
            </span>
          ) : hasCode ? (
            "Ready to analyze your code with AI"
          ) : (
            "Enter code to unlock AI features"
          )}
        </div>
      </CardContent>
    </Card>
  );
};