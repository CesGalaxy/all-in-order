import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";
import { ModalFormAction } from "@/components/utils/ModalForm";
import { deleteCourseAction } from "@/collections/course/actions";

export default function DeleteNoteModal({ action }: { action: number | ModalFormAction<any, any> }) {
    return <ConfirmActionModal
        confirmIcon={<IconTrash/>}
        onConfirm={typeof action === "number" ? deleteCourseAction.bind(null, action) : action}
    />;
}