"use client";

import { Button } from "@nextui-org/button";
import ModalHandler from "@/components/utils/ModalHandler";
import JoinCourseModal from "@/collections/course/components/modals/JoinCourseModal";
import type { ReactNode } from "react";

export default function JoinCourseButton({ modal }: { modal?: ReactNode }) {
    return <ModalHandler modal={modal || <JoinCourseModal/>}>
        {onOpen => <Button onPress={onOpen}>Join with code</Button>}
    </ModalHandler>;
}