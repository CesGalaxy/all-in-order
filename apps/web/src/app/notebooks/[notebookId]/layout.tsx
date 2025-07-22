import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import ExplorerSidebarLeft from "@/modules/app/explorer/sidebar-left";
import ExplorerSidebarRight from "@/modules/app/explorer/sidebar-right";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks, getNotebook } from "@/modules/app/notebook/queries";
import { notFound } from "next/navigation";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{notebookId: string}> }) {
    const { notebookId } = await params;

    const workspacesQuery = getMyWorkspaces();
    const notebooksQuery = getMyNotebooks();

    const {data, error} = await getNotebook(notebookId);

    if (error) return <p>Error</p>;
    if (!data) notFound();

    return <SidebarProvider sidebarNames={["left", "right"]}>
        <ExplorerSidebarLeft
            name="left"
            workspaceId={data.workspace.id}
            workspacesQuery={workspacesQuery}
            notebooksQuery={notebooksQuery}
        />
        <SidebarInset>
            {children}
        </SidebarInset>
        <ExplorerSidebarRight name="right"/>
    </SidebarProvider>;
}