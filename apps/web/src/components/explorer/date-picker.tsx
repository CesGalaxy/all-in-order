import { Calendar } from "@repo/ui/components/calendar"
import { SidebarGroup, SidebarGroupContent, } from "@repo/ui/components/sidebar"

export default function ExplorerDatePicker() {
    return (
        <SidebarGroup className="px-0">
            <SidebarGroupContent>
                <Calendar
                    className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"/>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
