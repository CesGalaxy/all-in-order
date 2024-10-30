"use client";

import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";
import EditCourseModal, { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import { CourseMember } from "@/supabase/entities";
import { useCallback } from "react";
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
    const incorrectUsage = useCallback(() => {
        console.error("CourseNavigationCardFooter: Incorrect usage of editCourseAction or createSubjectAction");
        return undefined;
    }, []);

    const createSubject = createSubjectAction === "auto"
        ? isAdmin ? courseId : incorrectUsage()
        : createSubjectAction;

    const deleteSubject = deleteCourseAction === "auto"
        ? isAdmin ? courseId : incorrectUsage()
        : deleteCourseAction;

    const editCourse = editCourseAction === "auto"
        ? isAdmin ? courseId : incorrectUsage()
        : editCourseAction;

    return (editCourseAction || createSubjectAction) &&
        <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
            {
                createSubject &&
                <ModalHandler
                    modal={<CreateSubjectModal action={createSubject} courseName={courseDetails.courseName}/>}
                >
                    {onOpen => <Button color="primary" startContent={<IconPlus/>} onPress={onOpen}>
                        Add a new subject
                    </Button>}
                </ModalHandler>
            }
            {
                editCourse &&
                <ModalHandler modal={<EditCourseModal action={editCourse} {...courseDetails}/>}>
                    {onOpen => <Button isIconOnly onPress={onOpen}>
                        <IconEdit/>
                    </Button>}
                </ModalHandler>
            }
            {
                deleteSubject &&
                <ModalButton
                    color="danger"
                    isIconOnly
                    modal={<DeleteCourseModal action={deleteSubject}/>}
                >
                    <IconTrash/>
                </ModalButton>
            }
        </CardFooter>;
}

export default CourseNavigationCardFooter;