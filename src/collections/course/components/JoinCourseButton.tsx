import JoinCourseModal from "@/collections/course/components/modals/JoinCourseModal";
import type { ReactNode } from "react";
import ModalButton from "@/components/utils/ModalButton";
import { IconQrcode } from "@tabler/icons-react";

export default function JoinCourseButton({ modal }: { modal?: ReactNode }) {
    return <ModalButton
        modal={modal || <JoinCourseModal/>}
        startContent={<IconQrcode/>}
    >
        Join with code
    </ModalButton>;
}