"use server";

import type { Answer } from "@/features/question/Question";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";
import { cache } from "react";

export default interface TopicTestAttempt {
    id: number;
    test_id: number;
    profile_id: number;
    answers: Answer[];
    score: number;
    started_at: number;
    ended_at: number;
}

export const getTopicTestAttempts = cache(async (topicTestId: number): Promise<TopicTestAttempt[] | null> => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("topic_test_attempts")
        .select("*")
        .eq("test_id", topicTestId);

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
    const supabase = createSupabaseServerClient();

    const { error, data } = await supabase
        .from("topic_test_attempts")
        .insert({
            test_id: topicTestId,
            profile_id: profileId,
            answers,
            score,
            started_at: new Date(startedAt),
            ended_at: new Date(endedAt),
        })
        .select("id")
        .maybeSingle();

    if (error) return error;
    if (!data) throw new Error("WTF! Failed to create topic test attempt");

    revalidatePath("/topics/" + topicTestId);

    return data.id;
}
