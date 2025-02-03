import ConfirmActionModal from "@/components/modals/ConfirmActionModal";
import { IconTrash } from "@tabler/icons-react";

export function DeleteDocModal({ name, path, topicId }: { name: string, path: string, topicId: number }) {
    return <ConfirmActionModal
        title="Delete document"
        onConfirm={() => console.log("Delete document")}
        confirmIcon={<IconTrash/>}
        confirmText={"Delete"}
    >
        <p>You&#39;re about to delete the document <b>{path}</b>! This action cannot be undone!</p>
    </ConfirmActionModal>;
}