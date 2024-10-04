"use client";

import { useExam } from "@/app/practices/[practiceId]/start/_feature/ExamContext";
import { AnimatePresence, motion } from "framer-motion";

export default function CurrentQuestionTitle() {
    const { currentActivity: { id, data: { title, details } } } = useExam();

    return <AnimatePresence initial={false}>
        <motion.header
            key={id}
            className="text-lg font-medium text-inherit w-full top-0"
            style={{ gridArea: "1 / 1 / 2 / 2" }}
            initial={{ opacity: 0, height: 28, zIndex: 0 }}
            animate={{ opacity: 1, height: "auto", zIndex: 1 }}
            exit={{ opacity: 0, height: 28, zIndex: 0 }}
            transition={{ duration: 0.2 }}
        >
            <p>{title}</p>
            {details && <p className="text-sm text-gray-500">{details}</p>}
        </motion.header>
    </AnimatePresence>;
}