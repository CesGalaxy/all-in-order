"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import ExaminateChoiceQuestion from "@/app/practices/[practiceId]/start/_feature/questions/ExaminateChoiceQuestion";
import { useCallback, useMemo } from "react";
import { QuestionAnswer } from "@/features/beta_question";

const QUESTION_EXAMINATIONS = {
    choice: ExaminateChoiceQuestion,
    fill_the_gap: ExaminateChoiceQuestion,
}

export default function ExamActivity() {
    const { currentActivity: { data, attempt, answer, answerDraft }, updateCurrentActivity } = useExam();

    const Examination = useMemo(() => QUESTION_EXAMINATIONS[data.type], [data.type]);

    const setAnswer = useCallback(
        (answer: QuestionAnswer) => updateCurrentActivity({ answerDraft: answer }),
        [updateCurrentActivity]);

    return <div className="w-full h-full p-4">
        <Examination draft={answerDraft as any} attempt={attempt as any} setAnswer={setAnswer}/>
    </div>;
}