"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import type { ReactNode } from "react";
import { IconPencilPlus } from "@tabler/icons-react";

export default function CreatePracticeActivityButton({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button onPress={onOpen} color="primary" startContent={<IconPencilPlus/>}>Add activity</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="xl"
        >
            {children}
        </Modal>
    </>;
}