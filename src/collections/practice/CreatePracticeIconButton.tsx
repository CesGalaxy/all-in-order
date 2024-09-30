"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { IconLayoutGridAdd } from "@tabler/icons-react";

export default function CreatePracticeIconButton({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button
            onPress={onOpen}
            color="primary"
            variant="light"
            startContent={<IconLayoutGridAdd/>}
        >
            New practice
        </Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            {children}
        </Modal>
    </>;
}