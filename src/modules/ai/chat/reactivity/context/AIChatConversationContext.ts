import { createContext } from "react";
import { useChat } from "ai/react";

export interface AIChatConversationContextValue {
    chat: ReturnType<typeof useChat>;
}

const AIChatConversationContext = createContext<AIChatConversationContextValue | null>(null);

export default AIChatConversationContext;