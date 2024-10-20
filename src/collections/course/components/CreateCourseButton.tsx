"use client";

import { Button } from "@nextui-org/button";
import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import type { ReactNode } from "react";
import ModalHandler from "@/components/utils/ModalHandler";

export interface CreateCourseButtonProps {
    modal?: ReactNode;
    action?: CreateCourseModalAction;
}

function CreateCourseButton({ modal, action }: CreateCourseButtonProps) {
    return <ModalHandler modal={modal || <CreateCourseModal action={action}/>}>
        {onOpen => <Button onPress={onOpen} color="primary">Create a course</Button>}
    </ModalHandler>;
}

export default CreateCourseButton;