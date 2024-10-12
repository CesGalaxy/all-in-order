"use client";

import { CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal from "@/collections/subject/CreateSubjectModal";

export interface CourseNavigationCardFooterProps {
    courseId: number;
    courseName?: string;
}

export default function CourseNavigationCardFooter({ courseId, courseName }: CourseNavigationCardFooterProps) {
    return <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
        <ModalHandler modal={<CreateSubjectModal courseId={courseId} courseName={courseName}/>}>
            {onOpen => <Button color="primary" startContent={<IconPlus/>} onPress={onOpen}>
                Add a new subject
            </Button>}
        </ModalHandler>
        <Button isIconOnly>
            <IconEdit/>
        </Button>
    </CardFooter>;
}