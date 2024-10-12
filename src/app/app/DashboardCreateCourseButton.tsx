"use client";

import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { Modal, useDisclosure } from "@nextui-org/modal";
import CreateCourseModal from "@/collections/course/components/modals/CreateCourseModal";

export default function DashboardCreateCourseButton() {
    const { onOpen, isOpen, onOpenChange } = useDisclosure();

    return <>
        <Button
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
            startContent={<IconPlus/>}
            onPress={onOpen}
        >
            Create course
        </Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <CreateCourseModal/>
        </Modal>
    </>;
}