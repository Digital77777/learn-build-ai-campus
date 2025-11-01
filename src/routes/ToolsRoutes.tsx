import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoadingScreen } from "@/components/LoadingScreen";

const SmartAnalytics = React.lazy(() => import("@/pages/tools/SmartAnalytics"));
const Data2App = React.lazy(() => import("@/pages/tools/Data2App"));
const AICodeAssistant = React.lazy(() => import("@/pages/tools/AICodeAssistant"));
const NeuralImageGenerator = React.lazy(() => import("@/pages/tools/NeuralImageGenerator"));

export default function ToolsRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}> 
      <Routes>
        <Route path="/" element={<div className="p-6">Select a tool</div>} />
        <Route path="smart-analytics" element={<SmartAnalytics />} />
        <Route path="data2app" element={<Data2App />} />
        <Route path="code-assistant" element={<AICodeAssistant />} />
        <Route path="neural-image" element={<NeuralImageGenerator />} />
      </Routes>
    </Suspense>
  );
}