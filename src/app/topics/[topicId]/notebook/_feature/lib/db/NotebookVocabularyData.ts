import { Tables } from "@aio/db/supabase";

export type NotebookVocabularyEntity = Tables<"nb_vocabulary"> & NotebookVocabularyData;

export interface NotebookVocabularyData {
    areas: Record<string, NotebookVocabularyArea>;
    definitions: Record<string, NotebookVocabularyDefinition>;
}

export interface NotebookVocabularyDefinition {
    // term: string;
    definition: string;
    notes: string;
    area: string;
    hidden: boolean;
}

export interface NotebookVocabularyArea {
    // name: string;
    description: string;
    color: string;
    icon: string;
}