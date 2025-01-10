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
import { toast } from "react-toastify";
import { Question, QuestionAnswer, QuestionAttempt } from "@/modules/learn/question";

export interface Activity {
    id: number;
    tags: string[];
    data: Question;
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
    readonly animationDirection: -1 | 0 | 1;
    readonly setAnimationDirection: Dispatch<SetStateAction<-1 | 0 | 1>>;
    readonly nextActivity: () => void;
    readonly prevActivity: () => void;
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

    const [animationDirection, setAnimationDirection] = useState<-1 | 0 | 1>(0);

    const nextActivity = useCallback(() => {
        if (currentActivityIndex === activities.length - 1) return;
        setAnimationDirection(1);
        setCurrentActivityIndex(currentIndex => currentIndex + 1);
    }, [activities.length, currentActivityIndex]);

    const prevActivity = useCallback(() => {
        if (currentActivityIndex === 0) return;
        setAnimationDirection(-1);
        setCurrentActivityIndex(currentIndex => currentIndex === 0 ? currentIndex : currentIndex - 1);
    }, [currentActivityIndex]);

    return <ExamContext.Provider
        value={{
            activities,
            currentActivityIndex,
            setCurrentActivityIndex,
            currentActivity,
            updateCurrentActivity,
            startedAt,
            submitAnswers,
            animationDirection,
            setAnimationDirection,
            nextActivity,
            prevActivity,
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