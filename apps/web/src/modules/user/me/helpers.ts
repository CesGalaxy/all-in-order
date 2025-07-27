import { UserIdentity } from "@supabase/supabase-js";

export function userHasNotionLinked(identities: UserIdentity[]) {
    return !identities.some(identity => identity.provider === "notion");
}