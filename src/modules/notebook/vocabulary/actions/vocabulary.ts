"use server";

import getSupabase from "@/supabase/server";
import { handleSingleResponse } from "@/lib/helpers/supabase";
import { revalidatePath } from "next/cache";

export interface NewNotebookVocabularyDefinition {
    term: string;
    definition: string;
    // notes?: string;
}

export interface NewNotebookVocabularyArea {
    name: string;
    description: string;
    icon: string;
}

export async function addNotebookVocabularyDefinitions(area: number, definitions: NewNotebookVocabularyDefinition[]) {
    const supabaseClient = await getSupabase();
    const response = await supabaseClient
        .from("nb_vocab_definitions")
        .insert(definitions.map(d => ({ ...d, area })));

    if (!response.error) revalidatePath("/topics/[topicId]/notebook", "layout");

    return handleSingleResponse(response);
}

export async function addNotebookVocabularyAreas(notebookId: number, areas: NewNotebookVocabularyArea[]) {
    const supabaseClient = await getSupabase();
    const response = await supabaseClient
        .from("nb_vocab_areas")
        .insert(areas.map(area => ({ ...area, notebook: notebookId })));

    if (!response.error) revalidatePath("/topics/[topicId]/notebook", "layout");

    return handleSingleResponse(response);
}