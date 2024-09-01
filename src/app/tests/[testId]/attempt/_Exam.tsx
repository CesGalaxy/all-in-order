"use client";

import { Answer, Question } from "@/features/question/Question";
import QUESTION_TYPE_ICONS from "@/features/question/QuestionTypeIcon";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useMemo, useState } from "react";
import { IconArrowLeft, IconArrowRight, IconX } from "@tabler/icons-react";
import QuestionAnswerContext from "@/features/question/QuestionAnswerContext";
import AnswerChoiceQuestion from "@/features/question/answers/AnswerChoiceQuestion";
import AnswerFillTheGapQuestion from "@/features/question/answers/AnswerFillTheGapQuestion";

export const QuestionsAnswers = {
    choice: AnswerChoiceQuestion,
    fill_the_gap: AnswerFillTheGapQuestion,
}

export default function Exam({ testName, testDescription, questions, randomSeeds }: {
    testName: string,
    testDescription?: string,
    questions: Question[],
    randomSeeds: number[],
}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<(Answer | null)[]>(new Array(questions.length).fill(null));

    const question = useMemo(() => questions[currentQuestionIndex], [currentQuestionIndex, questions]);
    const AnswerComponent = QuestionsAnswers[question.type];

    return <div className="w-full h-full flex items-stretch gap-4 px-8 pb-8">
        <div className="bg-content2 text-content2-foreground w-full h-full flex-grow rounded-xl p-4 flex flex-col gap-4">
            <QuestionAnswerContext.Provider value={{
                answer: answers[currentQuestionIndex],
                setAnswer: (answer) => setAnswers(answers => answers.map((a, i) => i === currentQuestionIndex ? answer : a)),
            }}>
                <nav className="flex items-center justify-between w-full">
                    <Button color="danger">
                        <IconX/>
                    </Button>
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
                    <AnswerComponent question={question as never} randomSeed={randomSeeds[currentQuestionIndex]} />
                </div>
            </QuestionAnswerContext.Provider>
        </div>
        <aside
            className="h-full w-full max-w-96 bg-content2 text-content2-foreground rounded-xl px-4 py-2 overflow-auto flex flex-col">
            <h1 className="text-4xl">{testName}</h1>
            <hr/>
            <br/>
            <ul className="h-full flex-grow flex flex-col items-stretch gap-4 pb-4">
                {questions.map((question, i) => <Button
                    key={i}
                    onClick={() => setCurrentQuestionIndex(i)}
                    color={i === currentQuestionIndex ? "primary" : (answers[i] ? "secondary" : "default")}
                    disabled={i === currentQuestionIndex}
                    startContent={QUESTION_TYPE_ICONS[question.type]}
                    className="px-0"
                >
                        <p className="text-xl">{question.title}</p>
                        {/*{question.details && <p>{question.details}</p>}*/}
                </Button>)}
            </ul>
            <br/>
            <hr/>
            <Button
                className="my-2"
                color="success"
                isDisabled={answers.some(answer => answer === null)}
            >
                Finish!
            </Button>
        </aside>
    </div>;
}