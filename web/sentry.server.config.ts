import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://bda1ab9ab0a1a4c47e7ffd4567812156@o4510371617439744.ingest.us.sentry.io/4510371636445184",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === 'development',
});

