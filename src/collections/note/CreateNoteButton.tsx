"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import type React from "react";
import CreateNoteModal from "@/collections/note/CreateNoteModal";

export type CreateNoteButtonProps = CreateNoteButtonPropsWithModal | CreateNoteButtonPropsWithAction;

export type CreateNoteButtonPropsWithModal = { modal: React.ReactNode };
export type CreateNoteButtonPropsWithAction = { action: RequiredCreateNoteAction };

export type RequiredCreateNoteAction = (title: string, content: string) => Promise<string | undefined>;

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
            {modalProvided(props) ? props.modal : <CreateNoteModal action={props.action!}/>}
        </Modal>
    </>;
}

export default CreateNoteButton;