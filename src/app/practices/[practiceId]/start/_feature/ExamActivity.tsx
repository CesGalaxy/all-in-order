"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import ExaminateChoiceQuestion from "@/app/practices/[practiceId]/start/_feature/questions/ExaminateChoiceQuestion";
import { useCallback, useMemo, useState } from "react";
import { QuestionAnswer } from "@/features/beta_question";
import { AnimatePresence, motion } from "framer-motion";
import ChoiceQuestionCorrection from "@/app/practices/[practiceId]/start/_feature/corrections/ChoiceQuestionCorrection";
import ExaminateFillTheGapQuestion
    from "@/app/practices/[practiceId]/start/_feature/questions/ExaminateFillTheGapQuestion";
import FillTheGapQuestionCorrection
    from "@/app/practices/[practiceId]/start/_feature/corrections/FillTheGapQuestionCorrection";
import ExaminateTrueOrFalseQuestion
    from "@/app/practices/[practiceId]/start/_feature/questions/ExaminateTrueOrFalseQuestion";
import TrueOrFalseQuestionCorrection
    from "@/app/practices/[practiceId]/start/_feature/corrections/TrueOrFalseQuestionCorrection";

const variants = {
    "enter": (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    "center": {
        //zIndex: 1,
        x: 0,
        opacity: 1
    },
    "exit": (direction: number) => ({
        //zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const QUESTION_EXAMINATIONS = {
    choice: ExaminateChoiceQuestion,
    fill_the_gap: ExaminateFillTheGapQuestion,
    true_or_false: ExaminateTrueOrFalseQuestion,
}

const QUESTION_CORRECTIONS = {
    choice: ChoiceQuestionCorrection,
    fill_the_gap: FillTheGapQuestionCorrection,
    true_or_false: TrueOrFalseQuestionCorrection,
}

export default function ExamActivity() {
    const {
        activities,
        currentActivity: { id, data, attempt, answer, answerDraft, correct },
        currentActivityIndex,
        setCurrentActivityIndex,
        updateCurrentActivity
    } = useExam();

    const Examination = useMemo(() => QUESTION_EXAMINATIONS[data.type], [data.type]);
    const Correction = useMemo(() => QUESTION_CORRECTIONS[data.type], [data.type]);

    const setAnswer = useCallback(
        (answer?: QuestionAnswer) => updateCurrentActivity({ answerDraft: answer }),
        [updateCurrentActivity]);

    const [animationDirection, setAnimationDirection] = useState<-1 | 0 | 1>(0);

    const nextActivity = useCallback(() => {
        setAnimationDirection(1);
        setCurrentActivityIndex(currentIndex => currentIndex + 1);
    }, [setCurrentActivityIndex]);

    const prevActivity = useCallback(() => {
        setAnimationDirection(-1);
        setCurrentActivityIndex(currentIndex => currentIndex === 0 ? currentIndex : currentIndex - 1);
    }, [setCurrentActivityIndex]);

    return <AnimatePresence initial={false} custom={animationDirection}>
        <motion.div
            key={id * (answer ? 1 : -1)}
            className="w-full h-full p-4 absolute transition-background"
            variants={variants}
            custom={animationDirection}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            // dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                    if (answer || currentActivityIndex >= activities.length) nextActivity();
                } else if (swipe > swipeConfidenceThreshold) {
                    prevActivity();
                }
            }}
        >
            {answer
                ? <Correction {...{ data, attempt, answer, correct } as any}/>
                : <Examination draft={answerDraft as any} attempt={attempt as any} setAnswer={setAnswer}/>
            }
        </motion.div>
    </AnimatePresence>;
}