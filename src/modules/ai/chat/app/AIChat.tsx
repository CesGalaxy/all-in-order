"use client";

import AIChatPromptInputWithActionsBottom from "@/modules/ai/chat/components/AIChatPromptInputWithActionsBottom";
import React from "react";
import AIChatConversation from "@/modules/ai/chat/components/AIChatConversation";

export default function AIChat() {
    return <div className="flex flex-col gap-2 w-full">
        <div className="bg-background rounded-md p-2 flex h-full w-full max-w-full flex-col gap-8 grow">
            {/*<AIChatEmpty/>*/}
            <AIChatConversation/>
        </div>
        <div className="flex flex-col gap-2 bg-background rounded-md p-2 w-full sticky bottom-0">
            <AIChatPromptInputWithActionsBottom/>
            <p className="px-2 text-tiny text-default-400">
                Acme AI can make mistakes. Consider checking important information.
            </p>
        </div>
    </div>;
}