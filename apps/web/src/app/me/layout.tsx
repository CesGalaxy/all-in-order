"use server";

import { ReactNode, Suspense } from "react";
import { MeAppSidebar } from "@/modules/user/me/components/me-app-sidebar";
import { getMyProfile } from "@/modules/user/auth/server";
import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";

export default async function Layout({children}: {children: ReactNode}) {
    return <SidebarProvider sidebarNames={["me-sidebar"]}>
        <Suspense>
            <MeAppSidebar name="me-sidebar" userQuery={getMyProfile()}/>
        </Suspense>
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>;
}