import { IconTrash } from "@tabler/icons-react";
import ModalForm from "@/components/utils/ModalForm";

function DeleteSubjectModal({ action }: { action: number }) {
    return <ModalForm
        title={"Are you sure?"}
        isFormValid={true}
        handleSuccess="close"
        buttonLabel="Yes, delete"
        buttonIcon={<IconTrash/>}
        buttonProps={{ color: "danger", variant: "shadow" }}
        buttonInitialWait={5000}
        buttonRequireConfirmation
    >
        This action cannot be undone
    </ModalForm>;
}

export default DeleteSubjectModal;