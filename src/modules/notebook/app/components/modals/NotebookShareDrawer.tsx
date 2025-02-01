"use client";

import { DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/drawer";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

export default function NotebookShareDrawer({ name }: { name: string }) {
    return <DrawerContent>{onClose => <>
        <DrawerHeader>{name}</DrawerHeader>
        <DrawerBody>
            hi
        </DrawerBody>
        <Divider/>
        <DrawerFooter className="grid grid-cols-2">
            <Button color="danger" variant="flat" onPress={onClose}>
                Close
            </Button>
        </DrawerFooter>
    </>}</DrawerContent>;
}