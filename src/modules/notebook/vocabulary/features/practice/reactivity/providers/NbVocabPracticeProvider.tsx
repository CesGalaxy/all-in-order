"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import NbVocabPracticeContext
    from "@/modules/notebook/vocabulary/features/practice/reactivity/context/NbVocabPracticeContext";
import { NewNotebookVocabularyDefinition } from "@/modules/notebook/vocabulary/actions/vocabulary";

export interface NbVocabPracticeProviderProps extends PropsWithChildren {
    definitions: NewNotebookVocabularyDefinition[];
}

export default function NbVocabPracticeProvider({ children, definitions: defs }: NbVocabPracticeProviderProps) {
    const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
    const currentDefinition = useMemo(
        () => defs[currentDefinitionIndex], [defs, currentDefinitionIndex]);

    const nextDefinition = () => setCurrentDefinitionIndex((currentDefinitionIndex + 1) % defs.length);
    const prevDefinition = () => setCurrentDefinitionIndex((currentDefinitionIndex + defs.length - 1) % defs.length);

    return <NbVocabPracticeContext.Provider
        value={{ currentDefinitionIndex, currentDefinition, nextDefinition, prevDefinition }}>
        {children}
    </NbVocabPracticeContext.Provider>;
}