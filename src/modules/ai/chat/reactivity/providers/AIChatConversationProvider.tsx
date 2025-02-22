"use client";

import { PropsWithChildren, useMemo } from "react";
import AIChatConversationContext from "@/modules/ai/chat/reactivity/context/AIChatConversationContext";
import { useChat } from "ai/react";
import { ActionResponse } from "@/lib/helpers/form";
import { v4 } from "uuid";
import { toast } from "react-toastify";

export default function AIChatConversationProvider({ children, topicId, startConversationAction, }: PropsWithChildren<{
    topicId: number,
    startConversationAction?: () => Promise<ActionResponse<any>>,
}>) {
    const id = useMemo(() => v4(), []);

    const chat = useChat({
        id,
        body: { id },
        api: `/topics/${topicId}/ai/api/chat`,
        sendExtraMessageFields: true,
        generateId: v4,
        onError: (error) => {
            console.error(error);
            toast.error('An error occurred, please try again!');
        },
    });

    return <AIChatConversationContext value={{ chat }}>{children}</AIChatConversationContext>
}