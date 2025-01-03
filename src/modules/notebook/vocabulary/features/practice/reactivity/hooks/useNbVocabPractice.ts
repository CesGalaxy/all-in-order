"use client";

import { useContext } from "react";
import NbVocabPracticeContext
    from "@/modules/notebook/vocabulary/features/practice/reactivity/context/NbVocabPracticeContext";

export default function useNbVocabPractice() {
    const context = useContext(NbVocabPracticeContext)
    if (!context) throw new Error("useNbVocabPractice must be used within a NbVocabPracticeProvider");
    return context;
}