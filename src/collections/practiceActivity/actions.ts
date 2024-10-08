"use server";

import { QuestionData } from "@/features/beta_question";
import getSupabase from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { getMyProfile } from "@/supabase/models/Profile";
import { Json } from "@/supabase/database";

export async function createActivityAndReturn(topicId: number, question: QuestionData, tags: string[]) {
    const { id } = await getMyProfile();

    const { data, error } = await getSupabase()
        .from("topic_activities")
        .insert({
            topic_id: topicId,
            data: question as unknown as Json,
            tags,
            created_by: id,
        })
        .select("id")
        .single();

    if (error) return error.message;

    return data.id;
}

export default async function createPracticeActivity(topicId: number, practiceId: number, question: QuestionData, tags: string[]) {
    const errorOrId = await createActivityAndReturn(topicId, question, tags);

    if (typeof errorOrId === "string") return errorOrId;

    const { error } = await getSupabase()
        .from("practice_activities")
        .insert({
            activity_id: errorOrId,
            practice_id: practiceId,
        });

    if (error) return error.message;

    revalidatePath("/practices/" + practiceId);
    revalidatePath("/topics/" + topicId);
}