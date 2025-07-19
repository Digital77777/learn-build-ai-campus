import { render, screen } from "@testing-library/react";
import EarningOpportunityCard from "./EarningOpportunityCard";
import { Coins } from "lucide-react";
import React from "react";

describe("EarningOpportunityCard", () => {
  const opportunity = {
    title: "Freelance AI Projects",
    description: "Complete AI projects for real clients while building your portfolio",
    earnings: "$200-$2,000",
    timeframe: "per project",
    difficulty: "Beginner",
    icon: Coins,
    features: ["Guided project matching", "Skill verification"],
    color: "text-emerald-600"
  };

  it("renders all fields and is accessible", () => {
    render(<EarningOpportunityCard opportunity={opportunity} />);
    expect(screen.getByRole("region", { name: /freelance ai projects/i })).toBeInTheDocument();
    expect(screen.getByText(/freelance ai projects/i)).toBeInTheDocument();
    expect(screen.getByText(/complete ai projects/i)).toBeInTheDocument();
    expect(screen.getByText(/\$200-\$2,000/)).toBeInTheDocument();
    expect(screen.getByText(/per project/)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty: beginner/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/earnings info/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/feature list/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started with freelance ai projects/i })).toBeInTheDocument();
  });
});
