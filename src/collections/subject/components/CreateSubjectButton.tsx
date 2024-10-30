"use client";

import { Button } from "@nextui-org/button";
import ModalHandler from "@/components/utils/ModalHandler";
import CreateSubjectModal, {
    CreateSubjectModalAction
} from "@/collections/subject/components/modals/CreateSubjectModal";

export type CreateSubjectButtonProps = {
    action: number | CreateSubjectModalAction;
}

function CreateSubjectButton(props: CreateSubjectButtonProps) {
    return <ModalHandler modal={<CreateSubjectModal {...props}/>}>
        {onOpen => <Button onPress={onOpen} color="primary">Create a subject</Button>}
    </ModalHandler>;
}

export default CreateSubjectButton;