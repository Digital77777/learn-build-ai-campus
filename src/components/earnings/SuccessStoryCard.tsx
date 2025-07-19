import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { FC } from "react";

interface SuccessStory {
  name: string;
  university: string;
  earnings: string;
  timeframe: string;
  story: string;
}

interface Props {
  story: SuccessStory;
}

const SuccessStoryCard: FC<Props> = ({ story }) => (
  <Card className="bg-background border-success/20">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-earn rounded-full flex items-center justify-center">
          <Star className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="font-semibold">{story.name}</div>
          <div className="text-sm text-muted-foreground">{story.university}</div>
        </div>
      </div>
      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-success">{story.earnings}</div>
        <div className="text-sm text-muted-foreground">{story.timeframe}</div>
      </div>
      <p className="text-sm text-muted-foreground italic">"{story.story}"</p>
    </CardContent>
  </Card>
);

export default SuccessStoryCard;
