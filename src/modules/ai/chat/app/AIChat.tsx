"use client";

import AIChatPromptInputWithActionsBottom from "@/modules/ai/chat/app/AIChatPromptInputWithActionsBottom";
import React from "react";
import AIChatConversation from "@/modules/ai/chat/components/AIChatConversation";
import AIChatEmpty from "@/modules/ai/chat/app/AIChatEmpty";
import useAIChatConversation from "@/modules/ai/chat/reactivity/hooks/useAIChatConversation";

export default function AIChat() {
    const { chat: { messages } } = useAIChatConversation();

    return <div className="p-2 grow min-h-full w-full max-w-full flex flex-col gap-2 pb-0">
        <div className="bg-background rounded-md p-2 flex min-h-full w-full max-w-full flex-col gap-8 grow">
            {messages.length === 0 ? <AIChatEmpty/> : <AIChatConversation/>}
        </div>
        <div className="flex flex-col gap-2 bg-background rounded-t-md p-2 w-full sticky bottom-0">
            <AIChatPromptInputWithActionsBottom/>
            <p className="px-2 text-tiny text-default-400">
                AI-0 can make mistakes. Consider checking important information.
            </p>
        </div>
    </div>;
}