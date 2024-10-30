"use client";

import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";
import EditCourseModal, { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import { CourseMember } from "@/supabase/entities";

export type RequiredCourseMember = Pick<CourseMember, "profile_id" | "is_admin">

export interface CourseNavigationCardFooterProps {
    courseId: number;
    courseName: string;
    courseDescription: string;
    courseVisibility: boolean;
    isAdmin?: boolean;
    editCourseAction: "auto" | number | EditCourseModalAction;
    createSubjectAction: "auto" | number | CreateSubjectModalAction;
    profileId?: number;
}

function CourseNavigationCardFooter({
                                        courseId,
                                        editCourseAction,
                                        createSubjectAction,
                                        isAdmin = false,
                                        profileId,
                                        ...courseDetails
                                    }: CourseNavigationCardFooterProps) {
    const createSubject = createSubjectAction === "auto"
        ? isAdmin ? courseId : undefined
        : createSubjectAction;

    const editCourse = editCourseAction === "auto"
        ? isAdmin ? courseId : undefined
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
        </CardFooter>;
}

export default CourseNavigationCardFooter;