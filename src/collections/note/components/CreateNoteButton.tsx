import CreateNoteModal, { CreateNoteModalAction } from "@/collections/note/components/modals/CreateNoteModal";
import ModalButton from "@/components/utils/ModalButton";

function CreateNoteButton({ action }: { action: CreateNoteModalAction }) {
    return <ModalButton modal={<CreateNoteModal action={action}/>} color="primary">
        Create a note
    </ModalButton>;
}

export default CreateNoteButton;