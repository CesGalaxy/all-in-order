"use client";

import { Modal, useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";
import type { ReactNode } from "react";
import { IconPencilPlus } from "@tabler/icons-react";

export default function CreatePracticeActivityButton({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button
            onPress={onOpen}
            color="primary"
            startContent={<IconPencilPlus className="shrink-0"/>}
        >
            Add activity
        </Button>
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