import * as Sentry from '@sentry/bun';
import { env } from './env';

export const initializeSentry = () => {
  if (!env.SENTRY_DSN) {
    console.log('⚠️  Sentry DSN not configured, skipping initialization');
    return;
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV || 'development',
    
    // Set sample rate for performance monitoring
    // In production, sample 10% of transactions to reduce costs
    tracesSampleRate: env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Track all experiments as releases
    release: `daytona-hack-api@${process.env.npm_package_version || '1.0.0'}`,
    
    // Add context about the system
    initialScope: {
      tags: {
        service: 'api',
        runtime: 'bun',
      },
    },

    // Ignore certain common errors that aren't actionable
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      'AbortError',
    ],

    // Filter events before sending
    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (env.NODE_ENV === 'development' && !process.env.SENTRY_ENABLED) {
        console.log('🔍 Sentry (dev mode):', event.message || event.exception?.values?.[0]?.value);
        return null;
      }
      return event;
    },
  });

  console.log('✅ Sentry initialized');
};

/**
 * Set experiment context for all subsequent Sentry events
 */
export const setExperimentContext = (experimentId: string, data: Record<string, any>) => {
  Sentry.setContext('experiment', {
    id: experimentId,
    ...data,
  });
};

/**
 * Set variant context for all subsequent Sentry events
 */
export const setVariantContext = (variantId: string, data: Record<string, any>) => {
  Sentry.setContext('variant', {
    id: variantId,
    ...data,
  });
};

/**
 * Set code agent context for all subsequent Sentry events
 */
export const setCodeAgentContext = (agentId: string, data: Record<string, any>) => {
  Sentry.setContext('codeAgent', {
    id: agentId,
    ...data,
  });
};

/**
 * Add breadcrumb for tracking user actions
 */
export const addBreadcrumb = (message: string, category: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level: 'info',
    data,
    timestamp: Date.now() / 1000,
  });
};

/**
 * Capture exception with additional context
 */
export const captureException = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    contexts: context,
  });
};

/**
 * Capture message for non-error events
 */
export const captureMessage = (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
  Sentry.captureMessage(message, level);
};

// Export Sentry for direct use when needed
export { Sentry };

