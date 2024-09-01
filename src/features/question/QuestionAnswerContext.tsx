import { createContext, useContext } from "react";
import { Answer } from "@/features/question/Question";

export interface QuestionCreationContextData {
    answer: Answer | null;
    setAnswer: (answer: Answer | null) => void;
}

const QuestionAnswerContext = createContext<QuestionCreationContextData | null>(null);

export function useQuestionAnswerContext() {
    const context = useContext(QuestionAnswerContext);
    if (!context) throw new Error("useQuestionAnswerContext must be used within a QuestionAnswerContextProvider");
    return context;
}

export default QuestionAnswerContext;
