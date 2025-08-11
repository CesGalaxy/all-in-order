import z from "zod";

export const CREATE_NOTEBOOK_SCHEMA = z.object({
    name: z.string().min(1, "Name is required"),
    details: z.string().optional(),
})

export const LINK_NOTION_PAGE_SCHEMA = z.object({
    pageId: z.string().min(1, "Page ID is required"),
    alias: z.string().optional(),
})