import ModalButton from "@/components/utils/ModalButton";
import CreateTopicModal, { CreateTopicModalAction } from "@/collections/topic/components/modals/CreateTopicModal";

function CreateTopicButton({ action }: { action: number | CreateTopicModalAction }) {
    return <ModalButton modal={<CreateTopicModal action={2}/>} color="primary">Create a topic</ModalButton>;
}

export default CreateTopicButton;