import * as Sentry from "@sentry/astro"

Sentry.init({
  dsn: "https://98644a47b4816c666cf2e43c3bf60cc9@o4508647123910656.ingest.de.sentry.io/4509060556128336",
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.05,
  replaysOnErrorSampleRate: 1.0
})
