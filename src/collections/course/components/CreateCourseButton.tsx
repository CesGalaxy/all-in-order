import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import ModalButton from "@/components/utils/ModalButton";
import { IconPlus } from "@tabler/icons-react";

function CreateCourseButton({ action }: { action?: CreateCourseModalAction }) {
    return <ModalButton
        modal={<CreateCourseModal action={action}/>}
        color="primary"
        startContent={<IconPlus/>}
    >
        Create a course
    </ModalButton>;
}

export default CreateCourseButton;