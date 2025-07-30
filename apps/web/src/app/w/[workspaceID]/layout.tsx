import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { type ReactNode } from "react";
import SidebarWorkspace from "@/modules/app/workspace/components/sidebar-workspace";
import ExplorerSidebarRight from "@/modules/app/explorer/sidebar-right";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks } from "@/modules/app/notebook/queries";

export default async function Layout({ children, params }: {
    children: ReactNode,
    params: Promise<{ workspaceID: string }>
}) {
    const { workspaceID } = await params;

    return <SidebarProvider sidebarNames={["left", "right"]}>
        <SidebarWorkspace
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