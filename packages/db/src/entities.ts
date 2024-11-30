import { Tables } from "./types/database";
import { QuestionData } from "./features/questions";

export type Profile = Tables<"profiles">;

export type Course = Tables<"courses">;
export type CourseMember = Tables<"course_members">;

export type Subject = Tables<"subjects">;
export type SubjectNote = Tables<"subject_notes">;

export type Topic = Tables<"topics">;

export type Practice = Tables<"practices">;
export type PracticeActivity = Tables<"practice_activities">;
export type TopicActivity = Tables<"topic_activities"> & { data: QuestionData };