import z from "zod";

export const CREATE_WORKSPACE_SCHEMA = z.object({
    name: z.string().min(1, "Workspace name is required").max(24),
})