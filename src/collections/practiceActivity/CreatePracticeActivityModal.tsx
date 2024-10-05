"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
    IconExclamationCircle,
    IconLine,
    IconListCheck,
    IconMist,
    IconPlayCard,
    IconPlus,
    IconSquareRoundedCheck
} from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { QuestionData, QuestionDraft } from "@/features/beta_question";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import CreateChoiceQuestion from "@/features/beta_question/create/CreateChoiceQuestion";
import CreateFillTheGapQuestion from "@/features/beta_question/create/CreateFillTheGapQuestion";
import { Chip } from "@nextui-org/chip";
import CreateTrueOrFalseQuestion from "@/features/beta_question/create/CreateTrueOrFalseQuestion";

const QUESTION_CREATORS = {
    "choice": CreateChoiceQuestion,
    "fill_the_gap": CreateFillTheGapQuestion,
    "true_or_false": CreateTrueOrFalseQuestion,
    "fill_the_gap3": CreateFillTheGapQuestion,
    "fill_the_gap4": CreateFillTheGapQuestion,
}

export default function CreatePracticeActivityModal({ action }: {
    action: (data: QuestionData, tags: string[]) => Promise<string | undefined>
}) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const [questionType, setQuestionType] = useState<"choice" | "fill_the_gap">("choice");

    const [draft, setDraft] = useState<QuestionDraft>();

    const [loading, setLoading] = useState(false);

    const QuestionCreator = useMemo(() => QUESTION_CREATORS[questionType], [questionType]);

    return <ModalContent>
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Create a new activity</ModalHeader>
                <ModalBody>
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
                        <Select
                            label="Question type"
                            isRequired
                            size="lg"
                            variant="bordered"
                            selectedKeys={[questionType]}
                            isMultiline={false}
                            onSelectionChange={e => {
                                setDraft(undefined);
                                e.currentKey && setQuestionType(e.currentKey as any);
                            }}
                        >
                            {/* TODO: Use Icons & dynamic content */}
                            <SelectItem key="choice" startContent={<IconListCheck/>}>
                                Multiple choice
                            </SelectItem>
                            <SelectItem key="fill_the_gap" startContent={<IconMist/>}>
                                Fill the gap
                            </SelectItem>
                            <SelectItem key="true_or_false" startContent={<IconSquareRoundedCheck/>}>
                                True or false
                            </SelectItem>
                            <SelectItem key="fill_the_gap3" startContent={<IconLine/>}>
                                Relation
                            </SelectItem>
                            <SelectItem key="fill_the_gap4" startContent={<IconPlayCard/>}>
                                Pairs
                            </SelectItem>
                        </Select>
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
                </ModalBody>
                <Divider/>
                <ModalFooter>
                    {typeof draft === "string" &&
                        <small className="text-danger flex items-center gap-2 justify-start flex-grow">
                            <IconExclamationCircle/>
                            {draft}
                        </small>}
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        startContent={<IconPlus/>}
                        isDisabled={!title}
                        isLoading={loading}
                        onPress={async () => {
                            if (typeof draft !== "object" || loading || !title || tags.length > 5) return;

                            setLoading(true);

                            const data: QuestionData = { title, details, type: questionType, ...draft } as QuestionData;

                            const error = await action(data, tags);

                            setLoading(false);

                            if (error) {
                                toast(error, { type: "error" });
                            } else {
                                toast("Activity created successfully!", { type: "success" });
                                onClose();
                            }
                        }}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </>
        )}
    </ModalContent>;
}