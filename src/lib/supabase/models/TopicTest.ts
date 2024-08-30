"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cache } from "react";
import { revalidatePath } from "next/cache";
import TopicTestQuestion from "@/lib/supabase/models/TopicTestQuestion";

export default interface TopicTest {
    id: number;
    topic_id: number;
    name: string;
    description?: string;
    created_at: string;
}

export type TopicTestWithQuestions = TopicTest & { questions: TopicTestQuestion[] };

export const getTopicTestByIdWithQuestions = cache(async (id: number): Promise<TopicTestWithQuestions | null> => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("topic_tests")
        .select("*, questions:topic_test_questions(*)")
        .eq("id", id)
        .single();

    return data;
});

export const getAllTopicTests = cache(async (topic_id: number) => {
    const supabase = createSupabaseServerClient();

    const { data } = await supabase
        .from("topic_tests")
        .select("*")
        .eq("topic_id", topic_id);

    return data;
});

export async function createTopicTest(topic_id: number, name: string, description?: string) {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase
        .from("topic_tests")
        .insert({ topic_id, name, description });

    if (error) return error;

    revalidatePath("/topics/" + topic_id);
}
