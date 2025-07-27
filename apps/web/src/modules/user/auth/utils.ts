import { UserIdentity } from "@supabase/supabase-js";

export const isNotionLinked = (identities?: UserIdentity[]) => identities?.some(identity => identity.provider === "notion") || false;