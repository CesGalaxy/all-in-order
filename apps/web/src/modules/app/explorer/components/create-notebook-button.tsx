"use client"

import * as React from "react"
import { useMediaQuery } from "@repo/ui/hooks/use-media-query"
import { Button } from "@repo/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@repo/ui/components/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@repo/ui/components/drawer"
import CreateNotebookForm from "@/modules/notebook/app/components/create-notebook-form";
import { BookPlus } from "lucide-react";
import { SidebarMenuButton } from "@repo/ui/components/sidebar";

export function CreateNotebookButton({workspaceId}: {workspaceId: string}) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <SidebarMenuButton className="text-primary-foreground! transition-all duration-300 bg-gradient-to-r from-primary via-primary to-brand-pink bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%]">
                        <BookPlus/>
                        <span>Create your first notebook</span>
                    </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new notebook</DialogTitle>
                        <DialogDescription>
                            Your current plan only allows you to create up to 3 notebooks per workspace.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateNotebookForm  workspaceId={workspaceId}/>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <SidebarMenuButton className="text-primary-foreground! transition-all duration-300 bg-gradient-to-r from-primary via-primary to-brand-pink bg-[position:_0%_0%] hover:bg-[position:_100%_100%] bg-[size:_200%]">
                    <BookPlus/>
                    <span>Create your first notebook</span>
                </SidebarMenuButton>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Create a new notebook</DrawerTitle>
                    <DrawerDescription>
                        Your current plan only allows you to create up to 3 notebooks per workspace.
                    </DrawerDescription>
                </DrawerHeader>
                <CreateNotebookForm workspaceId="workspaceId" className="px-4"/>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
