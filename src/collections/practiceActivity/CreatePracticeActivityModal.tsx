"use client";

import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconExclamationCircle, IconListCheck, IconPlus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { BaseQuestion, QuestionDraft } from "@/features/beta_question";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import CreateChoiceQuestion from "@/features/beta_question/create/CreateChoiceQuestion";

const QUESTION_CREATORS = {
    "choice": CreateChoiceQuestion,
}

export default function CreatePracticeActivityModal({ action }: {
    action: (title: string, details: string) => Promise<string | undefined>
}) {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [questionType, setQuestionType] = useState<"choice">("choice");

    const [draft, setDraft] = useState<QuestionDraft<BaseQuestion>>();

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
                            <SelectItem key="choice" startContent={<IconListCheck/>}>
                                Multiple choice
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
                        isDisabled={loading || !title}
                        isLoading={loading}
                        onPress={async () => {
                            setLoading(true);
                            const error = await action(title, details);
                            setLoading(false);

                            if (error) {
                                toast(error, { type: "error" });
                            } else {
                                toast("Practice created successfully!", { type: "success" });
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