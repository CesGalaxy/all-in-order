"use client";

import { use } from "react";
import AIChatConversationContext from "@/modules/ai/chat/reactivity/context/AIChatConversationContext";

export default function useAIChatConversation() {
    const context = use(AIChatConversationContext);
    if (!context) throw new Error("useAIChatConversation must be used within a AIChatConversationProvider");
    return context;
}