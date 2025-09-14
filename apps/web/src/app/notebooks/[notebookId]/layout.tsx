import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks, getNotebook } from "@/modules/notebook/app/queries";
import { notFound } from "next/navigation";
import SidebarNotebook from "@/modules/notebook/app/components/sidebar-notebook";
import { getMyProfile } from "@/modules/user/auth/server";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{notebookId: string}> }) {
    const { notebookId } = await params;

    const workspacesQuery = getMyWorkspaces();
    const notebooksQuery = getMyNotebooks();
    const profileQuery = getMyProfile();

    const {data, error} = await getNotebook(notebookId);

    if (error) return <p>Error</p>;
    if (!data) notFound();

    return <SidebarProvider sidebarNames={["nb-main"]} defaultOpen={["nb-main"]} className="grow max-h-full">
        <SidebarNotebook
            name="nb-main"
            workspaceId={data.workspace.id}
            {...{notebookId, workspacesQuery, notebooksQuery, profileQuery}}
        />
        <SidebarInset>
            {children}
        </SidebarInset>
    </SidebarProvider>;
}