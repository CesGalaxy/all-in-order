"use client";

import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";
import EditCourseModal, { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";

export interface CourseNavigationCardFooterProps {
    courseId: number;
    courseName: string;
    courseDescription: string;
    courseVisibility: boolean;
    editCourseAction?: number | EditCourseModalAction;
    createSubjectAction?: number | CreateSubjectModalAction;
}

function CourseNavigationCardFooter({
                                        courseId,
                                        editCourseAction,
                                        createSubjectAction,
                                        ...courseDetails
                                    }: CourseNavigationCardFooterProps) {
    return (editCourseAction || createSubjectAction) &&
        <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
            {
                createSubjectAction &&
                <ModalHandler
                    modal={<CreateSubjectModal action={createSubjectAction} courseName={courseDetails.courseName}/>}
                >
                    {onOpen => <Button color="primary" startContent={<IconPlus/>} onPress={onOpen}>
                        Add a new subject
                    </Button>}
                </ModalHandler>
            }
            {
                editCourseAction &&
                <ModalHandler modal={<EditCourseModal action={editCourseAction} {...courseDetails}/>}>
                    {onOpen => <Button isIconOnly onPress={onOpen}>
                        <IconEdit/>
                    </Button>}
                </ModalHandler>
            }
        </CardFooter>;
}

export default CourseNavigationCardFooter;