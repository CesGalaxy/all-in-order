"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { IconLine, IconListCheck, IconMist, IconPlayCard, IconPlus, IconSquareRoundedCheck } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { Question, QUESTION_CREATORS, QuestionDraft, QuestionType } from "@/modules/learn/question";
import { Select, SelectItem } from "@heroui/select";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";

function CreatePracticeActivityModal({ action }: {
    action: (data: Question, tags: string[]) => Promise<string | undefined>
}) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState("");

    const [questionType, setQuestionType] = useState<QuestionType>("choice");

    const [draft, setDraft] = useState<QuestionDraft<any>>();

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
                            <SelectItem key="relation" startContent={<IconLine/>}>
                                Relation
                            </SelectItem>
                            <SelectItem key="pairs" startContent={<IconPlayCard/>}>
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
                    {/*{typeof draft === "string" &&*/}
                    {/*    <small className="text-danger flex items-center gap-2 justify-start flex-grow">*/}
                    {/*        <IconExclamationCircle/>*/}
                    {/*        {draft}*/}
                    {/*    </small>}*/}
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        startContent={<IconPlus/>}
                        isDisabled={!title || !draft}
                        isLoading={loading}
                        onPress={async () => {
                            if (typeof draft !== "object" || loading || !title || tags.length > 5) return;

                            setLoading(true);

                            const data: Question = { title, details, type: questionType, ...draft };

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

export default CreatePracticeActivityModal;