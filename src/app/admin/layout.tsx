import { ReactNode, Suspense } from "react";
import RefineProvider from "@/app/admin/_reactivity/providers/RefineProvider";
import authProviderServer from "@/app/admin/_app/providers/auth/server";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: ReactNode }) {
    const hasAuth = await authProviderServer().then(a => a.check());
    if (!hasAuth.authenticated) redirect("/login");
    console.log(hasAuth)

    return <Suspense>
        <RefineProvider>
            {children}
        </RefineProvider>
    </Suspense>;
}