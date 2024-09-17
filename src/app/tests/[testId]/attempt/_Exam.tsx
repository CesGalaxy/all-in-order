"use client";

import { Answer, Question } from "@/features/question/Question";
import QUESTION_TYPE_ICONS from "@/features/question/QuestionTypeIcon";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useMemo, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import QuestionAnswerContext from "@/features/question/QuestionAnswerContext";
import AnswerChoiceQuestion from "@/features/question/answers/AnswerChoiceQuestion";
import AnswerFillTheGapQuestion from "@/features/question/answers/AnswerFillTheGapQuestion";
import TimePassed from "@/app/tests/[testId]/attempt/_TimePassed";
import { useTransitionRouter } from "next-view-transitions";
import finish_attempt from "@/app/tests/[testId]/attempt/submit";
import { toast } from "react-toastify";
import { TopicTest } from "@/supabase/models";

export const QuestionsAnswers = {
    choice: AnswerChoiceQuestion,
    fill_the_gap: AnswerFillTheGapQuestion,
}

export interface ExamProps {
    test: TopicTest,
    questions: Question[],
    randomSeeds: number[],
    startedAt: number,
}

export default function Exam({ test, questions, randomSeeds, startedAt }: ExamProps) {
    const router = useTransitionRouter();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(Answer | null)[]>(new Array(questions.length).fill(null));

    const question = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex, questions]);
    const AnswerComponent = useMemo(() => QuestionsAnswers[question.type], [question.type]);

    return <div className="w-full h-full flex items-stretch gap-4 px-8 pb-8">
        <div
            className="bg-content2 text-content2-foreground w-full h-full flex-grow rounded-xl p-4 flex flex-col gap-4">
            <QuestionAnswerContext.Provider value={{
                answer: answers[currentQuestionIndex],
                setAnswer: (answer) => {
                    const newAnswers = [...answers];
                    newAnswers[currentQuestionIndex] = answer;
                    setAnswers(newAnswers);
                },
            }}>
                <nav className="flex items-center justify-between w-full">
                    <Button color="danger" onPress={() => router.back()}><IconX/></Button>
                    <h1 className="text-2xl">{question.title}</h1>
                    <ButtonGroup>
                        <Button
                            isIconOnly
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                            isDisabled={currentQuestionIndex === 0}
                        >
                            <IconArrowLeft/>
                        </Button>
                        <Button
                            isIconOnly
                            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                            isDisabled={currentQuestionIndex === questions.length - 1}
                        >
                            <IconArrowRight/>
                        </Button>
                    </ButtonGroup>
                </nav>
                <div className="flex-grow w-full h-full bg-content1 text-content1-foreground rounded-xl">
                    <AnswerComponent key={currentQuestionIndex} question={question as never}
                                     randomSeed={randomSeeds[currentQuestionIndex]}/>
                </div>
            </QuestionAnswerContext.Provider>
        </div>
        <aside
            className="h-full w-full max-w-96 bg-content2 text-content2-foreground rounded-xl px-4 py-2 overflow-auto flex flex-col">
            <header className="w-full flex items-end justify-between">
                <h1 className="text-4xl">{test.name}</h1>
                <span className="text-lg font-mono">
                    <TimePassed startedAt={startedAt}/>
                </span>
            </header>
            <hr/>
            <br/>
            <ul className="h-full flex-grow flex flex-col items-stretch gap-4 pb-4">
                {questions.map((question, i) => <Button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    color={answers[i] ? "primary" : "default"}
                    variant={i === currentQuestionIndex ? "solid" : "bordered"}
                    disabled={i === currentQuestionIndex}
                    startContent={QUESTION_TYPE_ICONS[question.type]}
                    className="px-0"
                >
                    <p className="text-xl">{question.title}</p>
                </Button>)}
            </ul>
            <br/>
            <hr/>
            <Button
                className="my-2"
                color="success"
                isDisabled={answers.some(answer => answer === null)}
                onClick={async () => {
                    if (answers.some(answer => answer === null)) return;

                    const result = await finish_attempt(test.id, startedAt, answers as Answer[]);

                    if (typeof result === "number") {
                        router.push("/tests/" + test.id + "/attempt/" + result);
                    } else {
                        toast("Failed to submit the test!", { type: "error" });
                        console.log(result);
                    }
                }}
            >
                Finish!
            </Button>
        </aside>
    </div>;
}