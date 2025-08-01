import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import ExplorerSidebarRight from "@/modules/app/explorer/sidebar-right";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks, getNotebook } from "@/modules/app/notebook/queries";
import { notFound } from "next/navigation";
import SidebarNotebook from "@/modules/app/notebook/components/sidebar-notebook";
import { getMyProfile } from "@/modules/user/auth/server";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{notebookId: string}> }) {
    const { notebookId } = await params;

    const workspacesQuery = getMyWorkspaces();
    const notebooksQuery = getMyNotebooks();
    const profileQuery = getMyProfile();

    const {data, error} = await getNotebook(notebookId);

    if (error) return <p>Error</p>;
    if (!data) notFound();

    return <SidebarProvider sidebarNames={["left", "right"]}>
        <SidebarNotebook
            name="left"
            workspaceId={data.workspace.id}
            {...{notebookId, workspacesQuery, notebooksQuery, profileQuery}}
        />
        <SidebarInset>
            {children}
        </SidebarInset>
        <ExplorerSidebarRight name="right"/>
    </SidebarProvider>;
}