"use client";

import { IconTextPlus } from "@tabler/icons-react";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { useMemo, useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import QuestionCreationContext from "@/features/question/QuestionCreationContext";
import { Question } from "@/features/question/BaseQuestion";
import CreateChoiceQuestion from "@/features/question/create/CreateChoiceQuestion";
import { toast } from "react-toastify";
import { PostgrestError } from "@supabase/supabase-js";
import CreateFillTheGapQuestion from "@/features/question/create/CreateFillTheGapQuestion";

const QUESTION_CREATORS = {
    "choice": CreateChoiceQuestion,
    "fill_the_gap": CreateFillTheGapQuestion
};

export interface CreateQuestionButtonProps {
    create: (data: object) => Promise<PostgrestError | undefined>
}

export default function CreateQuestionButton({ create }: CreateQuestionButtonProps) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState("");
    const [error, setError] = useState<string>();

    const [questionType, setQuestionType] = useState<Question["type"]>("choice");

    const [question, setQuestion] = useState<Question>();

    const validData = useMemo(() => question && name.length > 0, [question, name]);

    const QuestionCreator = useMemo(() => QUESTION_CREATORS[questionType], [questionType]);

    return <>
        <Button color="primary" startContent={<IconTextPlus/>} onClick={onOpen}>
            Create question
        </Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="xl"
        >
            <ModalContent>{(onClose) => <QuestionCreationContext.Provider value={{ question, setQuestion }}>
                <ModalHeader className="flex flex-col gap-1">Create question</ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Question type"
                            selectedKeys={[questionType]}
                            onChange={(e) => e.target.value ? setQuestionType(e.target.value as Question["type"]) : null}
                            isRequired
                        >
                            <SelectItem key="choice" value="choice">Choice question</SelectItem>
                            <SelectItem key="fill_the_gap" value="fill_the_gap">Fill the gap</SelectItem>
                        </Select>
                        <Input
                            autoFocus
                            label="Question title"
                            placeholder="Enter the title of the new question"
                            variant="bordered"
                            validate={(value) => value.length > 0 ? null : "Please enter a title for the document"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isRequired
                        />
                    </div>
                    <div>
                        <QuestionCreator title={name}/>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {!validData && <p className="text-red-500">Please fill all the required fields</p>}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        isDisabled={!validData}
                        onPress={async () => {
                            if (question) {
                                const error = await create(question);

                                if (error) {
                                    setError(error.message);
                                    toast("An error occurred while creating the question", { type: "error" });
                                } else {
                                    onClose();
                                    toast("The question was created successfully", { type: "success" });
                                }
                            } else {
                                toast("Please fill all the required fields", { type: "error" });
                            }
                        }}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </QuestionCreationContext.Provider>
            }</ModalContent>
        </Modal>
    </>;
}