"use server";

import AIChat from "@/modules/ai/chat/app/AIChat";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    return <div className="p-2 grow min-h-full w-full max-w-full">
        <AIChat/>
    </div>;
}