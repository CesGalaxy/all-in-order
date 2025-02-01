"use client";

import { IconCheck } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { useCallback, useState } from "react";
import { useExam } from "@/app/(app)/practices/[practiceId]/start/_feature/ExamContext";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { toast } from "react-toastify";
import { Link } from "@heroui/link";
import { QuestionAnswer } from "@/modules/learn/question";

export default function SubmitExamButton() {
    const { activities, submitAnswers } = useExam();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const submit = useCallback(async () => {
        setLoadingSubmit(true);

        // Check all activities have been answered
        if (!activities.every(activity => activity.answer)) {
            setLoadingSubmit(false);
            toast("Please answer all questions before submitting", { type: "error" });
            return;
        }

        const answers = activities.map<[QuestionAnswer, boolean]>(activity => [activity.answer!, activity.correct!]);
        console.log(answers);
        const error = await submitAnswers(answers);
        setLoadingSubmit(false);

        if (error === "login") {
            onOpen();
        } else if (error) {
            toast("An error occurred while submitting your answers", { type: "error" });
            console.error(error);
        }
    }, [activities, onOpen, submitAnswers]);

    return <>
        <Button
            className="w-full"
            color="success"
            startContent={<IconCheck/>}
            onPress={submit}
            isLoading={loadingSubmit}
            isDisabled={loadingSubmit || !activities.every(activity => activity.answer)}
        >
            Finish
        </Button>
        <Modal isOpen={isOpen} onClose={onOpenChange}>
            <ModalContent className="overflow-y-auto max-h-full">
                {(onClose) => <>
                    <ModalHeader className="flex flex-col gap-1">Login for saving your results</ModalHeader>
                    <ModalBody>
                    </ModalBody>
                    <ModalFooter>
                        <Link href="/login">
                            Login
                        </Link>
                    </ModalFooter>
                </>}
            </ModalContent>
        </Modal>
    </>;
}