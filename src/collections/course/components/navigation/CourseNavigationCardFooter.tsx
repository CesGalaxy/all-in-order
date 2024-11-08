"use client";

import { CardFooter } from "@nextui-org/card";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";
import EditCourseModal, { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import { CourseMember } from "@/supabase/entities";
import ModalButton from "@/components/utils/ModalButton";
import DeleteCourseModal, { DeleteCourseModalAction } from "@/collections/course/components/modals/DeleteCourseModal";

export type RequiredCourseMember = Pick<CourseMember, "profile_id" | "is_admin">

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

function CourseNavigationCardFooter({
                                        courseId,
                                        editCourseAction,
                                        deleteCourseAction,
                                        createSubjectAction,
                                        isAdmin = false,
                                        profileId,
                                        ...courseDetails
                                    }: CourseNavigationCardFooterProps) {
    const createSubject = createSubjectAction === "auto"
        ? isAdmin ? courseId : undefined
        : createSubjectAction;

    const deleteSubject = deleteCourseAction === "auto"
        ? isAdmin ? courseId : undefined
        : deleteCourseAction;

    const editCourse = editCourseAction === "auto"
        ? isAdmin ? courseId : undefined
        : editCourseAction;

    return (editCourseAction || createSubjectAction) &&
        <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
            {
                createSubject && <ModalButton
                    modal={<CreateSubjectModal action={createSubject} courseName={courseDetails.courseName}/>}
                    color="primary"
                    startContent={<IconPlus/>}
                >
                    Add a new subject
                </ModalButton>
            }
            {
                editCourse && <ModalButton modal={<EditCourseModal action={editCourse} {...courseDetails}/>} isIconOnly>
                    <IconEdit/>
                </ModalButton>
            }
            {deleteSubject &&
                <ModalButton color="danger" isIconOnly modal={<DeleteCourseModal action={deleteSubject}/>}>
                    <IconTrash/>
                </ModalButton>
            }
        </CardFooter>;
}

export default CourseNavigationCardFooter;