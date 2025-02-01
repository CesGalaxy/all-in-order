import AIChatReceivedMessage from "@/modules/ai/chat/components/AIChatReceivedMessage";
import AIChatSentMessage from "@/modules/ai/chat/components/AIChatSentMessage";

const messages = [
    {
        id: 1,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 2,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 3,
        text: 'Hello',
        sender: 'AI',
    }
]

export default function AIChatConversation() {
    return <ol className="flex flex-col gap-8">
        {messages.map(msg => <li key={msg.id} className="w-full flex flex-col">
            {msg.sender == "AI" ? <AIChatReceivedMessage content={msg.text}/> : <AIChatSentMessage content={msg.text}/>}
        </li>)}
    </ol>
}