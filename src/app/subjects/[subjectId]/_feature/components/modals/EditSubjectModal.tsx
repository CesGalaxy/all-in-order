"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import useValidatedState from "@/reactivity/hooks/useValidatedState";
import { SUBJECT_DESCRIPTION, SUBJECT_NAME } from "@/collections/subject/schemas";
import { ActionResponse } from "@/lib/helpers/form";

export type EditSubjectModalAction = (formData: FormData) => Promise<ActionResponse<any>>;

export interface EditSubjectModalProps {
    action: EditSubjectModalAction;
    subjectName: string;
    subjectDescription: string;
}

function EditSubjectModal({ action, subjectName, subjectDescription }: EditSubjectModalProps) {
    const [name, setName, nameValidation, validateName, isNameValid] =
        useValidatedState(SUBJECT_NAME, subjectName);
    const [description, setDescription, descriptionValidation, validateDescription, isDescriptionValid] =
        useValidatedState(SUBJECT_DESCRIPTION, subjectDescription);

    return <ModalForm
        title={"Edit subject"}
        action={action}
        isFormValid={isNameValid && isDescriptionValid}
        buttonLabel="Save"
    >
        <Input
            autoFocus
            label="Name"
            placeholder="Enter the name of the subject"
            variant="bordered"
            name="name"
            value={name}
            onValueChange={setName}
            validate={validateName}
            isInvalid={!isNameValid}
            errorMessage={nameValidation}
        />
        <Textarea
            label="Description"
            placeholder="Enter a description for the subject"
            variant="bordered"
            name="description"
            value={description}
            onValueChange={setDescription}
            validate={validateDescription}
            isInvalid={!isDescriptionValid}
            errorMessage={descriptionValidation}
        />
    </ModalForm>
}

export default EditSubjectModal;