"use client";

import { useExam } from "@/app/(app)/practices/[practiceId]/start/_feature/ExamContext";
import { AnimatePresence, motion } from "framer-motion";

export default function CurrentQuestionTitle() {
    const { currentActivity: { id, tags, data: { title, details } } } = useExam();

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
            {(details || tags) && <p className="text-sm">
                {tags.map(tag => <span
                    key={tag}
                    className="px-1 bg-content3 rounded-md mr-1 text-content3-foreground"
                >
                    {tag}
                </span>)}
                <span>{details}</span>
            </p>}
        </motion.header>
    </AnimatePresence>;
}