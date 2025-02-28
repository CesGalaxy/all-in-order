"use server";

import getSupabase from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getMyProfile } from "@/lib/supabase/auth/profile";
import { Json } from "@aio/db/supabase";
import { mountActionError, mountActionSuccess } from "@/lib/helpers/form";
import { Question } from "@/modules/learn/question";

export async function createActivityAndReturn(topicId: number, question: Question, tags: string[]) {
    const { id } = await getMyProfile();

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
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

export default async function createPracticeActivity(topicId: number, practiceId: number, question: Question, tags: string[]) {
    const errorOrId = await createActivityAndReturn(topicId, question, tags);

    if (typeof errorOrId === "string") return errorOrId;

    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("practice_activities")
        .insert({
            activity_id: errorOrId,
            practice_id: practiceId,
        });

    if (error) return error.message;

    revalidatePath("/practices/" + practiceId);
    revalidatePath("/topics/" + topicId);
}

export async function updatePracticeActivity(topicId: number, activityId: number, question: Question, tags: string[]) {
    const supabaseClient = await getSupabase();
    const { error } = await supabaseClient
        .from("topic_activities")
        .update({ data: question as unknown as Json, tags })
        .eq("id", activityId);

    if (error) return mountActionError({ db: [error.message] });

    revalidatePath("/practices/", "layout");
    return mountActionSuccess(null);
}
