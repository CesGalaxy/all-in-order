import AIChatReceivedMessage from "@/modules/ai/chat/components/AIChatReceivedMessage";
import AIChatSentMessage from "@/modules/ai/chat/components/AIChatSentMessage";
import useAIChatConversation from "@/modules/ai/chat/reactivity/hooks/useAIChatConversation";

export default function AIChatConversation() {
    const { chat: { messages } } = useAIChatConversation();

    return <ol className="flex flex-col gap-8">
        {messages.map(msg => <li key={msg.id} className="w-full flex flex-col">
            {msg.role === "user"
                ? <AIChatSentMessage content={msg.content}/>
                : <AIChatReceivedMessage content={msg.content} reasoning={msg.reasoning}/>}
        </li>)}
    </ol>
}