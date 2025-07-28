import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@repo/ui/components/sidebar";
import NavRecentNotebooks from "@/modules/app/explorer/nav-recent-notebooks";
import ExplorerNavMain from "@/modules/app/explorer/nav-main";
import NavWorkspace from "@/modules/app/explorer/nav-workspace";
import WorkspaceSwitcher from "@/modules/app/explorer/workspace-switcher";
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { getMyNotebooks } from "@/modules/app/notebook/queries";
import { Suspense } from "react";
import { Skeleton } from "@repo/ui/components/skeleton";

export default function SidebarWorkspace({ workspaceId, workspacesQuery, notebooksQuery, ...props }: {
    workspaceId: string,
    workspacesQuery: ReturnType<typeof getMyWorkspaces>,
    notebooksQuery: ReturnType<typeof getMyNotebooks>,
} & React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar className="border-r-0" collapsible="icon" {...props}>
            <SidebarHeader>
                <WorkspaceSwitcher currentWorkspaceId={workspaceId} workspacesQuery={workspacesQuery}/>
                <ExplorerNavMain/>
            </SidebarHeader>
            <SidebarContent>
                <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
                    <NavRecentNotebooks notebooksQuery={notebooksQuery} workspaceId={workspaceId}/>
                </Suspense>
                {/*<ExplorerNavSubjects workspaces={data.workspaces}/>*/}
            </SidebarContent>
            <SidebarFooter>
                <NavWorkspace/>
            </SidebarFooter>
            <SidebarRail name={props.name}/>
        </Sidebar>
    )
}