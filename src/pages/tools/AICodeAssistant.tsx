import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Code, Play, Copy, Download, Zap, Bug, RefreshCw, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const AICodeAssistant = () => {
  const [code, setCode] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeFeature, setActiveFeature] = useState('completion');

  const features = [
    { id: 'completion', label: 'Code Completion', icon: Code },
    { id: 'debug', label: 'Bug Detection', icon: Bug },
    { id: 'refactor', label: 'Code Refactoring', icon: RefreshCw }
  ];

  const sampleCode = `function calculateFactorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}`;

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      switch (activeFeature) {
        case 'completion':
          setSuggestion(`// AI Suggestion: Add input validation and optimize recursion
function calculateFactorial(n) {
  // Input validation
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new Error('Input must be an integer');
  }
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  
  // Iterative approach for better performance
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}`);
          break;
        case 'debug':
          setSuggestion(`🐛 Potential Issues Found:
1. No input validation - function accepts any type
2. Stack overflow risk for large numbers (recursive approach)
3. Missing error handling for edge cases

✅ Suggested Fixes:
- Add type checking for input parameter
- Use iterative approach instead of recursion
- Add proper error handling`);
          break;
        case 'refactor':
          setSuggestion(`🔄 Refactoring Suggestions:
1. Extract validation logic into separate function
2. Add JSDoc comments for better documentation
3. Consider using memoization for performance
4. Add unit tests for edge cases

Refactored version with improvements available.`);
          break;
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

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
            Intelligent code completion, bug detection, and refactoring powered by advanced language models
          </p>
          <Badge className="mt-4 bg-green-100 text-green-800">Free Unlimited</Badge>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted rounded-lg p-1">
            {features.map((feature) => (
              <Button
                key={feature.id}
                variant={activeFeature === feature.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFeature(feature.id)}
                className="flex items-center gap-2"
              >
                <feature.icon className="h-4 w-4" />
                {feature.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Your Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your code here or try the sample..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleAnalyze} disabled={isAnalyzing} className="flex-1">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Analyze Code
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={() => setCode(sampleCode)}>
                  Try Sample
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {suggestion ? (
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">{suggestion}</pre>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => copyToClipboard(suggestion)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your code and click "Analyze Code" to get AI-powered suggestions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Code className="h-8 w-8 mx-auto mb-3 text-blue-500" />
              <h3 className="font-semibold mb-2">Smart Completion</h3>
              <p className="text-sm text-muted-foreground">
                Context-aware code suggestions and auto-completion
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Bug className="h-8 w-8 mx-auto mb-3 text-red-500" />
              <h3 className="font-semibold mb-2">Bug Detection</h3>
              <p className="text-sm text-muted-foreground">
                Identify potential issues and security vulnerabilities
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <RefreshCw className="h-8 w-8 mx-auto mb-3 text-green-500" />
              <h3 className="font-semibold mb-2">Code Refactoring</h3>
              <p className="text-sm text-muted-foreground">
                Optimize code structure and improve readability
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICodeAssistant;