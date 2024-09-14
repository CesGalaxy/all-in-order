"use server";

import type { Answer } from "@/features/question/Question";
import { getMyProfile } from "@/lib/supabase/models/Profile";
import { redirect } from "next/navigation";
import { createTopicTestAttemptAndReturn } from "@/lib/supabase/models/TopicTestAttempt";
import { PostgrestError } from "@supabase/supabase-js";

export default async function finish_attempt(testId: number, startedAt: number, answers: Answer[]): Promise<number | PostgrestError> {
    const profile = await getMyProfile() || redirect("/login");

    const endedAt = Date.now();

    return await createTopicTestAttemptAndReturn(testId, profile.id, answers, 0, startedAt, endedAt);
}