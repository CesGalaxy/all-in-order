import z from "zod";

export const LINK_NOTION_PAGE_SCHEMA = z.object({
    pageId: z.string().min(1, "Page ID is required"),
    alias: z.string().optional(),
})