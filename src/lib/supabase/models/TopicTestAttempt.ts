"use server";

import type { Answer } from "@/features/question/Question";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { PostgrestError } from "@supabase/supabase-js";

export default interface TopicTestAttempt {
    id: number;
    topicTestId: number;
    profileId: number;
    answers: Answer[];
    score: number;
    startedAt: number;
    endedAt: number;
}

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
