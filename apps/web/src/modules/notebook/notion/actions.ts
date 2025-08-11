"use server";

import { actionClient } from "@/lib/helpers/form";
import z from "zod";
import { sbAdminClient, sbServerClient } from "@/lib/supabase/server";
import { returnValidationErrors } from "next-safe-action";
import { canUserAccessNotebook } from "@/modules/notebook/app/server";
import { getNotionClient } from "@/modules/integrations/notion/api";
import { redirect } from "next/navigation";
import { isNotionClientError } from "@notionhq/client";
import { LINK_NOTION_PAGE_SCHEMA } from "@/modules/notebook/notion/schemas";

export const linkNotionPage = actionClient
    .inputSchema(LINK_NOTION_PAGE_SCHEMA)
    .bindArgsSchemas<[notebookId: z.ZodUUID]>([z.uuidv4()])
    .action(async ({ parsedInput: { pageId, alias }, bindArgsParsedInputs: [notebookId] }) => {
        const sb = await sbServerClient();
        const sbAdmin = await sbAdminClient();

        // Check that the user is authenticated
        const { data: { user }, error: userError } = await sb.auth.getUser();
        if (userError) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: [userError.message] });
        if (!user) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["User not authenticated"] });

        // Check that the user has access to the notebook
        const hasAccessToNotebook = await canUserAccessNotebook(user.id, notebookId);

        if (!hasAccessToNotebook) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["You do not have access to this notebook"] });

        // Check how many pages they have linked, sort them by position
        const { data: notebookPages, error: notebookPagesError } = await sb
            .from("notebook_pages")
            .select("id, position")
            .eq("id", notebookId)
            .order("position", { ascending: true });

        if (notebookPagesError) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: [notebookPagesError.message] });
        if (!notebookPages) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["Notebook not found"] });

        // const notebookPages = notebookPages.length;
        if (notebookPages.length >= 5) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["You can only link 5 pages per notebook"] });

        // Check that the page is not already linked
        const { data: existingPage, error: existingPageError } = await sbAdmin
            .from("notebook_pages")
            .select("id")
            .eq("notebook_id", notebookId)
            .eq("id", pageId)
            .maybeSingle();

        if (existingPageError) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: [existingPageError.message] });
        if (existingPage) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["This page is already linked to this notebook"] });

        // Check that the page exists in Notion
        const notionToken = user.app_metadata.notion_access_token;
        if (typeof notionToken !== "string" || notionToken.length === 0) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["You need to connect your Notion account first"] });
        const notionClient = getNotionClient(notionToken);

        try {
            const page = await notionClient.pages.retrieve({ page_id: pageId });

            const { error } = await sbAdmin
                .from("notebook_pages")
                .insert({
                    id: pageId,
                    notebook_id: notebookId,
                    position: notebookPages[0]?.position || 0,
                    alias,
                    cache: page,
                    created_by: user.id,
                })
                .single();

            if (error) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: [error.message] });

            // Redirect to the notebook page
            redirect("/notebooks/" + notebookId + "/p/" + pageId);
        } catch (e) {
            if (isNotionClientError(e)) returnValidationErrors(LINK_NOTION_PAGE_SCHEMA, { _errors: ["The page does not exist in Notion or you do not have access to it"] });
            throw e; // Re-throw unexpected errors or Next.js internal things
        }
    });

export async function unlinkNotionPage(notebookId: string, pageId: string) {
    const sb = await sbServerClient();

    const { error } = await sb
        .from("notebook_pages")
        .delete()
        .eq("id", pageId);

    if (error) throw new Error(error.message);

    // Redirect to the notebook page
    redirect("/notebooks/" + notebookId);
}