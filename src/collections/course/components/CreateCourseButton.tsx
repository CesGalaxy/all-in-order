import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import type { ReactNode } from "react";
import ModalButton from "@/components/utils/ModalButton";
import { IconPlus } from "@tabler/icons-react";

export interface CreateCourseButtonProps {
    modal?: ReactNode;
    action?: CreateCourseModalAction;
}

function CreateCourseButton({ modal, action }: CreateCourseButtonProps) {
    return <ModalButton
        modal={modal || <CreateCourseModal action={action}/>}
        color="primary"
        startContent={<IconPlus/>}
    >
        Create a course
    </ModalButton>;
}

export default CreateCourseButton;