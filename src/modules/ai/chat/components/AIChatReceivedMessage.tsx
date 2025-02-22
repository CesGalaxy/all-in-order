export default function AIChatReceivedMessage({ content, reasoning }: { content: string, reasoning?: string }) {
    return <article className="flex gap-2 w-2/3">
        <div className="h-8 w-8 rounded-lg bg-primary-500 shrink-0"></div>
        <div className="bg-content2 text-content2-foreground grow p-2 rounded">
            {reasoning && <pre className="max-w-full text-wrap text-sm mb-4 pl-4">{reasoning.trim()}</pre>}
            <div>{content}</div>
            <footer></footer>
        </div>
    </article>
}