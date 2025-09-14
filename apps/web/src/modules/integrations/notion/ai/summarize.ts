"use server";

import { generateText, stepCountIs } from "ai";
import { google } from "@ai-sdk/google";
import { createNotionMcpClient } from "@/modules/integrations/notion/ai/mcp";
import { cookies } from "next/headers";

export async function summarizeNotionPage(pageId: string, prompt: string = "Summarize this document.") {
    const cookieStore = await cookies();

    const ntToken = cookieStore.get("nt-mcp-token");
    if (!ntToken) throw new Error("Notion token not found. Please connect your Notion account.");

    let ntMCP;
    try {
        ntMCP = await createNotionMcpClient(ntToken.value);

        const tools = await ntMCP.tools();
        console.log("Available tools:", tools);

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            tools,
            // system: `You are a helpful assistant that summarizes Notion pages.
            // You will be given a Notion page content and you will summarize it in a concise manner.
            // The summary should be short and to the point, highlighting the main topics and key points of
            // the page. Do not include any unnecessary details or explanations.
            // The summary should be in markdown format, with headings and bullet points if necessary.
            // If the page is empty, return "No content to summarize."`,
            system: `You are a helpful assistant that will summarize the Notion page (${pageId}) content as the user specifies.`,
            prompt,
            stopWhen: stepCountIs(3),
            // prompt: input,
        });

        console.log("TEXT ================================")
        console.log(text);

        return text;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
    } catch (e: Error) {
        if (e.message === "MCP SSE Transport Error: 401 Unauthorized") {
            cookieStore.delete("nt-mcp-token");
            throw new Error("Notion token not found. Please connect your Notion account.");
        }

        console.log("========================================")
        console.log(e.message)
        console.log(e.name)
        console.log(e.cause)
        console.log(e.stack)
        console.log("========================================")
        throw e;
    } finally {
        await ntMCP?.close().catch();
    }
}