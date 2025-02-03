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
    },
    {
        id: 4,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 5,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 6,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 7,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 8,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 9,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 11,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 12,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 13,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 14,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 15,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 16,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 17,
        text: 'Hello',
        sender: 'AI',
    },
    {
        id: 18,
        text: 'Hello',
        sender: 'User',
    },
    {
        id: 19,
        text: 'Hello',
        sender: 'AI',
    },
]

export default function AIChatConversation() {
    return <ol className="flex flex-col gap-8">
        {messages.map(msg => <li key={msg.id} className="w-full flex flex-col">
            {msg.sender == "AI" ? <AIChatReceivedMessage content={msg.text}/> : <AIChatSentMessage content={msg.text}/>}
        </li>)}
    </ol>
}