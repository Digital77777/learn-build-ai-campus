import React, { useState, useCallback } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Navigation from '@/components/Navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Sparkles, Zap, BookOpen, TestTube } from 'lucide-react';
import { CodeEditor } from '@/components/tools/CodeEditor';
import { AnalysisPanel } from '@/components/tools/AnalysisPanel';
import { FeatureToolbar } from '@/components/tools/FeatureToolbar';
import { CodeMetrics } from '@/components/tools/CodeMetrics';
import { aiCodeService, CodeAnalysisResult } from '@/lib/aiCodeService';
import { toast } from 'sonner';

const AICodeAssistant = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState<CodeAnalysisResult | null>(null);
  const [explanation, setExplanation] = useState('');
  const [tests, setTests] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState<'completion' | 'debug' | 'refactor'>('completion');
  const [activeTab, setActiveTab] = useState('analysis');

  const handleAnalyze = useCallback(async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await aiCodeService.analyzeCode(code, analysisType);
      setAnalysis(result);
      setActiveTab('analysis');
      toast.success('Code analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze code. Please try again.');
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [code, analysisType]);

  const handleExplain = useCallback(async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to explain');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await aiCodeService.explainCode(code);
      setExplanation(result);
      setActiveTab('explanation');
      toast.success('Code explanation generated!');
    } catch (error) {
      toast.error('Failed to explain code. Please try again.');
      console.error('Explanation error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  const handleGenerateTests = useCallback(async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to generate tests for');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await aiCodeService.generateTests(code);
      setTests(result);
      setActiveTab('tests');
      toast.success('Unit tests generated!');
    } catch (error) {
      toast.error('Failed to generate tests. Please try again.');
      console.error('Test generation error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  const handleReset = useCallback(() => {
    setCode('');
    setAnalysis(null);
    setExplanation('');
    setTests('');
    setActiveTab('analysis');
    toast.info('Editor cleared');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <Code className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">AI Code Assistant</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Intelligent code completion, debugging, and refactoring powered by CodeLlama
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-green-100 text-green-800">Free Unlimited</Badge>
            <Badge variant="outline">CodeLlama-7B</Badge>
            <Badge variant="outline">Real-time Analysis</Badge>
          </div>
        </div>

        {/* Feature Toolbar */}
        <div className="mb-6">
          <FeatureToolbar
            onAnalyze={handleAnalyze}
            onExplain={handleExplain}
            onGenerateTests={handleGenerateTests}
            onReset={handleReset}
            isAnalyzing={isAnalyzing}
            hasCode={code.trim().length > 0}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Code Editor - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              onLanguageChange={setLanguage}
              placeholder="// Enter your code here or upload a file
// Try pasting some JavaScript, Python, or TypeScript code
// The AI will analyze it for bugs, improvements, and optimizations

function example() {
  console.log('Hello, AI Code Assistant!');
}"
            />
            
            {/* Code Metrics */}
            <CodeMetrics
              code={code}
              complexity={analysis?.complexity}
              maintainability={analysis?.maintainability}
            />
          </div>

          {/* Analysis Panel - Right Column */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="analysis" className="text-xs">
                  <div className="h-3 w-3 mr-1" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="explanation" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  Explain
                </TabsTrigger>
                <TabsTrigger value="tests" className="text-xs">
                  <TestTube className="h-3 w-3 mr-1" />
                  Tests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="analysis">
                <AnalysisPanel
                  analysis={analysis}
                  isAnalyzing={isAnalyzing}
                  analysisType={analysisType}
                  onAnalysisTypeChange={setAnalysisType}
                />
              </TabsContent>

              <TabsContent value="explanation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BookOpen className="h-5 w-5" />
                      Code Explanation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {explanation ? (
                      <div className="space-y-3">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {explanation}
                          </pre>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(explanation);
                            toast.success('Explanation copied!');
                          }}
                        >
                          Copy Explanation
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Click "Explain Code" to get a detailed explanation</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tests">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TestTube className="h-5 w-5" />
                      Generated Tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {tests ? (
                      <div className="space-y-3">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {tests}
                          </pre>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(tests);
                            toast.success('Tests copied!');
                          }}
                        >
                          Copy Tests
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <TestTube className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Click "Generate Tests" to create unit tests</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Smart Completion</h3>
              <p className="text-sm text-muted-foreground">
                Context-aware code suggestions powered by CodeLlama AI model
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-red-100 flex items-center justify-center">
                <Code className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2">Advanced Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Deep code analysis with complexity metrics and quality scores
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-sm text-muted-foreground">
                Real API integration with Hugging Face for accurate results
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function AICodeAssistantWithBoundary(props) {
  return (
    <ErrorBoundary>
      <AICodeAssistant {...props} />
    </ErrorBoundary>
  );
}