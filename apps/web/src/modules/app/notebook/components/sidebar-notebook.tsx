import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import ExplorerNavMain from "@/modules/app/explorer/nav-main";
import NavWorkspace from "@/modules/app/explorer/nav-workspace";
import WorkspaceSwitcher from "@/modules/app/explorer/workspace-switcher";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks } from "@/modules/app/notebook/queries";
import { Suspense } from "react";
import { Skeleton } from "@repo/ui/components/skeleton";
import NotebookSwitcher from "@/modules/app/explorer/notebook-switcher";
import NavNotebookContent from "@/modules/app/notebook/components/nav-notebook-content";
import { getMyProfile } from "@/modules/user/auth/server";

export default function SidebarNotebook({ notebookId, workspaceId, workspacesQuery, notebooksQuery, profileQuery, ...props }: {
    notebookId: string,
    workspaceId: string,
    workspacesQuery: ReturnType<typeof getMyWorkspaces>,
    notebooksQuery: ReturnType<typeof getMyNotebooks>,
    profileQuery: ReturnType<typeof getMyProfile>,
} & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" collapsible="icon" {...props}>
            <SidebarHeader>
                <WorkspaceSwitcher currentWorkspaceId={workspaceId} workspacesQuery={workspacesQuery}/>
                <NotebookSwitcher currentNotebookId={notebookId} notebookQuery={notebooksQuery}/>
                <ExplorerNavMain/>
            </SidebarHeader>
            <SidebarContent>
                <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
                    <NavNotebookContent profileQuery={profileQuery}/>
                </Suspense>
            </SidebarContent>
            <SidebarFooter>
                <NavWorkspace/>
            </SidebarFooter>
            <SidebarRail name={props.name}/>
        </Sidebar>
    )
}