import { createContext, useContext } from "react";
import { Question } from "@/features/question/BaseQuestion";

export interface QuestionCreationContextData {
    question?: Question;
    setQuestion: (question?: Question) => void;
}

const QuestionCreationContext = createContext<QuestionCreationContextData | null>(null);

export function useQuestionCreationContext() {
    const context = useContext(QuestionCreationContext);
    if (!context) throw new Error("useQuestionCreationContext must be used within a QuestionCreationContextProvider");
    return context;
}

export default QuestionCreationContext;
