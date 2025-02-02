import { NextRequest, NextResponse } from "next/server";
import { convertToCoreMessages, streamText } from "ai";
import DocType, { getDocTypeByExtension } from "@/modules/docs/app/DocType";
import getSupabase from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/auth/user";
import { google } from "@ai-sdk/google";

export async function POST(req: NextRequest, { params }: {
    params: Promise<{ topicId: string, docNameEncoded: string }>
}) {
    const { messages: rawMessages } = await req.json();

    let messages = convertToCoreMessages(rawMessages);

    if (!Array.isArray(rawMessages) || rawMessages.length < 2) {
        const { topicId, docNameEncoded } = await params;

        const topicPath = "/topics/" + topicId;

        const docLocatorSegments = docNameEncoded.split("-");
        if (docLocatorSegments.length != 2) return new NextResponse("Invalid document locator", { status: 400 });

        const docOwnership = docLocatorSegments[0] === "m" ? (await getUser(topicPath)).id : "_public";
        const docName = atob(decodeURIComponent(docLocatorSegments[1]));

        const supabaseClient = await getSupabase();
        const { data, error } = await supabaseClient
            .storage
            .from("topic_documents")
            .download(`${topicId}/${docOwnership}/${docName}`);

        if (error) return new Response("Document not found", { status: 404 });

        const content = await data.bytes();
        const type = getDocTypeByExtension(docName.split(".").pop()!);

        if (type !== DocType.MD) return new NextResponse("Only Markdown documents are supported.", { status: 400 });

        messages[0].content = [
            {
                type: "text",
                text: messages[0].content as string,
            },
            {
                type: "file",
                mimeType: "text/plain",
                data: content,
            }
        ]

        messages = [{
            role: "system",
            content: "You will give help only with the provided document. Just use the document you received. English or spanish.",
        }, ...messages]
    }

    // AI RESPONSE

    const model = google("gemini-1.5-flash-latest");

    const result = streamText({
        model,
        messages,
        // system: "You will give help only with the provided document. Just use the document you received. English or spanish.",
        onFinish: async ({ response }) => {
            console.log("AI FINISHED!");
        },
    });

    return result.toDataStreamResponse({ // toDataStreamResponse
        getErrorMessage: errorHandler,
    });
}

function errorHandler(error: unknown) {
    if (error == null) {
        return 'unknown error';
    }

    if (typeof error === 'string') {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return JSON.stringify(error);
}
