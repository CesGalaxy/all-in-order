"use client"

import * as React from "react"
import {
    Bell,
    CornerUpRight,
    FileText,
    GalleryVerticalEnd,
    LineChart,
    Link,
    LinkIcon,
    MoreHorizontal,
    PenLine,
    Printer,
    Settings,
    Share2,
    Star,
    Trash,
    Trash2,
    Unlink,
} from "lucide-react"

import { Button } from "@repo/ui/components/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@repo/ui/components/dropdown-menu";
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar";
import { toast } from "sonner";
import { QueryData } from "@supabase/supabase-js";
import { getNotebook, getNotebookPage } from "@/modules/notebook/app/queries";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@repo/ui/components/alert-dialog";
import { unlinkNotionPage } from "@/modules/notebook/notion/actions";

const data = [
    [
        { label: "Customize", icon: Settings },
        { label: "Generate PDF", icon: FileText },
        { label: "Print", icon: Printer },
    ],
    [
        { label: "Copy Link", icon: Link },
        { label: "Move to", icon: CornerUpRight },
        { label: "Move to Trash", icon: Trash2 },
    ],
    [
        { label: "View analytics", icon: LineChart },
        { label: "Version History", icon: GalleryVerticalEnd },
        { label: "Show deleted pages", icon: Trash },
        { label: "Notifications", icon: Bell },
    ],
]

export default function NavNotebookPageActions({ notebook, page: {id}, pageTitle }: {
    notebook: QueryData<ReturnType<typeof getNotebook>>,
    page: QueryData<ReturnType<typeof getNotebookPage>>,
    pageTitle: string,
}) {
    return (
        <div className="flex items-center gap-2 text-sm">
            <div className="text-muted-foreground hidden font-medium md:inline-block">
                Edit Oct 08
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Star />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent h-7 w-7">
                        <Share2 />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56 max-w-64" side="bottom" align="end" sideOffset={4}>
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarFallback className="rounded-lg">✏️</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{pageTitle}</span>
                                <span className="truncate text-xs">{notebook.name}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + "/notebooks/" + notebook.id + "/pages/" + id)
                            .then(() => toast.success("Link copied to clipboard!"))
                            .catch(() => toast.error("Failed to copy link!"));
                    }}>
                        <LinkIcon/>
                        Copy Link
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent h-7 w-7">
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56" side="bottom" align="end" sideOffset={4}>
                    <DropdownMenuItem>
                        <PenLine/>
                        Rename
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <LineChart/>
                            View analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <GalleryVerticalEnd/>
                            Version History
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <CornerUpRight/>
                            Move to
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                                    <Unlink/>
                                    Unlink
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Don&#39;t worry, you can always link it back later.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction variant="destructive" onClick={() => unlinkNotionPage(notebook.id, id)
                                        .catch(e => e.message === "NEXT_REDIRECT" ? toast.success("Page unlinked successfully!") : toast.error("Error unlinking page: " + e.message))
                                    }>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
