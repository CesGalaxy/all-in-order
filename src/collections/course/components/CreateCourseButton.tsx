"use client";

import { Button } from "@nextui-org/button";
import CreateCourseModal from "@/collections/course/components/modals/CreateCourseModal";
import type { ReactNode } from "react";
import ModalHandler from "@/components/utils/ModalHandler";

function CreateCourseButton({ modal }: { modal?: ReactNode }) {
    return <ModalHandler modal={modal || <CreateCourseModal/>}>
        {onOpen => <Button onPress={onOpen} color="primary">Create a course</Button>}
    </ModalHandler>;
}

export default CreateCourseButton;