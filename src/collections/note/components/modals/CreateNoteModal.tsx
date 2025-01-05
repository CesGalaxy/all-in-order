"use client";

import { Input, Textarea } from "@nextui-org/input";
import { IconPlus } from "@tabler/icons-react";
import ModalForm from "@/components/utils/ModalForm";
import useValidatedState from "@/reactivity/hooks/useValidatedState";
import { NOTE_CONTENT, NOTE_TITLE } from "@/collections/note/schemas";
import { ActionResponse } from "@/lib/helpers/form";

export type CreateNoteModalAction = ((formData: FormData) => Promise<ActionResponse<any>>);

export interface CreateNoteModalProps {
    action: CreateNoteModalAction
}

function CreateNoteModal({ action }: CreateNoteModalProps) {
    const [title, setTitle, titleValidation, validateTitle, isTitleValid] = useValidatedState(NOTE_TITLE, "");
    const [content, setContent, contentValidation, validateContent, isContentValid] = useValidatedState(NOTE_CONTENT, "");

    return <ModalForm
        title={"Create a new note"}
        action={action}
        isFormValid={isTitleValid && isContentValid}
        buttonLabel={"Create"}
        buttonIcon={<IconPlus/>}
    >
        <Input
            autoFocus
            label="Title"
            placeholder="Enter the title of the note (optional)"
            name="title"
            variant="bordered"
            value={title}
            onValueChange={setTitle}
            validate={validateTitle}
            isInvalid={!isTitleValid}
            errorMessage={titleValidation}
        />
        <Textarea
            label="Content"
            placeholder="Start typing here..."
            name="content"
            variant="bordered"
            rows={3}
            maxLength={512}
            value={content}
            isRequired
            onValueChange={setContent}
            validate={validateContent}
            isInvalid={!isContentValid}
            errorMessage={contentValidation}
        />
    </ModalForm>;
}

export default CreateNoteModal;