"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import { NotebookVocabularyAreaData } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";
import {
    NewNotebookVocabularyArea,
    NewNotebookVocabularyDefinition
} from "@/app/(app)/topics/[topicId]/notebook/_feature/actions/vocabulary";
import { ActionFunctionState } from "@/reactivity/hooks/useActionFunction";

export interface NotebookVocabularyContextValue {
    areas: NotebookVocabularyAreaData[];
    setAreas: Dispatch<SetStateAction<NotebookVocabularyAreaData[]>>;
    addDefinitionsState: ActionFunctionState<ActionResponse<null>, [definitions: NewNotebookVocabularyDefinition[]]>
    addAreasState: ActionFunctionState<ActionResponse<null>, [areas: NewNotebookVocabularyArea[]]>
    showAddDefinitionsModal: () => void;
    showAddAreasModal: () => void;
}

const NotebookVocabularyContext = createContext<NotebookVocabularyContextValue | null>(null);

export default NotebookVocabularyContext;
