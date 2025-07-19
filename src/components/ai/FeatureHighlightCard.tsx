import { FC } from "react";

interface FeatureHighlight {
  title: string;
  description: string;
  icon: any;
}

interface Props {
  feature: FeatureHighlight;
}

const FeatureHighlightCard: FC<Props> = ({ feature }) => (
  <div className="text-center">
    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
      <feature.icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-muted-foreground">{feature.description}</p>
  </div>
);

export default FeatureHighlightCard;
