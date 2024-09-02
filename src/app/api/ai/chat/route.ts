import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages: rawMessages } = await req.json();

    const model = google('gemini-1.5-flash');

    const result = await streamText({
        model,
        messages: convertToCoreMessages(rawMessages),
    });

    return result.toDataStreamResponse();
}