import ModalForm from "@/components/utils/ModalForm";
import deleteNotebookPage from "@/app/topics/[topicId]/notebook/_feature/actions/deleteNotebookPage";
import { IconTrash } from "@tabler/icons-react";

export default function DeleteNotebookPageModal({ topicId, name }: { topicId: number | string, name: string }) {
    return <ModalForm
        title={"Are you sure?"}
        action={deleteNotebookPage.bind(null, topicId, name)}
        isFormValid={true}
        buttonIcon={<IconTrash/>}
        buttonLabel={"Yes, delete"}
        handleResponse="close"
    >
        <p>You are about to delete the page <strong>{name}</strong>. This action is irreversible!</p>
    </ModalForm>
}