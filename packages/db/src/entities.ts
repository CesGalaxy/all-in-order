import { Tables } from "./types/database";

export type Profile = Tables<"profiles">;

export type Course = Tables<"courses">;
export type CourseMember = Tables<"course_members">;

export type Subject = Tables<"subjects">;
export type SubjectNote = Tables<"subject_notes">;

export type Topic = Tables<"topics">;

export type Practice = Tables<"practices">;