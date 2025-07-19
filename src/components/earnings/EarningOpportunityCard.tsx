import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { EarningOpportunity } from "@/types/earnings";

interface Props {
  opportunity: EarningOpportunity;
}


import { memo, useCallback } from "react";
import * as Sentry from "@sentry/react";

const EarningsInfo: FC<{ earnings: string; timeframe: string; color: string }> = memo(({ earnings, timeframe, color }) => (
  <div className="text-center p-4 bg-background rounded-lg border-2 border-success/20" aria-label="Earnings info">
    <div className={`text-2xl font-bold ${color}`}>{earnings}</div>
    <div className="text-sm text-muted-foreground">{timeframe}</div>
  </div>
));

const FeatureList: FC<{ features: string[] }> = memo(({ features }) => (
  <ul className="space-y-1" aria-label="Feature list">
    {features.map((feature, idx) => (
      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-success rounded-full inline-block" aria-hidden="true" />
        {feature}
      </li>
    ))}
  </ul>
));

function sanitizeString(str: unknown, fallback = ""): string {
  return typeof str === "string" ? str : fallback;
}

function sanitizeArray(arr: unknown, fallback: string[] = []): string[] {
  return Array.isArray(arr) && arr.every(item => typeof item === "string") ? arr : fallback;
}


// Example admin check (replace with real auth logic)
const isAdmin = () => {
  // TODO: Replace with real authentication/authorization logic
  return Boolean(localStorage.getItem("isAdmin"));
};

const logAnalyticsEvent = (event: string, data?: Record<string, any>) => {
  // Example: send to Google Analytics, Plausible, or your own endpoint
  // window.gtag?.("event", event, data);
  // For now, just log to console
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.log("[analytics]", event, data);
  }
};

const EarningOpportunityCard: FC<Props> = memo(({ opportunity }) => {
  // Validate and sanitize all fields from backend
  const title = sanitizeString(opportunity.title);
  const description = sanitizeString(opportunity.description);
  const earnings = sanitizeString(opportunity.earnings);
  const timeframe = sanitizeString(opportunity.timeframe);
  const difficulty = sanitizeString(opportunity.difficulty);
  const color = sanitizeString(opportunity.color);
  const features = sanitizeArray(opportunity.features);
  const Icon = opportunity.icon;

  const handleGetStarted = useCallback(() => {
    try {
      Sentry.addBreadcrumb({
        category: "marketplace.action",
        message: `Get Started clicked for: ${title}`,
        level: "info",
      });
      logAnalyticsEvent("marketplace_get_started", { title });
      // Place your actual click logic here (e.g., navigation, modal, etc.)
    } catch (err) {
      Sentry.captureException(err);
    }
  }, [title]);

  const handleEdit = useCallback(() => {
    // Placeholder: open admin modal, navigate, etc.
    logAnalyticsEvent("marketplace_edit_opportunity", { title });
    alert(`Edit opportunity: ${title}`);
  }, [title]);

  return (
    <Card
      className="hover:shadow-ai transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Earning opportunity: ${title}`}
      tabIndex={0}
      role="region"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg bg-gradient-earn`} aria-label="Opportunity icon">
            {Icon && <Icon className="h-6 w-6 text-white" aria-hidden="true" />}
          </div>
          <Badge variant="secondary" aria-label={`Difficulty: ${difficulty}`}>{difficulty}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <EarningsInfo earnings={earnings} timeframe={timeframe} color={color} />
        <div>
          <h4 className="font-medium mb-2">What you get:</h4>
          <FeatureList features={features} />
        </div>
        <Button className="w-full" variant="earn" aria-label={`Get started with ${title}`} onClick={handleGetStarted}> 
          Get Started
        </Button>
        {isAdmin() && (
          <Button className="w-full mt-2" variant="outline" aria-label={`Edit ${title}`} onClick={handleEdit}>
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

export default EarningOpportunityCard;
