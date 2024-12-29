import { redirect } from "next/navigation";
import authProvider from "@/app/admin/_app/providers/auth/auth";

export async function getAdminAuth() {
    const hasAuth = await authProvider.check();
    if (!hasAuth.authenticated) redirect("/login");
    return hasAuth;
}