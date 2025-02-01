"use client";

import { useExam } from "@/app/(app)/practices/[practiceId]/start/_feature/ExamContext";
import { Button, ButtonGroup } from "@heroui/button";
import {
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconCircleDashedCheck,
    IconListCheck,
    IconQuestionMark,
    IconX
} from "@tabler/icons-react";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { useCallback, useMemo } from "react";
import SubmitExamButton from "@/app/(app)/practices/[practiceId]/start/_feature/SubmitExamButton";
import { QUESTION_ANSWER_VALIDATORS } from "@/modules/learn/question";

export default function BottomNavigation() {
    const {
        activities,
        currentActivity: { data, answer, answerDraft, correct },
        currentActivityIndex,
        setCurrentActivityIndex,
        setAnimationDirection,
        updateCurrentActivity,
        nextActivity,
        prevActivity,
    } = useExam();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const submitAnswer = useCallback(() => {
        if (!answerDraft) return;

        // @ts-ignore
        const correct = QUESTION_ANSWER_VALIDATORS[data.type](data, answerDraft);

        setAnimationDirection(0);
        updateCurrentActivity({ answerDraft: undefined, answer: answerDraft, correct });
    }, [answerDraft, data, setAnimationDirection, updateCurrentActivity]);

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
                            setAnimationDirection(currentActivityIndex < i ? 1 : -1);
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
                onPress={prevActivity}
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
                onPress={nextActivity}
            >
                <IconChevronRight/>
            </Button>
        </ButtonGroup>
        {modal}
    </>
}