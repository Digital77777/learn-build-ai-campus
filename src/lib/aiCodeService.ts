function sanitizeInput(input: string): string {
  // Remove script tags and dangerous HTML
  return input.replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/<.*?on\w+=.*?>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}
// Simplified AI service without external dependencies

export interface CodeAnalysisResult {
  suggestions: string;
  bugs: string[];
  improvements: string[];
  refactoredCode?: string;
  complexity: number;
  maintainability: number;
}

export interface CodeCompletionResult {
  completions: string[];
  confidence: number;
}

const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

class AICodeService {
  private async makeRequest(prompt: string, maxTokens: number = 500): Promise<string> {
    // Try Hugging Face first
    if (HUGGINGFACE_API_KEY) {
      try {
        const response = await fetch('https://api-inference.huggingface.co/models/bigcode/starcoder', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: maxTokens } })
        });
        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
          return data[0].generated_text;
        }
      } catch (err) {
        console.error('Hugging Face API error:', err);
      }
    }

    // Fallback to OpenAI if available
    if (OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo-instruct',
            prompt,
            max_tokens: maxTokens
          })
        });
        const data = await response.json();
        if (data && data.choices && data.choices[0] && data.choices[0].text) {
          return data.choices[0].text;
        }
      } catch (err) {
        console.error('OpenAI API error:', err);
      }
    }

    // Fallback to mock response if no API keys or error
    return this.getMockResponse(prompt);
  }

  private getMockResponse(prompt: string): string {
    if (prompt.includes('complete')) {
      return `// AI Suggestion: Complete the function
function calculateFactorial(n) {
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
}`;
    }
    
    if (prompt.includes('debug')) {
      return `🐛 Issues Found:
1. No input validation - accepts any type
2. Stack overflow risk for large numbers
3. Missing error handling

✅ Fixes:
- Add type checking
- Use iterative approach
- Add proper error handling`;
    }
    
    return `🔄 Refactoring Suggestions:
1. Extract validation logic
2. Add JSDoc comments
3. Consider memoization
4. Add unit tests`;
  }

  async analyzeCode(code: string, analysisType: 'completion' | 'debug' | 'refactor'): Promise<CodeAnalysisResult> {
    const sanitizedCode = sanitizeInput(code);
    const prompts = {
      completion: `Complete and improve this code with best practices:\n\n${sanitizedCode}\n\nProvide the complete improved version:`,
      debug: `Analyze this code for bugs, security issues, and potential problems:\n\n${sanitizedCode}\n\nList specific issues and solutions:`,
      refactor: `Refactor this code for better readability, performance, and maintainability:\n\n${sanitizedCode}\n\nProvide refactoring suggestions:`
    };

    const result = await this.makeRequest(prompts[analysisType]);
    
    return {
      suggestions: result,
      bugs: this.extractBugs(result),
      improvements: this.extractImprovements(result),
      refactoredCode: analysisType === 'refactor' ? this.extractCode(result) : undefined,
      complexity: this.calculateComplexity(code),
      maintainability: this.calculateMaintainability(code)
    };
  }

  async getCodeCompletion(code: string, cursorPosition: number): Promise<CodeCompletionResult> {
    const beforeCursor = sanitizeInput(code.substring(0, cursorPosition));
    const afterCursor = sanitizeInput(code.substring(cursorPosition));
    
    const prompt = `Complete this code at the cursor position:\n\nBefore cursor:\n${beforeCursor}\n\nAfter cursor:\n${afterCursor}\n\nProvide completion:`;
    
    const result = await this.makeRequest(prompt, 100);
    
    return {
      completions: [result.trim()],
      confidence: 0.85
    };
  }

  async explainCode(code: string): Promise<string> {
    const prompt = `Explain what this code does in simple terms:\n\n${code}\n\nExplanation:`;
    return await this.makeRequest(prompt, 300);
  }

  async generateTests(code: string): Promise<string> {
    const prompt = `Generate comprehensive unit tests for this code:\n\n${code}\n\nTests:`;
    return await this.makeRequest(prompt, 400);
  }

  private extractBugs(analysis: string): string[] {
    const bugPattern = /(?:bug|issue|problem|error):\s*(.+)/gi;
    const matches = analysis.match(bugPattern) || [];
    return matches.map(match => match.replace(/(?:bug|issue|problem|error):\s*/i, '').trim());
  }

  private extractImprovements(analysis: string): string[] {
    const improvementPattern = /(?:improve|suggestion|recommendation):\s*(.+)/gi;
    const matches = analysis.match(improvementPattern) || [];
    return matches.map(match => match.replace(/(?:improve|suggestion|recommendation):\s*/i, '').trim());
  }

  private extractCode(text: string): string {
    const codeBlockPattern = /```[\w]*\n([\s\S]*?)\n```/g;
    const match = codeBlockPattern.exec(text);
    return match ? match[1] : text;
  }

  private calculateComplexity(code: string): number {
    // Simple complexity calculation based on cyclomatic complexity
    const complexityKeywords = ['if', 'else', 'while', 'for', 'switch', 'case', 'catch', '&&', '||'];
    let complexity = 1; // Base complexity
    
    complexityKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = code.match(regex);
      if (matches) complexity += matches.length;
    });
    
    return Math.min(complexity, 10); // Cap at 10
  }

  private calculateMaintainability(code: string): number {
    const lines = code.split('\n').filter(line => line.trim());
    const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / lines.length;
    const hasComments = code.includes('//') || code.includes('/*');
    const hasFunctions = code.includes('function') || code.includes('=>');
    
    let score = 10;
    if (avgLineLength > 80) score -= 2;
    if (!hasComments && lines.length > 10) score -= 2;
    if (!hasFunctions && lines.length > 20) score -= 1;
    
    return Math.max(score, 1);
  }
}

export const aiCodeService = new AICodeService();