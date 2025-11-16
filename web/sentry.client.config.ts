import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Define tracePropagationTargets to avoid CORS issues
  tracePropagationTargets: [
    "localhost",
    /^http:\/\/localhost:3000/,
    /^http:\/\/localhost:8000/,
  ],
});

