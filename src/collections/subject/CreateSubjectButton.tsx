"use client";

import { Button } from "@nextui-org/button";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal from "@/collections/subject/CreateSubjectModal";
import type { ReactNode } from "react";

export type CreateSubjectButtonProps = {
    action: (name: string, description: string, color: number) => Promise<string | undefined>;
} | {
    courseId: number;
} | {
    modal: ReactNode;
}

function CreateSubjectButton(props: CreateSubjectButtonProps) {
    return <ModalHandler modal={"modal" in props ? props.modal : <CreateSubjectModal {...props}/>}>
        {onOpen => <Button onPress={onOpen} color="primary">Create a subject</Button>}
    </ModalHandler>;
}

export default CreateSubjectButton;