"use client";

import { Input, Textarea } from "@nextui-org/input";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import ModalForm from "@/components/utils/ModalForm";
import { ActionResponse } from "@/lib/helpers/form";
import { Question, QUESTION_CREATORS, QuestionDraft, QuestionType } from "@/modules/learn/question";

function EditPracticeActivityModal<T extends QuestionType>({ action, initialData, initialTags }: {
    action: (data: Question<T>, tags: string[]) => Promise<ActionResponse<any>>,
    initialData: Question<T>,
    initialTags: string[],
}) {
    const [title, setTitle] = useState(initialData.title);
    const [details, setDetails] = useState(initialData.details);

    const [tags, setTags] = useState<string[]>(initialTags);
    const [newTag, setNewTag] = useState("");

    const [draft, setDraft] = useState<QuestionDraft<T>>(initialData);

    const QuestionCreator = useMemo(
        () => QUESTION_CREATORS[initialData.type], [initialData.type]);

    const addTag = useCallback(() => {
        const tag = newTag.trim().toLowerCase();
        if (tags.includes(tag) || tags.length > 4) return;
        setTags([...tags, tag]);
        setNewTag("");
    }, [newTag, tags]);

    return <ModalForm
        title={"Edit an activity"}
        isFormValid={!!title && typeof draft === "object" && tags.length <= 5}
        action={() => {
            if (typeof draft !== "object" || !title || tags.length > 5) return;
            const data: Question = { title, details, type: initialData.type, ...draft };
            return action(data, tags);
        }}
        handleSuccess="close"
        buttonLabel={"Save"}
        buttonIcon={<IconDeviceFloppy/>}
        showFooterDivider
    >
        <div className="flex items-start gap-4 flex-col sm:flex-row">
            <Input
                autoFocus
                label="Title"
                placeholder="Enter the title of the question"
                variant="bordered"
                value={title}
                onValueChange={setTitle}
                isRequired
                validate={value => value ? null : "Title is required"}
                size="lg"
            />
        </div>
        <Textarea
            label="Details"
            placeholder="Explain the question (optional)"
            variant="bordered"
            rows={3}
            maxLength={512}
            value={details}
            onValueChange={setDetails}
        />
        <Input
            label="Tags"
            placeholder={tags.length > 4 ? "You can only add up to 5 tags" : "Enter tags separated by commas"}
            variant="bordered"
            disabled={tags.length > 4}
            value={newTag}
            onValueChange={setNewTag}
            labelPlacement="outside"
            onKeyDown={e => {
                if (e.key === "Enter" || e.key === "," || e.key === " ") {
                    e.preventDefault();
                    addTag();
                }
            }}
            size="sm"
            startContent={<ul className="flex gap-2 w-fit max-w-1/2 -ml-2 ml-1">{tags.map(tag =>
                <Chip key={tag} onClose={() => setTags(tags.filter(t => t !== tag))} as="li" radius="sm">
                    {tag}
                </Chip>
            )}</ul>}
        />
        <Divider/>
        {/* @ts-ignore */}
        <QuestionCreator draft={draft} setDraft={setDraft} initialData={initialData}/>
    </ModalForm>;
}

export default EditPracticeActivityModal;