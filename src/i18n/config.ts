export const DEFAULT_LOCALE: Locale = 'es';
export const LOCALES = ['en', 'es', 'val'] as const;

export type Locale = typeof LOCALES[number];