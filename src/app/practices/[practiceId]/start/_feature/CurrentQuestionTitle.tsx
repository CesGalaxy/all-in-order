"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";

export default function CurrentQuestionTitle() {
    const { currentActivity: { data: { title, details } } } = useExam();

    return <header className="text-lg font-medium text-inherit">
        <p>{title}</p>
        {details && <p className="text-sm text-gray-500">{details}</p>}
    </header>;
}