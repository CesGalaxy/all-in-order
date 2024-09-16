"use server";

import type { Answer } from "@/features/question/Question";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";
import { cache } from "react";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";

export type TopicTestAttempt = Tables<"topic_test_attempts"> & { answers: Answer[] };

export const getTopicTestAttempts = cache(async (topicTestId: number): Promise<TopicTestAttempt[] | null> => {
    const { data } = await getSupabase()
        .from("topic_test_attempts")
        .select("*")
        .eq("test_id", topicTestId)
        .returns<TopicTestAttempt[]>();

    return data;
});

export async function createTopicTestAttemptAndReturn(
    topicTestId: number,
    profileId: number,
    answers: Answer[],
    score: number,
    startedAt: number,
    endedAt: number,
): Promise<number | PostgrestError> {
    const { error, data } = await getSupabase()
        .from("topic_test_attempts")
        .insert({
            test_id: topicTestId,
            profile_id: profileId,
            answers,
            score,
            started_at: new Date(startedAt).toISOString(),
            ended_at: new Date(endedAt).toISOString(),
        })
        .select("id")
        .maybeSingle();

    if (error) return error;

    revalidatePath("/topics/" + topicTestId);

    return data!.id;
}
