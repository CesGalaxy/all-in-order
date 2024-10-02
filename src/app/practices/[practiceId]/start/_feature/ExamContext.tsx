"use client";

import {
    createContext,
    Dispatch,
    type ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import { QuestionAnswer, QuestionAttempt, QuestionData } from "@/features/beta_question";

export interface Activity {
    id: number;
    tags: string[];
    data: QuestionData;
    attempt: QuestionAttempt;
    answer?: QuestionAnswer;
    answerDraft?: QuestionAnswer;
    correct?: boolean;
}

export interface ExamContextData {
    readonly activities: Activity[];
    readonly currentActivityIndex: number;
    readonly setCurrentActivityIndex: Dispatch<SetStateAction<number>>;
    readonly currentActivity: Activity;
    readonly updateCurrentActivity: (activity: Partial<Activity>) => void;
    readonly startedAt: number;
}

const ExamContext = createContext<ExamContextData | null>(null);

export default ExamContext;

export interface ExamProviderProps {
    activities: Omit<Activity, "answer" | "answerDraft" | "correct">[],
    children: ReactNode,
    startedAt: number
}

export function ExamProvider({ activities: rawActivities, children, startedAt }: ExamProviderProps) {
    useEffect(() => {
        if (rawActivities.length === 0) throw new Error("activities must not be empty");
    }, [rawActivities.length]);

    const [activities, setActivities] = useState<Activity[]>(rawActivities);

    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

    const currentActivity = useMemo(() => activities[currentActivityIndex], [activities, currentActivityIndex]);

    const updateCurrentActivity = useCallback((activity: Partial<Activity>) => setActivities(prev => {
        const newActivities = [...prev];
        newActivities[currentActivityIndex] = { ...newActivities[currentActivityIndex], ...activity };
        return newActivities;
    }), [currentActivityIndex]);

    return <ExamContext.Provider
        value={{
            activities,
            currentActivityIndex,
            setCurrentActivityIndex,
            currentActivity,
            updateCurrentActivity,
            startedAt
        }}>
        {children}
    </ExamContext.Provider>;
}

export function useExam() {
    const context = useContext(ExamContext);
    if (!context) throw new Error("useExam must be used within an ExamProvider");
    return context;
}