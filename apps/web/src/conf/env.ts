import { z } from 'zod';

const envSchema = z.object({
    NEXT_PUBLIC_SUPABASE_URL: z.url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NOTION_CLIENT_ID: z.string(),
    NOTION_CLIENT_SECRET: z.string(),
    SUPABASE_SERVICE_ROLE_KEY: z.string(),
});

// type Env = z.infer<typeof envSchema>;

export function validateEnv(env = process.env) {
    const parsedEnv = envSchema.safeParse(env);

    if (!parsedEnv.success) {
        console.error('Invalid environment variables:');
        console.table(parsedEnv.error.issues);
        process.exit(1);
    }
}