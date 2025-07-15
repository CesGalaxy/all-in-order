export async function register() {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { validateEnv } = await import('./conf/env');
        console.debug("Validating environment variables...");
        validateEnv();
    }
}