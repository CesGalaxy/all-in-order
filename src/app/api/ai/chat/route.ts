import { google } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from "ai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
    const { messages: rawMessages } = await req.json();

    const model = google('gemini-1.5-flash');

    const result = await streamText({
        model,
        messages: convertToCoreMessages(rawMessages),
    });

    return result.toDataStreamResponse();
}