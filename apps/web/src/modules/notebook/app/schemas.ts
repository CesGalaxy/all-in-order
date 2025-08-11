import z from "zod";

export const CREATE_NOTEBOOK_SCHEMA = z.object({
    name: z.string().min(1, "Name is required"),
    details: z.string().optional(),
})
