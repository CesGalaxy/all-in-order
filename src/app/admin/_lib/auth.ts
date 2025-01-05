import { redirect } from "next/navigation";
import authProviderServer from "@/app/admin/_app/providers/auth/server";

export async function getAdminAuth() {
    const hasAuth = await authProviderServer().then(a => a.check());
    if (!hasAuth.authenticated) redirect("/login");
    return hasAuth;
}