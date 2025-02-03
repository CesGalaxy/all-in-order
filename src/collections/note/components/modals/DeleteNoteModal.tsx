import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";
import { deleteNoteAction } from "@/collections/note/action";

export default function DeleteNoteModal({ id, subjectId }: { id: number, subjectId?: number }) {
    return <ConfirmActionModal
        confirmIcon={<IconTrash/>}
        onConfirm={deleteNoteAction.bind(null, id, subjectId)}
        requireConfirmation={false}
        initialWait={null}
    />;
}