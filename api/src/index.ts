import { experimentRoutes } from '@/service/experiment/Experiment.service';
import { Elysia } from 'elysia';
import { logger } from '@bogeychan/elysia-logger';
import { inngestHandler } from '@/lib/inngest';
import cors from '@elysiajs/cors';
import { initializeSentry, Sentry } from '@/lib/sentry';

// Initialize Sentry as early as possible
initializeSentry();

const port = 8000;

const app = new Elysia()
  .use(
    logger({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    })
  )
  // Global error handler - capture all errors in Sentry
  .onError(({ error, code, set, request }) => {
    // Capture the error in Sentry with context
    Sentry.captureException(error, {
      tags: {
        errorCode: code,
        path: new URL(request.url).pathname,
        method: request.method,
      },
      contexts: {
        request: {
          url: request.url,
          method: request.method,
          headers: Object.fromEntries(request.headers.entries()),
        },
      },
    });

    console.error('❌ Error:', error);
    
    // Return appropriate error response
    set.status = code === 'NOT_FOUND' ? 404 : 500;
    
    return {
      error: code === 'NOT_FOUND' ? 'Not Found' : 'Internal Server Error',
      message: error.message,
      code,
    };
  })
  .get('/', () => 'Hello World')
  .use(
    cors({
      origin: true, // Allow all origins in development
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
      ],
      preflight: true,
    })
  )
  .get('/health', () => 'OK')
  // Test endpoint to verify Sentry is working
  .get('/sentry-test', () => {
    // This will throw an error and be captured by Sentry
    throw new Error('Test error for Sentry integration');
  })
  .use(experimentRoutes)
  .use(inngestHandler)
  .listen(port, ({ hostname, port }) => {
    console.log(`🦊 API is running at ${hostname}:${port}`);
  });
