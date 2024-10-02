"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconCircleDashedCheck,
    IconQuestionMark,
    IconX
} from "@tabler/icons-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Chip } from "@nextui-org/chip";
import { validateQuestion } from "@/features/beta_question";

export default function BottomNavigation() {
    const {
        activities,
        currentActivity,
        currentActivityIndex,
        setCurrentActivityIndex,
        updateCurrentActivity
    } = useExam();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitAnswer = () => {
        if (!currentActivity.answerDraft) return;

        updateCurrentActivity({ answerDraft: undefined, answer: currentActivity.answerDraft });

        const isCorrect = validateQuestion(currentActivity.data, currentActivity.answerDraft);
        console.log(isCorrect);
    }

    return <>
        <ButtonGroup className="w-full">
            <Button
                onPress={() => setCurrentActivityIndex(currentActivityIndex - 1)}
                isDisabled={currentActivityIndex === 0}
            >
                <IconChevronLeft/>
            </Button>
            <Button
                className="flex-grow font-medium"
                onPress={currentActivity.answerDraft ? submitAnswer : onOpen}
                variant={currentActivity.answerDraft ? "shadow" : "bordered"}
                color={currentActivity.answerDraft ? "success" : "default"}
                startContent={currentActivity.answerDraft
                    ? <IconCircleDashedCheck className="absolute left-2"/>
                    : "default"}
            >
                {currentActivity.answerDraft ? "Confirm" : "Review activities"}
            </Button>
            <Button
                isDisabled={!currentActivity.answer}
                onPress={() => setCurrentActivityIndex(currentActivityIndex + 1)}
            >
                <IconChevronRight/>
            </Button>
        </ButtonGroup>
        <Modal isOpen={isOpen} onClose={onOpenChange}>
            <ModalContent className="overflow-y-auto max-h-full">
                {(onClose) => <>
                    <ModalHeader className="flex flex-col gap-1">Practice activities</ModalHeader>
                    <ModalBody as="ul" className="grid">
                        {activities.map((activity, i) => <Button
                            key={activity.id}
                            isDisabled={!activity.answer && i !== currentActivityIndex}
                            color={activity.correct === true ? "success" : activity.correct === false ? "danger" : "default"}
                            onPress={() => {
                                setCurrentActivityIndex(i);
                                onClose();
                            }}
                        >
                            {activity.data.title}
                        </Button>)}
                    </ModalBody>
                    <ModalFooter className="justify-start">
                        <Chip color="success" startContent={<IconCheck/>}>
                            {activities.filter(activity => activity.correct).length}
                        </Chip>
                        <Chip color="danger" startContent={<IconX/>}>
                            {activities.filter(activity => activity.correct === false).length}
                        </Chip>
                        <Chip startContent={<IconQuestionMark/>}>
                            {activities.filter(activity => activity.correct === undefined).length}
                        </Chip>
                    </ModalFooter>
                </>}
            </ModalContent>
        </Modal>
    </>
}