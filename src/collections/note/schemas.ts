import { z } from "zod";

export const NOTE_TITLE = z
    .string()
    .trim()
    .max(64, "The title cannot have more than 64 characters");

export const NOTE_CONTENT = z
    .string()
    .trim()
    .max(4096, "The content cannot have more than 4096 characters");

export const CREATE_NOTE_SCHEMA = z.object({
    title: NOTE_TITLE.default(""),
    content: NOTE_CONTENT,
}).strict("The server receives more/less data than expected (title?, content)");