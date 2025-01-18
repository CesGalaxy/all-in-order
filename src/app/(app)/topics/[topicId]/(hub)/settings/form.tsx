"use client";

import { Input, Textarea } from "@nextui-org/input";
import updateTopicSettings from "@/app/(app)/topics/[topicId]/(hub)/settings/action";
import { Topic } from "@/lib/supabase/entities";
import { Button } from "@nextui-org/button";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { z } from "zod";
import useValidatedState from "@/reactivity/hooks/useValidatedState";
import { useActionState, useMemo } from "react";

export default function TopicSettingsForm({ topic }: { topic: Pick<Topic, "id" | "title" | "description"> }) {
    const action = useMemo(() => updateTopicSettings.bind(null, topic.id), [topic.id]);
    const [state, dispatch, isPending] = useActionState(action, null);

    const
        [title, setTitle, titleValidation, validateTitle, isTitleValid] =
            useValidatedState(z.string(), topic.title),
        [description, setDescription, descriptionValidation, validateDescription, isDescriptionValid] =
            useValidatedState(z.string(), topic.description || "")

    return <form action={dispatch} className="grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
            <input type="hidden" name="topic_id" value={topic.id}/>
            <Input
                label="Title"
                name="title"
                variant="faded"
                color="primary"
                value={title}
                onValueChange={setTitle}
                validate={validateTitle}
                isInvalid={!isTitleValid}
                errorMessage={titleValidation?.join("; ")}
            />
            <Textarea
                label="Description"
                name="description"
                variant="faded"
                color="primary"
                value={description}
                onValueChange={setDescription}
                validate={validateDescription}
                isInvalid={!isDescriptionValid}
                errorMessage={descriptionValidation?.join("; ")}
                minRows={2}
            />
        </div>
        <div></div>
        <nav>
            <Button
                color="primary"
                size="lg"
                type="submit"
                startContent={<IconDeviceFloppy/>}
                isLoading={isPending}
                isDisabled={!isTitleValid || !isDescriptionValid}
            >
                Save changes
            </Button>
        </nav>
    </form>;
}