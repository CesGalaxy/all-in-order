"use client";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import useNotebookPage from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookPage";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { IconAdjustments } from "@tabler/icons-react";
import { useDisclosure } from "@nextui-org/modal";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@nextui-org/drawer";
import type { Camelize, FileObjectV2 } from "@supabase/storage-js";
import { Divider } from "@nextui-org/divider";
import TodoInfo from "@/components/dev/TodoInfo";

export default function NbPageNavbar({ file }: { file: Camelize<FileObjectV2> }) {
    const { saveContent } = useNotebookPage();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    console.log(file)

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
            <DrawerContent>{onClose => <>
                <DrawerHeader>{name}</DrawerHeader>
                <DrawerBody>
                    <TodoInfo>Add page options</TodoInfo>
                </DrawerBody>
                <Divider/>
                <DrawerFooter className="grid grid-cols-2">
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onPress={onClose}>
                        Save
                    </Button>
                </DrawerFooter>
            </>}</DrawerContent>
        </Drawer>
    </>;
}