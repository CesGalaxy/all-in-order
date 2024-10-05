import { Tables } from "@/supabase/database";
import { QuestionData } from "@/features/beta_question";

export type SubjectNote = Tables<"subject_notes">;
export type Practice = Tables<"practices">;
export type PracticeActivityEntity = Tables<"topic_activities"> & { data: QuestionData };