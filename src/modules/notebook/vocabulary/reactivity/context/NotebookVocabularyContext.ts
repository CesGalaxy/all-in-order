"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import { NotebookVocabularyAreaData } from "@/modules/notebook/app/supabase/db/NotebookData";
import {
    NewNotebookVocabularyArea,
    NewNotebookVocabularyDefinition
} from "@/modules/notebook/vocabulary/actions/vocabulary";
import { ActionFunctionState } from "@/reactivity/hooks/useActionFunction";

export interface NotebookVocabularyContextValue {
    areas: NotebookVocabularyAreaData[];
    setAreas: Dispatch<SetStateAction<NotebookVocabularyAreaData[]>>;
    addDefinitionsState: ActionFunctionState<ActionResponse<null>, [area: number, definitions: NewNotebookVocabularyDefinition[]]>
    addAreasState: ActionFunctionState<ActionResponse<null>, [areas: NewNotebookVocabularyArea[]]>
    showAddDefinitionsModal: () => void;
    showAddAreasModal: () => void;
}

const NotebookVocabularyContext = createContext<NotebookVocabularyContextValue | null>(null);

export default NotebookVocabularyContext;
