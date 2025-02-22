"use server";

import getSupabase from "@/lib/supabase/server";

export default async function Page({ params }: { params: Promise<{ topicId: string, conversationId: string }> }) {
    const { topicId, conversationId } = await params;

    const sb = await getSupabase();

    return <p>hello</p>
}