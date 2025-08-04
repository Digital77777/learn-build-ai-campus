import React, { useCallback, useEffect, useState } from 'react';
// Simplified code editor without CodeMirror dependencies
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Code, Copy, Download, Upload, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (language: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'jsx', label: 'React JSX' },
];

const sampleCode = {
  javascript: `function calculateFactorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

// Test the function
console.log(calculateFactorial(5)); // 120`,
  
  python: `def calculate_factorial(n):
    if n < 0:
        return None
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

# Test the function
print(calculate_factorial(5))  # 120`,
  
  typescript: `function calculateFactorial(n: number): number | undefined {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * calculateFactorial(n - 1);
}

// Test the function
console.log(calculateFactorial(5)); // 120`,
  
  jsx: `import React, { useState } from 'react';

function FactorialCalculator() {
  const [number, setNumber] = useState(5);
  const [result, setResult] = useState(120);

  const calculateFactorial = (n) => {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1;
    return n * calculateFactorial(n - 1);
  };

  const handleCalculate = () => {
    setResult(calculateFactorial(number));
  };

  return (
    <div>
      <input 
        type="number" 
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
      />
      <button onClick={handleCalculate}>Calculate</button>
      <p>Result: {result}</p>
    </div>
  );
}`
};

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  onLanguageChange,
  placeholder = "Enter your code here...",
  readOnly = false,
  theme = 'light'
}) => {
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');

  const currentLanguage = languages.find(lang => lang.value === language) || languages[0];

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value);
    toast.success('Code copied to clipboard!');
  }, [value]);

  const handleDownload = useCallback(() => {
    const fileExtensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      jsx: 'jsx'
    };
    
    const extension = fileExtensions[language as keyof typeof fileExtensions] || 'txt';
    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Code downloaded!');
  }, [value, language]);

  const handleLoadSample = useCallback(() => {
    const sample = sampleCode[language as keyof typeof sampleCode] || sampleCode.javascript;
    onChange(sample);
    toast.success('Sample code loaded!');
  }, [language, onChange]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
        toast.success('File uploaded successfully!');
      };
      reader.readAsText(file);
    }
  }, [onChange]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Code className="h-5 w-5" />
            Code Editor
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {value.split('\n').length} lines
            </Badge>
            <Badge variant="outline" className="text-xs">
              {value.length} chars
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-1">
            <input
              type="file"
              accept=".js,.ts,.py,.jsx,.tsx,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
              title="Upload file"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLoadSample}
              title="Load sample code"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              title="Copy code"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              title="Download code"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="border rounded-lg overflow-hidden">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            readOnly={readOnly}
            className="w-full h-96 p-4 font-mono text-sm resize-none border-0 focus:outline-none bg-background text-foreground"
            style={{ minHeight: '300px' }}
          />
        </div>
      </CardContent>
    </Card>
  );
};