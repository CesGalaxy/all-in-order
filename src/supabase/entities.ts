import { Tables } from "@/supabase/database";
import { QuestionData } from "@/features/beta_question";

export type Course = Tables<"courses">;

export type Subject = Tables<"subjects">;
export type SubjectNote = Tables<"subject_notes">;

export type Topic = Tables<"topics">;

export type Practice = Tables<"practices">;
export type PracticeActivity = Tables<"topic_activities"> & { data: QuestionData };