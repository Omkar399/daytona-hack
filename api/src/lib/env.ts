import z from 'zod';

export const envSchema = z.object({
  DAYTONA_API_KEY: z.string().min(1),
  BROWSER_USE_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  ANTHROPIC_API_KEY: z.string().min(1),
  // Optional Sentry configuration
  SENTRY_DSN: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).optional().default('development'),
});

export const env = envSchema.parse(process.env);
