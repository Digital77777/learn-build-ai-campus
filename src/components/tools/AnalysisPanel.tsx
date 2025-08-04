import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Bug, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Copy, 
  Download,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';
import { CodeAnalysisResult } from '@/lib/aiCodeService';
// Removed syntax highlighter dependency for simplified build
import { toast } from 'sonner';

interface AnalysisPanelProps {
  analysis: CodeAnalysisResult | null;
  isAnalyzing: boolean;
  analysisType: 'completion' | 'debug' | 'refactor';
  onAnalysisTypeChange: (type: 'completion' | 'debug' | 'refactor') => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  analysis,
  isAnalyzing,
  analysisType,
  onAnalysisTypeChange
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const downloadAnalysis = () => {
    if (!analysis) return;
    
    const content = `AI Code Analysis Report
Generated: ${new Date().toLocaleString()}

SUGGESTIONS:
${analysis.suggestions}

BUGS FOUND:
${analysis.bugs.map((bug, i) => `${i + 1}. ${bug}`).join('\n')}

IMPROVEMENTS:
${analysis.improvements.map((imp, i) => `${i + 1}. ${imp}`).join('\n')}

METRICS:
- Complexity Score: ${analysis.complexity}/10
- Maintainability Score: ${analysis.maintainability}/10

${analysis.refactoredCode ? `REFACTORED CODE:\n${analysis.refactoredCode}` : ''}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Analysis report downloaded!');
  };

  const getComplexityColor = (score: number) => {
    if (score <= 3) return 'text-green-600';
    if (score <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMaintainabilityColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5" />
            AI Analysis
          </CardTitle>
          {analysis && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(analysis.suggestions)}
                title="Copy analysis"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={downloadAnalysis}
                title="Download report"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Analysis Type Selector */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={analysisType === 'completion' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onAnalysisTypeChange('completion')}
            className="flex-1"
          >
            <Zap className="h-4 w-4 mr-1" />
            Complete
          </Button>
          <Button
            variant={analysisType === 'debug' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onAnalysisTypeChange('debug')}
            className="flex-1"
          >
            <Bug className="h-4 w-4 mr-1" />
            Debug
          </Button>
          <Button
            variant={analysisType === 'refactor' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onAnalysisTypeChange('refactor')}
            className="flex-1"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refactor
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Analyzing code with AI...</span>
            </div>
            <Progress value={66} className="w-full" />
            <p className="text-xs text-muted-foreground">
              Using CodeLlama model for advanced code analysis
            </p>
          </div>
        ) : analysis ? (
          <Tabs defaultValue="suggestions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
              <TabsTrigger value="issues">Issues</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="suggestions" className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                {analysisType === 'completion' && analysis.refactoredCode ? (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Improved Code
                    </h4>
                    <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
                      <code>{analysis.refactoredCode}</code>
                    </pre>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Brain className="h-4 w-4 text-blue-600" />
                      AI Suggestions
                    </h4>
                    <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                      {analysis.suggestions}
                    </pre>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="issues" className="space-y-4">
              <div className="space-y-3">
                {analysis.bugs.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Bug className="h-4 w-4 text-red-600" />
                      Issues Found ({analysis.bugs.length})
                    </h4>
                    {analysis.bugs.map((bug, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-red-800">{bug}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800">No critical issues found!</span>
                  </div>
                )}
                
                {analysis.improvements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      Improvements ({analysis.improvements.length})
                    </h4>
                    {analysis.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-blue-800">{improvement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Target className="h-4 w-4" />
                      <span className="text-sm font-medium">Complexity</span>
                    </div>
                    <div className={`text-2xl font-bold ${getComplexityColor(analysis.complexity)}`}>
                      {analysis.complexity}/10
                    </div>
                    <Progress 
                      value={analysis.complexity * 10} 
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">Maintainability</span>
                    </div>
                    <div className={`text-2xl font-bold ${getMaintainabilityColor(analysis.maintainability)}`}>
                      {analysis.maintainability}/10
                    </div>
                    <Progress 
                      value={analysis.maintainability * 10} 
                      className="mt-2 h-2"
                    />
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-sm mb-2">📊 Code Quality Summary</h4>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Complexity: {analysis.complexity <= 3 ? 'Low (Good)' : analysis.complexity <= 6 ? 'Medium' : 'High (Consider refactoring)'}</p>
                    <p>• Maintainability: {analysis.maintainability >= 8 ? 'Excellent' : analysis.maintainability >= 6 ? 'Good' : 'Needs improvement'}</p>
                    <p>• Issues: {analysis.bugs.length === 0 ? 'None detected' : `${analysis.bugs.length} found`}</p>
                    <p>• Suggestions: {analysis.improvements.length} improvements available</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">AI Analysis Ready</p>
            <p className="text-sm">
              Enter your code and click "Analyze Code" to get AI-powered insights
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};