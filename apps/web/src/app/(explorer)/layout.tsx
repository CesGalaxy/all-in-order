import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";
import { ReactNode } from "react";
import ExplorerSidebarLeft from "@/components/explorer/sidebar-left";
import ExplorerSidebarRight from "@/components/explorer/sidebar-right";

export default function Layout({ children }: { children: ReactNode }) {
    return <SidebarProvider sidebarNames={["left", "right"]}>
        <ExplorerSidebarLeft name="left"/>
        <SidebarInset>
            {children}
        </SidebarInset>
        <ExplorerSidebarRight name="right"/>
    </SidebarProvider>;
}