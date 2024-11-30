"use client";

import ModalForm from "@/components/utils/ModalForm";
import { Input, Textarea } from "@nextui-org/input";
import useValidatedState from "@/reactivity/hooks/useValidatedState";
import { TOPIC_DESCRIPTION, TOPIC_TITLE } from "@/collections/topic/schemas";
import { IconPlus } from "@tabler/icons-react";
import { ActionResponse } from "@/lib/helpers/form";
import { useMemo } from "react";
import { createTopic } from "@/collections/topic/actions";

export type CreateTopicModalAction = (formData: FormData) => Promise<ActionResponse<any>>;

export interface CreateTopicModalProps {
    action: number | CreateTopicModalAction;
}

export default function CreateTopicModal({ action }: CreateTopicModalProps) {
    const [title, setTitle, titleValidation, validateTitle, isTitleValid] = useValidatedState(TOPIC_TITLE, "");
    const [description, setDescription, descriptionValidation, validateDescription, isDescriptionValid] = useValidatedState(TOPIC_DESCRIPTION, "");

    const submit = useMemo(() => typeof action === "number"
        ? createTopic.bind(null, action)
        : action, [action])

    return <ModalForm
        title={"Create a new topic"}
        action={submit}
        isFormValid={isTitleValid && isDescriptionValid}
        buttonIcon={<IconPlus/>}
        buttonLabel={"Create"}
    >
        <Input
            autoFocus
            label="Title"
            placeholder="Enter the title of the topic"
            variant="bordered"
            isRequired
            value={title}
            onValueChange={setTitle}
            validate={validateTitle}
            isInvalid={!isTitleValid}
            errorMessage={titleValidation}
        />
        <Textarea
            label="Description"
            placeholder="A description for the topic (optional)"
            variant="bordered"
            rows={3}
            maxLength={512}
            value={description}
            onValueChange={setDescription}
            validate={validateDescription}
            isInvalid={!isDescriptionValid}
            errorMessage={descriptionValidation}
        />
    </ModalForm>;
}