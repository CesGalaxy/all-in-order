"use client";

import { Modal, useDisclosure } from "@heroui/modal";
import type { ReactNode } from "react";

export interface ModalHandlerProps {
    // Children will receive a function to open the modal
    children: (onOpen: () => void) => ReactNode;
    modal: ReactNode;
}

function ModalHandler({ children, modal }: ModalHandlerProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        {children(onOpen)}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            {modal}
        </Modal>
    </>;
}

export default ModalHandler;
