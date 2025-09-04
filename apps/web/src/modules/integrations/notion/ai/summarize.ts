"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { createNotionMcpClient } from "@/modules/integrations/notion/ai/mcp";
import { cookies } from "next/headers";
import { mountNotionMCPRegistrationUrl } from "@/modules/integrations/notion/ai/oauth";
import { redirect } from "next/navigation";

export async function summarizeNotionPage(pageId: string) {
    const cookieStore = await cookies();

    const ntToken = cookieStore.get("nt-mcp-token");
    if (!ntToken) {
        const ru = mountNotionMCPRegistrationUrl("http://localhost:3000/notebooks/1f947a78-f5f4-4834-bcfd-5d2e2e48de62/p/23ca9650-f165-80b5-acd5-d29888c73ac2");
        redirect(ru);
    }

    try {
        const ntMCP = await createNotionMcpClient(ntToken.value);

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
            prompt: "List all the Notion-related things you can do with the tools provided. For each tool, provide a brief description of what it does and how to use it. Use markdown format with headings and bullet points.",
            // prompt: input,
        });

        await ntMCP.close();

        return text;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
    } catch (e: Error) {
        console.log("========================================")
        console.log(e.message)
        console.log(e.name)
        console.log(e.cause)
        console.log(e.stack)
        console.log("========================================")
        throw e;
    }
}