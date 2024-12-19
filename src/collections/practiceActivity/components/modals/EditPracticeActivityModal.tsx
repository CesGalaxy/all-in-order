"use client";

import { Input, Textarea } from "@nextui-org/input";
import { IconDeviceFloppy, IconExclamationCircle } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { QuestionData, QuestionDraft } from "@aio/db/features/questions";
import { Divider } from "@nextui-org/divider";
import CreateChoiceQuestion from "@/features/beta_question/create/CreateChoiceQuestion";
import CreateFillTheGapQuestion from "@/features/beta_question/create/CreateFillTheGapQuestion";
import { Chip } from "@nextui-org/chip";
import CreateTrueOrFalseQuestion from "@/features/beta_question/create/CreateTrueOrFalseQuestion";
import ModalForm from "@/components/utils/ModalForm";

const QUESTION_CREATORS = {
    "choice": CreateChoiceQuestion,
    "fill_the_gap": CreateFillTheGapQuestion,
    "true_or_false": CreateTrueOrFalseQuestion,
    "fill_the_gap3": CreateFillTheGapQuestion,
    "fill_the_gap4": CreateFillTheGapQuestion,
}

function CreatePracticeActivityModal({
                                         initialData, initialTags
                                     }: {
    initialData: QuestionData,
    initialTags: string[]
}) {
    const [title, setTitle] = useState(initialData.title);
    const [details, setDetails] = useState(initialData.details);

    const [tags, setTags] = useState<string[]>(initialTags);
    const [newTag, setNewTag] = useState("");

    const [draft, setDraft] = useState<QuestionDraft>(initialData);

    const QuestionCreator = useMemo(() => QUESTION_CREATORS[initialData.type], [initialData.type]);

    return <ModalForm
        title={"Edit an activity"}
        isFormValid={!!title && typeof draft === "object" && tags.length <= 5}
        action={() => {
            if (typeof draft !== "object" || !title || tags.length > 5) return;
            const data: QuestionData = { title, details, type: initialData.type, ...draft } as QuestionData;
        }}
        handleSuccess="close"
        footer={typeof draft === "string" &&
            <small className="text-danger flex items-center gap-2 justify-start flex-grow">
                <IconExclamationCircle/>
                {draft}
            </small>}
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

                    const tag = newTag.trim().toLowerCase();

                    // Prevent duplicates or more than 5 tags
                    if (tags.includes(tag) || tags.length > 4) return;

                    setTags([...tags, tag]);
                    setNewTag("");
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
        <QuestionCreator draft={draft as any} setDraft={setDraft}/>
    </ModalForm>;
}

export default CreatePracticeActivityModal;