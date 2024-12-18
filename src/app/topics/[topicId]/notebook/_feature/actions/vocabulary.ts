"use server";

import getSupabase from "@/supabase/server";
import { handleSingleResponse } from "@/lib/helpers/supabase";

export interface NewNotebookVocabularyDefinition {
    term: string;
    definition: string;
    notes?: string;
    area?: number;
}

export interface NewNotebookVocabularyArea {
    name: string;
    description: string;
    icon: string;
}

export async function addNotebookVocabularyDefinitions(notebookId: number, definitions: NewNotebookVocabularyDefinition[]) {
    const supabaseClient = await getSupabase();
    const response = await supabaseClient
        .from("nb_vocab_definitions")
        .insert(definitions.map(def => ({ ...def, notebook: notebookId })));

    return handleSingleResponse(response);
}

export async function addNotebookVocabularyAreas(notebookId: number, areas: NewNotebookVocabularyArea[]) {
    const supabaseClient = await getSupabase();
    const response = await supabaseClient
        .from("nb_vocab_areas")
        .insert(areas.map(area => ({ ...area, notebook: notebookId, color: 0, notes: "" })));

    return handleSingleResponse(response);
}