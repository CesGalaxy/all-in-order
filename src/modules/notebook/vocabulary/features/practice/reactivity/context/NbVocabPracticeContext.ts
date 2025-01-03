import { createContext } from "react";
import { NewNotebookVocabularyDefinition } from "@/modules/notebook/vocabulary/actions/vocabulary";

export interface NbVocabPracticeContextValue {
    currentDefinitionIndex: number;
    currentDefinition: NewNotebookVocabularyDefinition;
    nextDefinition: () => void;
    prevDefinition: () => void;
}

const NbVocabPracticeContext = createContext<NbVocabPracticeContextValue | null>(null);
export default NbVocabPracticeContext;