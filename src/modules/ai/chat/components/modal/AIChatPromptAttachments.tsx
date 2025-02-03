import { PromptAttachment } from "@/modules/ai/chat/components/AIChatPromptInputWithActionsBottom";
import { DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

export default function AIChatPromptAttachments({ attachments }: { attachments: PromptAttachment[] }) {
    return <DrawerContent>{onClose => <>
        <DrawerHeader>Attach files</DrawerHeader>
        <DrawerBody className="">
            hello
        </DrawerBody>
        <DrawerFooter>
            <Button color="danger" startContent={<IconTrash/>} variant="light">Remove all</Button>
            <Button color="primary" startContent={<IconDeviceFloppy/>}>Save</Button>
        </DrawerFooter>
    </>}</DrawerContent>;
}