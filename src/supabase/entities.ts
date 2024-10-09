import { Tables } from "@/supabase/database";
import { QuestionData } from "@/features/beta_question";

export type Course = Tables<"courses">;
export type Subject = Tables<"subjects">;
export type Topic = Tables<"topics">;
export type SubjectNote = Tables<"subject_notes">;
export type Practice = Tables<"practices">;
export type PracticeActivityEntity = Tables<"topic_activities"> & { data: QuestionData };