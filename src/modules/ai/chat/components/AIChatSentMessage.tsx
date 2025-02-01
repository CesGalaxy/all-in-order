export default function AIChatSentMessage({ content }: { content: string }) {
    return <article className="flex gap-2 w-2/3 self-end">
        <div className="bg-red-200 grow text-end">
            <div>{content}</div>
            <footer></footer>
        </div>
        <div className="h-8 w-8 rounded-lg bg-red-500"></div>
    </article>
}