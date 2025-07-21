import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import ExplorerSidebarLeft from "@/modules/app/explorer/sidebar-left";
import ExplorerSidebarRight from "@/modules/app/explorer/sidebar-right";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{workspaceID: string}> }) {
    const { workspaceID } = await params;

    return <SidebarProvider sidebarNames={["left", "right"]}>
        <ExplorerSidebarLeft name="left" workspaceId={workspaceID}/>
        <SidebarInset>
            {children}
        </SidebarInset>
        <ExplorerSidebarRight name="right"/>
    </SidebarProvider>;
}