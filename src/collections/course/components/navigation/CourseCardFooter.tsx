import { CardFooter } from "@heroui/card";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";
import EditCourseModal, { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import ModalButton from "@/components/utils/ModalButton";
import DeleteCourseModal, { DeleteCourseModalAction } from "@/collections/course/components/modals/DeleteCourseModal";
import { useCallback } from "react";

export interface CourseNavigationCardFooterProps {
    courseId: number;
    courseName: string;
    courseDescription: string;
    courseVisibility: boolean;
    isAdmin?: boolean;
    editCourseAction: "auto" | EditCourseModalAction;
    deleteCourseAction: "auto" | DeleteCourseModalAction;
    createSubjectAction: "auto" | CreateSubjectModalAction;
    profileId?: number;
}

function CourseCardFooter({
                              courseId,
                              editCourseAction,
                              deleteCourseAction,
                              createSubjectAction,
                              isAdmin = false,
                              profileId,
                              ...courseDetails
                          }: CourseNavigationCardFooterProps) {
    const handle = useCallback(<T, >(action: "auto" | T | undefined) =>
        action === "auto" ? isAdmin ? courseId : undefined : action, [isAdmin, courseId]);

    const createSubject = handle(createSubjectAction);
    const deleteSubject = handle(deleteCourseAction);
    const editCourse = handle(editCourseAction);

    return (editCourseAction || createSubjectAction) &&
        <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
            {createSubject && <ModalButton
                modal={<CreateSubjectModal action={createSubject} courseName={courseDetails.courseName}/>}
                color="primary"
                startContent={<IconPlus/>}
            >
                Add a new subject
            </ModalButton>}
            {editCourse && <ModalButton modal={<EditCourseModal action={editCourse} {...courseDetails}/>} isIconOnly>
                <IconEdit/>
            </ModalButton>}
            {deleteSubject &&
                <ModalButton color="danger" isIconOnly modal={<DeleteCourseModal action={deleteSubject}/>}>
                    <IconTrash/>
                </ModalButton>}
        </CardFooter>;
}

export default CourseCardFooter;