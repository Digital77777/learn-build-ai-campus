import React, { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';

export default function FoundationPath() {
  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    import('./foundationModules').then((mod) => {
      if (mounted) setModules(mod.default);
    });
    return () => { mounted = false; };
  }, []);

  const modulesList = useMemo(() => modules, [modules]);

  if (modulesList.length === 0) return <div className="container mx-auto py-8 px-4 max-w-7xl">Loading modules...</div>;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Foundation Path</h1>
          <p className="text-muted-foreground">Core modules to start your AI journey</p>
        </div>
        <Badge variant="default" className="ml-auto">Free</Badge>
      </div>

      <div className="space-y-4">
        {modulesList.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{module.lessons} lessons</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {module.topics.slice(0, 6).map((topic: string, topicIndex: number) => (
                  <div key={topicIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {topic}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}