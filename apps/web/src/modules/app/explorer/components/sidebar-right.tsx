import * as React from "react"
import { Suspense } from "react"
import { Plus } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@repo/ui/components/sidebar"
import ExplorerNavUser from "@/modules/app/explorer/components/nav-user";
import ExplorerDatePicker from "@/modules/app/explorer/components/date-picker";
import ExplorerCalendars from "@/modules/app/explorer/components/calendars";
import { getMyProfile } from "@/modules/user/auth/server";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    calendars: [
        {
            name: "My Calendars",
            items: ["Personal", "Work", "Family"],
        },
        {
            name: "Favorites",
            items: ["Holidays", "Birthdays"],
        },
        {
            name: "Other",
            items: ["Travel", "Reminders", "Deadlines"],
        },
    ],
}

export default function ExplorerSidebarRight({
                                                 ...props
                                             }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            side="right"
            collapsible="offcanvas"
            // variant="floating"
            // className="sticky hidden lg:flex top-0 h-svh border-l"
            {...props}
        >
            <SidebarHeader className="h-16 border-b border-sidebar-border">
                <Suspense>
                    <ExplorerNavUser query={getMyProfile()}/>
                </Suspense>
            </SidebarHeader>
            <SidebarContent>
                <ExplorerDatePicker/>
                <SidebarSeparator className="mx-0"/>
                <ExplorerCalendars calendars={data.calendars}/>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Plus/>
                            <span>New Calendar</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
