import { type UserIdentity } from "@supabase/supabase-js";

export const isNotionLinked = (identities?: UserIdentity[]) => identities?.some(identity => identity.provider === "notion") || false;

export const buildAuthRedirectUrl = (next: string = "") => window.location.origin + "/auth/callback?next=" + encodeURIComponent(next);