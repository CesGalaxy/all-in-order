import { createContext, useContext } from "react";
import { Answer } from "@/features/question/Question";

export interface QuestionCreationContextData<T = Answer> {
    answer: T | null;
    setAnswer: (answer: T | null) => void;
}

const QuestionAnswerContext = createContext<QuestionCreationContextData | null>(null);

export function useQuestionAnswerContext<T>(): QuestionCreationContextData<T> {
    const context = useContext(QuestionAnswerContext);
    if (!context) throw new Error("useQuestionAnswerContext must be used within a QuestionAnswerContextProvider");
    return context as unknown as QuestionCreationContextData<T>;
}

export default QuestionAnswerContext;
