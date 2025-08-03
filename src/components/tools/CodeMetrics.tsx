import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Clock, 
  FileText, 
  Code,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface CodeMetricsProps {
  code: string;
  complexity?: number;
  maintainability?: number;
}

export const CodeMetrics: React.FC<CodeMetricsProps> = ({
  code,
  complexity = 0,
  maintainability = 0
}) => {
  const lines = code.split('\n').filter(line => line.trim());
  const characters = code.length;
  const words = code.split(/\s+/).filter(word => word.trim()).length;
  const functions = (code.match(/function\s+\w+|const\s+\w+\s*=\s*\(|\w+\s*=>\s*{/g) || []).length;
  const comments = (code.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || []).length;

  const metrics = [
    {
      label: 'Lines of Code',
      value: lines.length,
      icon: <FileText className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      label: 'Characters',
      value: characters,
      icon: <Code className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      label: 'Functions',
      value: functions,
      icon: <Target className="h-4 w-4" />,
      color: 'text-purple-600'
    },
    {
      label: 'Comments',
      value: comments,
      icon: <FileText className="h-4 w-4" />,
      color: 'text-orange-600'
    }
  ];

  const getQualityBadge = (score: number, type: 'complexity' | 'maintainability') => {
    if (type === 'complexity') {
      if (score <= 3) return { label: 'Low', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> };
      if (score <= 6) return { label: 'Medium', color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="h-3 w-3" /> };
      return { label: 'High', color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-3 w-3" /> };
    } else {
      if (score >= 8) return { label: 'Excellent', color: 'bg-green-100 text-green-800', icon: <CheckCircle className="h-3 w-3" /> };
      if (score >= 6) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800', icon: <AlertCircle className="h-3 w-3" /> };
      return { label: 'Poor', color: 'bg-red-100 text-red-800', icon: <AlertCircle className="h-3 w-3" /> };
    }
  };

  const complexityBadge = getQualityBadge(complexity, 'complexity');
  const maintainabilityBadge = getQualityBadge(maintainability, 'maintainability');

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5" />
          Code Metrics
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Basic Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <div className={metric.color}>
                {metric.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Metrics */}
        {(complexity > 0 || maintainability > 0) && (
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Code Quality</h4>
            
            {complexity > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complexity</span>
                  <Badge className={complexityBadge.color}>
                    {complexityBadge.icon}
                    {complexityBadge.label}
                  </Badge>
                </div>
                <Progress value={complexity * 10} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Score: {complexity}/10 (Lower is better)
                </div>
              </div>
            )}
            
            {maintainability > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Maintainability</span>
                  <Badge className={maintainabilityBadge.color}>
                    {maintainabilityBadge.icon}
                    {maintainabilityBadge.label}
                  </Badge>
                </div>
                <Progress value={maintainability * 10} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Score: {maintainability}/10 (Higher is better)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Code Health Summary */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Health Summary
          </h4>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>• Code length: {lines.length < 50 ? 'Concise' : lines.length < 200 ? 'Moderate' : 'Large'}</p>
            <p>• Function count: {functions === 0 ? 'No functions' : functions === 1 ? '1 function' : `${functions} functions`}</p>
            <p>• Documentation: {comments === 0 ? 'No comments' : comments === 1 ? '1 comment' : `${comments} comments`}</p>
            <p>• Comment ratio: {lines.length > 0 ? Math.round((comments / lines.length) * 100) : 0}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};