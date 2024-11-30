"use client";

import { Modal, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { type ReactNode } from "react";
import CreatePracticeModal, {
    RequiredCreatePracticeAction
} from "@/collections/practice/components/modals/CreatePracticeModal";

export type CreatePracticeButtonProps = CreatePracticeButtonPropsWithAction | CreatePracticeButtonPropsWithModal;

export type CreatePracticeButtonPropsWithAction = { action: RequiredCreatePracticeAction; }
export type CreatePracticeButtonPropsWithModal = { modal: ReactNode; }

function modalProvided(props: CreatePracticeButtonProps): props is CreatePracticeButtonPropsWithModal {
    return props.hasOwnProperty("modal");
}

export default function CreatePracticeButton(props: CreatePracticeButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button onPress={onOpen} color="primary">Create a new practice</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            {modalProvided(props) ? props.modal : <CreatePracticeModal action={props.action}/>}
        </Modal>
    </>;
}