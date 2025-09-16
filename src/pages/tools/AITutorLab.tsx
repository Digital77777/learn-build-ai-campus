import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  GraduationCap, 
  MessageSquare, 
  Book, 
  Play,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  Target,
  Code,
  Calculator,
  Globe,
  Atom
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'explanation' | 'practice' | 'question';
}

const AITutorLab = () => {
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('general');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI tutor. Ask me any question and I'll explain it in simple terms. You can also try the interactive practice problems!",
      sender: 'ai',
      timestamp: new Date(),
      type: 'explanation'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const subjects = [
    { value: 'general', label: 'General', icon: Book },
    { value: 'math', label: 'Mathematics', icon: Calculator },
    { value: 'science', label: 'Science', icon: Atom },
    { value: 'programming', label: 'Programming', icon: Code },
    { value: 'language', label: 'Languages', icon: Globe }
  ];

  const practiceProblems = [
    {
      subject: 'math',
      question: 'What is 15% of 240?',
      hint: 'Remember: percentage means "per hundred"',
      answer: '36'
    },
    {
      subject: 'science',
      question: 'What gas do plants absorb during photosynthesis?',
      hint: 'Think about what plants need from the air to make food',
      answer: 'Carbon dioxide (CO2)'
    },
    {
      subject: 'programming',
      question: 'What does a loop do in programming?',
      hint: 'Think about repetition',
      answer: 'Repeats a set of instructions multiple times'
    }
  ];

  const handleAsk = useCallback(async () => {
    if (!question.trim()) {
      toast({
        title: "Enter a question",
        description: "Please type a question to get an explanation",
        variant: "destructive"
      });
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setQuestion('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateExplanation(question, subject),
        sender: 'ai',
        timestamp: new Date(),
        type: 'explanation'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      toast({
        title: "Explanation ready",
        description: "I've broken down your question in simple terms"
      });
    }, 2000);
  }, [question, subject, toast]);

  const generateExplanation = (question: string, subject: string) => {
    const explanations: { [key: string]: string } = {
      'math': `Great math question! Let me break this down step by step:

${question}

Here's how to think about it:
1. First, identify what we're looking for
2. Break the problem into smaller parts
3. Use the basic rules we know
4. Check our answer makes sense

This concept connects to: algebra, problem-solving, and logical thinking.

Want to try a practice problem to test your understanding?`,
      
      'science': `Excellent science question! Let me explain this clearly:

${question}

The key concept here is:
• What's happening at the molecular level
• Why this process is important
• How it connects to bigger ideas
• Real-world examples you might see

Remember: Science is all about observing patterns in nature and understanding why they happen.

Would you like to explore this topic further with an interactive example?`,
      
      'programming': `Good programming question! Let's code this out:

${question}

Here's the concept in plain English:
1. What problem are we trying to solve?
2. What tools (code) can help us?
3. How do we build the solution step by step?
4. How do we test it works?

Programming is like giving very detailed instructions to a computer. The key is breaking big problems into small, clear steps.

Ready to try writing some code together?`,
      
      'general': `Interesting question! Let me explain this in simple terms:

${question}

Here's how I think about it:
• What's the main idea?
• Why is this important to understand?
• How does it connect to things you already know?
• What are some examples from everyday life?

Learning is about connecting new ideas to what you already understand. Each question builds on previous knowledge!

Want to dive deeper into any part of this explanation?`
    };

    return explanations[subject] || explanations['general'];
  };

  const handlePractice = useCallback((problem: any) => {
    const practiceMessage: Message = {
      id: Date.now().toString(),
      text: `Practice Problem: ${problem.question}\n\nHint: ${problem.hint}\n\nTake your time and think it through. Type your answer when ready!`,
      sender: 'ai',
      timestamp: new Date(),
      type: 'practice'
    };
    
    setMessages(prev => [...prev, practiceMessage]);
    toast({
      title: "Practice problem loaded",
      description: "Try solving it step by step"
    });
  }, [toast]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI TutorLab</h1>
              <p className="text-muted-foreground">Interactive learning with plain language explanations</p>
            </div>
            <Badge variant="secondary" className="ml-auto">Free</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Subject & Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Learning Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Subject */}
              <div>
                <Label className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  Subject
                </Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        <div className="flex items-center gap-2">
                          <s.icon className="h-4 w-4" />
                          {s.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Quick Start</h4>
                <div className="grid grid-cols-3 gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2"
                    onClick={() => setQuestion("How does photosynthesis work?")}
                  >
                    <Lightbulb className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2"
                    onClick={() => setQuestion("Can you give me a practice problem?")}
                  >
                    <Target className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="p-2"
                    onClick={() => setQuestion("Help me understand why this is important")}
                  >
                    <HelpCircle className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-3 w-3" />
                    <span>Explain concepts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3 w-3" />
                    <span>Practice problems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-3 w-3" />
                    <span>Why it matters</span>
                  </div>
                </div>
              </div>

              {/* Practice */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Practice
                </h4>
                <div className="space-y-1">
                  {practiceProblems
                    .filter(p => subject === 'general' || p.subject === subject)
                    .slice(0, 2)
                    .map((problem, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left h-auto p-2"
                        onClick={() => handlePractice(problem)}
                      >
                        <div className="text-xs truncate">{problem.question}</div>
                      </Button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Interactive Sandbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Ask Questions</TabsTrigger>
                  <TabsTrigger value="sandbox">Code Sandbox</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat" className="space-y-4">
                  {/* Messages */}
                  <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {message.type && (
                            <div className="flex items-center gap-2 mb-2 text-xs opacity-75">
                              {message.type === 'explanation' && <Lightbulb className="h-3 w-3" />}
                              {message.type === 'practice' && <Target className="h-3 w-3" />}
                              {message.type === 'question' && <HelpCircle className="h-3 w-3" />}
                              {message.type}
                            </div>
                          )}
                          <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                          <div className="text-xs opacity-50 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me anything... (Enter to send)"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleAsk} disabled={isTyping} size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="sandbox" className="space-y-4">
                  <div className="h-96 border rounded-lg p-4 bg-muted/50">
                    <div className="text-center space-y-4 mt-20">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                        <Play className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Interactive Learning Sandbox</h3>
                        <p className="text-sm text-muted-foreground">
                          Practice coding, math problems, or visual concepts right here
                        </p>
                      </div>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Start Interactive Session
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AITutorLab;