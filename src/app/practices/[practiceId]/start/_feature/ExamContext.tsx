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
import { QuestionAnswer, QuestionAttempt, QuestionData } from "@aio/db/features/questions";
import { toast } from "react-toastify";

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
    readonly submitAnswers: (answers: [QuestionAnswer, boolean][]) => Promise<string | undefined>;
}

const ExamContext = createContext<ExamContextData | null>(null);

export default ExamContext;

export interface ExamProviderProps {
    activities: Omit<Activity, "answer" | "answerDraft" | "correct">[],
    children: ReactNode,
    startedAt: number,
    finishExam: (answers: [QuestionAnswer, boolean][]) => Promise<string>;
}

function ExamProvider({ activities: rawActivities, children, startedAt, finishExam }: ExamProviderProps) {
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

    const submitAnswers = useCallback(async (answers: [QuestionAnswer, boolean][]) => {
        if (!activities.every(activity => activity.answer)) {
            toast("Please answer all questions before submitting", { type: "error" });
            return;
        }

        return await finishExam(answers);
    }, [activities, finishExam]);

    return <ExamContext.Provider
        value={{
            activities,
            currentActivityIndex,
            setCurrentActivityIndex,
            currentActivity,
            updateCurrentActivity,
            startedAt,
            submitAnswers
        }}>
        {children}
    </ExamContext.Provider>;
}

export function useExam() {
    const context = useContext(ExamContext);
    if (!context) throw new Error("useExam must be used within an ExamProvider");
    return context;
}

export { ExamProvider };