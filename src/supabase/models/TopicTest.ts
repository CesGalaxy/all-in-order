"use server";

import { cache } from "react";
import { revalidatePath } from "next/cache";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";
import { TopicTestQuestion } from "@/supabase/models/TopicTestQuestion";

export type TopicTest = Tables<"topic_tests">;
export type TopicTestWQuestions = TopicTest & { questions: TopicTestQuestion[] };

export const getTopicTestByIdWQuestions = cache(async (id: number): Promise<TopicTestWQuestions | null> => {
    const { data } = await getSupabase()
        .from("topic_tests")
        .select("*, questions:topic_test_questions(*)")
        .eq("id", id)
        .returns<TopicTestWQuestions[]>()
        .single();

    return data;
});

export const getAllTopicTests = cache(async (topic_id: number) => {
    const { data } = await getSupabase()
        .from("topic_tests")
        .select()
        .eq("topic_id", topic_id);

    return data;
});

export async function createTopicTest(topic_id: number, name: string, description?: string) {
    const { error } = await getSupabase()
        .from("topic_tests")
        .insert({ topic_id, name, description });

    if (error) return error;

    revalidatePath("/topics/" + topic_id);
}
