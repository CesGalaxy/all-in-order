"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconCircleDashedCheck,
    IconListCheck,
    IconQuestionMark,
    IconX
} from "@tabler/icons-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Chip } from "@nextui-org/chip";
import { validateQuestion } from "@/features/beta_question";
import { useCallback, useMemo } from "react";
import SubmitExamButton from "@/app/practices/[practiceId]/start/_feature/SubmitExamButton";

export default function BottomNavigation() {
    const {
        activities,
        currentActivity: { data, answer, answerDraft, correct },
        currentActivityIndex,
        setCurrentActivityIndex,
        updateCurrentActivity
    } = useExam();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitAnswer = useCallback(() => {
        if (!answerDraft) return;

        const correct = validateQuestion(data, answerDraft);

        updateCurrentActivity({ answerDraft: undefined, answer: answerDraft, correct });
        console.log(correct);
    }, [answerDraft, data, updateCurrentActivity]);

    const modal = useMemo(() => <Modal isOpen={isOpen} onClose={onOpenChange}>
        <ModalContent className="overflow-y-auto max-h-full">
            {(onClose) => <>
                <ModalHeader className="flex flex-col gap-1">Practice activities</ModalHeader>
                <ModalBody as="ul" className="grid">
                    {activities.map((activity, i) => <Button
                        key={activity.id}
                        isDisabled={
                            !(activity.answer || activity.answerDraft)
                            &&
                            !(activities.findLastIndex(activity => activity.answer || activity.answerDraft) + 1 >= i)
                        }
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
    </Modal>, [activities, isOpen, onOpenChange, setCurrentActivityIndex]);

    // If all activities have been answered, show the submit button
    if (activities.every(activity => activity.answer)) return <>
        <ButtonGroup className="w-full">
            <Button isIconOnly onPress={onOpen}>
                <IconListCheck/>
            </Button>
            <SubmitExamButton/>
        </ButtonGroup>
        {modal}
    </>;

    const statusColor = answer
        ? correct
            ? "success"
            : "danger"
        : "default";

    return <>
        <ButtonGroup className="w-full" color={statusColor}>
            <Button
                onPress={() => setCurrentActivityIndex(currentActivityIndex - 1)}
                isDisabled={currentActivityIndex === 0}
            >
                <IconChevronLeft/>
            </Button>
            <Button
                className="flex-grow font-medium"
                onPress={answerDraft ? submitAnswer : onOpen}
                variant={answerDraft ? "shadow" : "bordered"}
                color={answerDraft ? "success" : statusColor}
                startContent={answerDraft
                    ? <IconCircleDashedCheck className="absolute left-2"/>
                    : "default"}
            >
                {answerDraft ? "Confirm" : "Review activities"}
            </Button>
            <Button
                isDisabled={!answer || currentActivityIndex === activities.length - 1}
                onPress={() => setCurrentActivityIndex(currentActivityIndex + 1)}
            >
                <IconChevronRight/>
            </Button>
        </ButtonGroup>
        {modal}
    </>
}