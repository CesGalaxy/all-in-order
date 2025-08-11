import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { type ReactNode } from "react";
import SidebarWorkspace from "@/modules/app/workspace/components/sidebar-workspace";
import ExplorerSidebarRight from "@/modules/app/explorer/components/sidebar-right";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks } from "@/modules/notebook/app/queries";
import { validate, version } from "uuid";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }: {
    children: ReactNode,
    params: Promise<{ workspaceID: string }>
}) {
    const { workspaceID } = await params;

    const isValidId = validate(workspaceID) && version(workspaceID) === 4;
    if (!isValidId) notFound();

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