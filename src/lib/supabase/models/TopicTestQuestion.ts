"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Question } from "@/features/question/BaseQuestion";

export default interface TopicTestQuestion {
    id: number;
    test_id: number;
    position: number;
    data: Question;
    created_at: string;
}

export async function createTopicTestQuestion(test_id: number, position: number, data: object) {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase
        .from("topic_test_questions")
        .insert({ test_id, position, data });

    if (error) return error;

    revalidatePath("/tests/" + test_id);
}
