"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

export default function CreatePracticeButton({ children }: { children: React.ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button onPress={onOpen} color="primary">Create a new practice</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            {children}
        </Modal>
    </>;
}