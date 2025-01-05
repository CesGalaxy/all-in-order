import { Tables } from "@aio/db/supabase";

export type NotebookEntity = Tables<"notebooks">;
export type NotebookVocabularyAreaEntity = Tables<"nb_vocab_areas">;
export type NotebookVocabularyDefinitionEntity = Tables<"nb_vocab_definitions">;

export interface NotebookData extends NotebookEntity {
    areas: NotebookVocabularyAreaData[];
}

export interface NotebookVocabularyAreaData extends NotebookVocabularyAreaEntity {
    definitions: NotebookVocabularyDefinitionEntity[];
}

export type NotebookNoteEntity = Tables<"nb_notes">;