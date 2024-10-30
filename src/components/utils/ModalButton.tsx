"use client";

import { Button, ButtonProps } from "@nextui-org/button";
import React, { ReactNode } from "react";
import { Modal, useDisclosure } from "@nextui-org/modal";

export interface ModalButtonProps extends ButtonProps {
    modal: ReactNode;
}

export default function ModalButton({ modal, onPress, ...props }: ModalButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button {...props} onPress={e => {
            onOpen();
            onPress?.(e);
        }}/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
            {modal}
        </Modal>
    </>
}