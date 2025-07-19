import { FC } from "react";
import { AITool } from "@/types/aiTools";
import AIToolCard from "@/components/ai/AIToolCard";

interface Props {
  tools: AITool[];
  onTryTool?: (toolId: number) => void;
  onLearnMore?: (toolId: number) => void;
}

const AIToolsGrid: FC<Props> = ({ tools, onTryTool, onLearnMore }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {tools.map((tool) => (
      <AIToolCard
        key={tool.id}
        tool={tool}
        onTry={onTryTool ? () => onTryTool(tool.id) : undefined}
      />
    ))}
  </div>
);

export default AIToolsGrid;
