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
import { Alert, AlertTitle } from "@repo/ui/components/alert";
import { Sheet, SheetTrigger } from "@repo/ui/components/sheet";
import AddNotionPage from "@/modules/notebook/notion/components/add-notion-page";
import { getNotionPages, notionClientFromUser } from "@/modules/integrations/notion/api";
import { Suspense } from "react";
import Link from "next/link";
import { getNotebookPages } from "@/modules/notebook/app/queries";
import { NotionPageCache } from "@/modules/notebook/notion/types";

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
    // Get the user data
    const {user, error: userError} = await profileQuery;
    if (userError) return <p>Error loading profile</p>;

    // Get the Notion client with user's token
    const notionClient = notionClientFromUser(user);
    if (!notionClient) return <p>Error connecting to Notion</p>;

    // Get all the notebook pages
    const { data: pages, error } = await getNotebookPages(notebookId);
    if (error) return <p>Error getting pages</p>;

    return <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Content</SidebarGroupLabel>
        {!notionClient && <Alert variant="destructive" className="mb-2">
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
                                    <PageItem {...p} notebookId={notebookId}/>
                                </Suspense>)
                                : notionClient
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

async function PageItem({ id, alias, cache, notebookId }: {
    notebookId: string;
} & NonNullable<Awaited<ReturnType<typeof getNotebookPages>>["data"]>[number]) {
    const title = alias || (cache as NotionPageCache | null)?.title;

    if (!title) return <SidebarMenuSubItem key={id} className="text-destructive">Error getting name</SidebarMenuSubItem>;

    return <SidebarMenuSubItem key={id}>
        <SidebarMenuSubButton asChild>
            <Link href={`/notebooks/${notebookId}/p/${id}`}>
                <span>{title}</span>
            </Link>
        </SidebarMenuSubButton>
    </SidebarMenuSubItem>;
}