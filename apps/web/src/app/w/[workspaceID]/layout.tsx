import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import ExplorerSidebarLeft from "@/modules/app/explorer/sidebar-left";
import ExplorerSidebarRight from "@/modules/app/explorer/sidebar-right";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks } from "@/modules/app/notebook/queries";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{workspaceID: string}> }) {
    const { workspaceID } = await params;

    return <SidebarProvider sidebarNames={["left", "right"]}>
        <ExplorerSidebarLeft
            name="left"
            workspaceId={workspaceID}
            workspacesQuery={getMyWorkspaces()}
            notebooksQuery={getMyNotebooks()}
        />
        <SidebarInset>
            {children}
        </SidebarInset>
        <ExplorerSidebarRight name="right"/>
    </SidebarProvider>;
}