"use client";

import { Button, ButtonGroupProvider, ButtonProps } from "@nextui-org/button";
import React, { ReactNode } from "react";
import { Modal, ModalProps, useDisclosure } from "@nextui-org/modal";

export interface ModalButtonProps extends ButtonProps {
    modal: ReactNode;
    modalProps?: Partial<Omit<ModalProps, "isOpen" | "onOpenChange">>;
}

export default function ModalButton({
                                        modal,
                                        onPress,
                                        modalProps: {
                                            placement = "top-center",
                                            ...modalProps
                                        } = {},
                                        ...props
                                    }: ModalButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button {...props} onPress={e => {
            onOpen();
            onPress?.(e);
        }}/>
        <ButtonGroupProvider value={undefined as any}>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={placement} {...modalProps}>
                {modal}
            </Modal>
        </ButtonGroupProvider>
    </>
}