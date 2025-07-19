
import * as Sentry from "@sentry/react";
import "./sentry.client";

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<p>Something went wrong. Our team has been notified.</p>}>
    <App />
  </Sentry.ErrorBoundary>
);
