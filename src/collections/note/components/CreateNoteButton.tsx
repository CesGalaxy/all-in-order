"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import type React from "react";
import CreateNoteModal, { type RequiredCreateNoteAction } from "@/collections/note/components/modals/CreateNoteModal";

export type CreateNoteButtonProps = CreateNoteButtonPropsWithModal | CreateNoteButtonPropsWithAction;

export type CreateNoteButtonPropsWithModal = { modal: React.ReactNode };
export type CreateNoteButtonPropsWithAction = { action: RequiredCreateNoteAction };

function modalProvided(props: CreateNoteButtonProps): props is CreateNoteButtonPropsWithModal {
    return props.hasOwnProperty("modal");
}

function CreateNoteButton(props: CreateNoteButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button onPress={onOpen} color="primary">Create a note</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            {modalProvided(props) ? props.modal : <CreateNoteModal action={props.action}/>}
        </Modal>
    </>;
}

export default CreateNoteButton;