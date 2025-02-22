"use server";

import React from "react";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/auth/user";
import getSupabase from "@/lib/supabase/server";
import { mountActionError } from "@/lib/helpers/form";
import AIChat from "@/modules/ai/chat/app/AIChat";
import AIChatConversationProvider from "@/modules/ai/chat/reactivity/providers/AIChatConversationProvider";

async function startConversation(topicId: number) {
    "use server";

    const user = await getUser();

    const sb = await getSupabase();
    const { data, error } = await sb.from("ai_conversations").insert({
        user: user.id,
        title: "",
        environment: "topic",
        messages: [],
        tags: [],
        data: {
            topic_id: topicId,
            initial_message: "initialMessage"
        },
    });

    if (error) return mountActionError({ db: [error.message] });

    const id = "";
    redirect(`/app/topics/ai/${id}`);
}

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    return <AIChatConversationProvider
        topicId={parseInt(topicId)}
        startConversationAction={startConversation.bind(null, parseInt(topicId))}
    >
        <AIChat/>
    </AIChatConversationProvider>;
}