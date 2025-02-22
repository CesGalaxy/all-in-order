import { extractReasoningMiddleware, type Message, streamText, wrapLanguageModel, } from 'ai';
import { getUser } from "@/lib/supabase/auth/user";
import { ollama } from "ollama-ai-provider";

export const maxDuration = 60;

export async function POST(request: Request) {
    const {
        id,
        messages,
    }: { id: string; messages: Array<Message>; } = await request.json();

    console.log({ id, messages });

    const user = await getUser();

    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const model = wrapLanguageModel({
        model: ollama('deepseek-r1:8b'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
    });

    const result = streamText({
        model,
        system: 'You are a helpful assistant.',
        messages,
    });

    return result.toDataStreamResponse({
        sendReasoning: true,
    });
}
