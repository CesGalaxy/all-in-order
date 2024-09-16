"use server";

import { revalidatePath } from "next/cache";
import { Question } from "@/features/question/Question";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";

export type TopicTestQuestion = Tables<"topic_test_questions"> & { data: Question };

export async function createTopicTestQuestion(test_id: number, position: number, data: Question) {
    const { error } = await getSupabase()
        .from("topic_test_questions")
        .insert({ test_id, position, data });

    if (error) return error;

    revalidatePath("/tests/" + test_id);
}
