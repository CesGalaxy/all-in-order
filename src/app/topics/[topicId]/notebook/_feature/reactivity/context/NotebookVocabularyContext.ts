"use client";

import {
    NotebookVocabularyArea,
    NotebookVocabularyData,
    NotebookVocabularyDefinition
} from "@/app/topics/[topicId]/notebook/_feature/lib/db/NotebookVocabularyData";
import { createContext, Dispatch, SetStateAction } from "react";
import { ActionResponse } from "@/lib/helpers/form";

export interface NotebookVocabularyContextValue {
    areas: Record<string, NotebookVocabularyArea>;
    definitions: Record<string, NotebookVocabularyDefinition>;
    setData: Dispatch<SetStateAction<NotebookVocabularyData>>;
    addDefinitions: (definitions: Record<string, NotebookVocabularyDefinition>) => Promise<ActionResponse<null>>;
    showAddDefinitionsModal: () => void;
    loading: boolean;
}

const NotebookVocabularyContext = createContext<NotebookVocabularyContextValue | null>(null);

export default NotebookVocabularyContext;
