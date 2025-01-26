"use server";

import AIChat from "@/modules/ai/chat/app/AIChat";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    return <AIChat/>
}