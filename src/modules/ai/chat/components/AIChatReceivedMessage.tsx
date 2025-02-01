export default function AIChatReceivedMessage({ content }: { content: string }) {
    return <article className="flex gap-2 w-2/3">
        <div className="h-8 w-8 rounded-lg bg-red-500"></div>
        <div className="bg-red-200 grow">
            <div>{content}</div>
            <footer></footer>
        </div>
    </article>
}