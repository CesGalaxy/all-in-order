"use client";

import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import useNotebookPage from "@/modules/notebook/pages/reactivity/hooks/useNotebookPage";
import { Button } from "@heroui/button";
import { toast } from "react-toastify";
import { IconAdjustments } from "@tabler/icons-react";
import { useDisclosure } from "@heroui/modal";
import { Drawer } from "@heroui/drawer";
import type { Camelize, FileObjectV2 } from "@supabase/storage-js";
import NbPageDetailsDrawer from "@/modules/notebook/pages/components/modals/NbPageDetailsDrawer";

export default function NbPageNavbar({ file, path }: { file: Camelize<FileObjectV2>, path: string }) {
    const { saveContent } = useNotebookPage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const name = atob(file.name.split("/")[2].replace(".json", ""));

    return <>
        <Navbar isBordered className="z-0" classNames={{ wrapper: "max-w-full" }}>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Read
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Editor
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Presentation
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="center">
                <Button onPress={async () => {
                    const success = await saveContent();
                    if (success) toast("Saved successfully!", { type: "success" });
                    else toast("Failed to save!", { type: "error" });
                }}>
                    Save
                </Button>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Share</Link>
                </NavbarItem>
                <Button isIconOnly variant="light" onPress={onOpen}>
                    <IconAdjustments/>
                </Button>
            </NavbarContent>
        </Navbar>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled
                hideCloseButton>
            <NbPageDetailsDrawer name={name}/>
        </Drawer>
    </>;
}