"use client";

import * as React from "react"
import { Suspense, useMemo, useState } from "react"
import {
    Bell,
    Globe,
    Home,
    Keyboard,
    Link,
    Lock,
    Menu,
    MessageCircle,
    Paintbrush,
    Settings,
    Settings2,
} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, } from "@repo/ui/components/dialog"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    useSidebar,
} from "@repo/ui/components/sidebar"
import { Separator } from "@repo/ui/components/separator";
import dynamic from "next/dynamic";

const data = {
    nav: [
        { name: "Notifications", icon: Bell },
        { name: "Navigation", icon: Menu },
        { name: "Home", icon: Home },
        { name: "Appearance", icon: Paintbrush },
        { name: "Messages & media", icon: MessageCircle },
        { name: "Language & region", icon: Globe },
        { name: "Accessibility", icon: Keyboard },
        // { name: "Mark as read", icon: Check },
        // { name: "Audio & video", icon: Video },
        { name: "Connected accounts", icon: Link },
        { name: "Privacy & visibility", icon: Lock },
        { name: "Advanced", icon: Settings },
    ],
}

const PAGES = {
    'account': {
        name: "Account",
        pages: [
            {
                name: "Connected accounts",
                Icon: Link,
                Component: dynamic(() => import("./settings-connected-accounts"))
            },
            {
                name: "Notifications",
                Icon: Bell,
            },
        ]
    }
}

type PageIdentifier<G extends keyof typeof PAGES = keyof typeof PAGES> = {
    group: G;
    page: number; // keyof typeof PAGES[G]["pages"];
}

export function WorkspaceSettings() {
    const [open, setOpen] = useState(false);
    const { isMobile } = useSidebar();

    const [activeId, setActiveId] = useState<PageIdentifier>({group: "account", page: 0});
    const active = useMemo(() => PAGES[activeId.group].pages[activeId.page]!, [activeId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <SidebarMenuButton>
                    <Settings2/>
                    <span>{"Settings"}</span>
                </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
                <DialogTitle className="sr-only">Settings</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your settings here.
                </DialogDescription>
                <SidebarProvider className="items-start" defaultOpen={isMobile ? [] : ["workspace-settings"]}>
                    <Sidebar name="workspace-settings" className="overflow-y-auto max-h-full">
                        <SidebarContent>
                            {Object.entries(PAGES).map(([group, {name: groupName, pages}]) => <SidebarGroup key={group}>
                                <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
                                <SidebarMenu>
                                    {pages.map(({name, Icon}, index) => (
                                        <SidebarMenuItem key={name}>
                                            <SidebarMenuButton
                                                isActive={activeId.group === group && activeId.page === index}
                                                onClick={() => setActiveId({group: group as keyof typeof PAGES, page: index})}
                                            >
                                                <Icon/>
                                                <span>{name}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroup>)}
                            <SidebarGroup>
                                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {data.nav.map((item) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton asChild>
                                                    <a href="#">
                                                        <item.icon/>
                                                        <span>{item.name}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                        <header
                            className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                {isMobile && <>
                                    <SidebarTrigger name={["workspace-settings"]}/>
                                    <Separator orientation="vertical" className="mr-2 h-4"/>
                                </>}
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbLink href="#">{PAGES[activeId.group].name}</BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block"/>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{active.name}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                            {active.Component
                                ? <Suspense fallback={<div className="bg-muted/50 aspect-video max-w-3xl rounded-xl"/>}>
                                    <active.Component/>
                                </Suspense>
                                : Array.from({ length: 10 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-muted/50 aspect-video max-w-3xl rounded-xl"
                                />
                            ))}
                        </div>
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}
