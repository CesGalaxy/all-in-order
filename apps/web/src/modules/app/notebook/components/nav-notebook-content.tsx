"use server";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@repo/ui/components/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/collapsible";
import {
    AlertCircleIcon,
    BookOpen,
    BotMessageSquare,
    ChevronRight,
    NotebookText,
    PencilLine,
    Plus
} from "lucide-react";
import { getMyProfile } from "@/modules/user/auth/server";
import { isNotionLinked } from "@/modules/user/auth/utils";
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { Sheet, SheetTrigger } from "@repo/ui/components/sheet";
import AddNotionPage from "@/modules/app/notebook/components/add-notion-page";
import { getNotionClient, getNotionPages } from "@/modules/integrations/notion/api";
import { Suspense } from "react";
import Link from "next/link";
import { getPageTitle } from "@/modules/integrations/notion/utils";
import { getNotebookPages } from "@/modules/app/notebook/queries";
import { Client } from "@notionhq/client";

const items = [
    {
        title: "Canvas",
        url: "#",
        icon: PencilLine,
        items: [
            {
                title: "Genesis",
                url: "#",
            },
            {
                title: "Explorer",
                url: "#",
            },
            {
                title: "Quantum",
                url: "#",
            },
        ],
    },
    {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    },
    {
        title: "Chats",
        url: "#",
        icon: BotMessageSquare,
        items: [
            {
                title: "Introduction",
                url: "#",
            },
            {
                title: "Get Started",
                url: "#",
            },
            {
                title: "Tutorials",
                url: "#",
            },
            {
                title: "Changelog",
                url: "#",
            },
        ],
    }
];

export default async function NavNotebookContent({ profileQuery, notebookId }: {
    profileQuery: ReturnType<typeof getMyProfile>;
    notebookId: string;
}) {
    const { user, error: userError } = await profileQuery;
    if (userError) return <p>Error loading profile</p>;

    const notionLinked = isNotionLinked(user.identities);

    const { data: pages, error } = await getNotebookPages(notebookId);

    if (error) return <p>Error getting pages</p>;

    const notionClient = getNotionClient(user.app_metadata!.notion_access_token);

    return <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Content</SidebarGroupLabel>
        {!notionLinked && <Alert variant="destructive" className="mb-2">
            <AlertCircleIcon/>
            <AlertTitle className="line-clamp-2">You haven&#39;t connected your Notion account yet!</AlertTitle>
        </Alert>}
        <SidebarMenu>
            <Collapsible
                asChild
                defaultOpen={true}
                className="group/collapsible"
            >
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild className="">
                        <SidebarMenuButton>
                            <ChevronRight
                                className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-focus-within/menu-item:flex group-hover/menu-item:flex data-[state=open]:flex hidden"/>
                            <NotebookText
                                className="group-focus-within/menu-item:hidden group-hover/menu-item:hidden data-[state=open]:hidden"/>
                            <span>Pages</span>
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <Sheet>
                        <SheetTrigger asChild>
                            <SidebarMenuAction className="right-2" showOnHover>
                                <Plus/>
                            </SidebarMenuAction>
                        </SheetTrigger>
                        <Suspense>
                            <AddNotionPage
                                pagesQuery={getNotionPages(notionClient)}
                                notebookId={notebookId}
                            />
                        </Suspense>
                    </Sheet>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {pages
                                ? pages.map(p => <Suspense key={p.id}>
                                    <PageItem {...p} notebookId={notebookId} notionClient={notionClient}/>
                                </Suspense>)
                                : notionLinked
                                    ? <p className="text-muted-foreground text-sm">There are no pages yet.</p>
                                    : <Alert>
                                        <AlertTitle className="line-clamp-2">Connect your Notion account for linking
                                            pages!</AlertTitle>
                                    </Alert>
                            }
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
            {items.map((item) => (
                <Collapsible
                    key={item.title}
                    asChild
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild className="">
                            <SidebarMenuButton>
                                <ChevronRight
                                    className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-focus-within/menu-item:flex group-hover/menu-item:flex data-[state=open]:flex hidden"/>
                                {item.icon && <item.icon
                                    className="group-focus-within/menu-item:hidden group-hover/menu-item:hidden data-[state=open]:hidden"/>}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <SidebarMenuAction className="right-2" showOnHover>
                            <Plus/>
                        </SidebarMenuAction>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                    <SidebarMenuSubItem key={subItem.title}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={subItem.url}>
                                                <span>{subItem.title}</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            ))}
        </SidebarMenu>
    </SidebarGroup>;
}

async function PageItem({ id, alias, cache, notebookId, notionClient }: {
    notebookId: string;
    notionClient: Client;
} & NonNullable<Awaited<ReturnType<typeof getNotebookPages>>["data"]>[number]) {
    const isCacheValid = cache !== null && typeof cache === "object" && "properties" in cache && typeof cache.properties === "object";

    let title = alias;
    if (!title && isCacheValid) title = getPageTitle(cache as never);
    if (!title) {
        try {
            const page = await notionClient.pages.retrieve({ page_id: id });
            if (!("properties" in page)) return <SidebarMenuSubItem key={id} className="text-destructive">Page not
                found</SidebarMenuSubItem>;
            title = getPageTitle(page as never) || "Can't get title";
        } catch {
            return <SidebarMenuSubItem key={id} className="text-destructive">Error getting name</SidebarMenuSubItem>
        }
    }

    return <SidebarMenuSubItem key={id}>
        <SidebarMenuSubButton asChild>
            <Link href={`/notebooks/${notebookId}/p/${id}`}>
                <span>{title}</span>
            </Link>
        </SidebarMenuSubButton>
    </SidebarMenuSubItem>;
}