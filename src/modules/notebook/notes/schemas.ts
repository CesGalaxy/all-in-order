import { z } from "zod";

export const NOTEBOOK_NOTE_TITLE = z.string().min(1).max(64).nullable().catch(null);
export const NOTEBOOK_NOTE_CONTENT = z.string().max(4096);

export const CREATE_NOTEBOOK_NOTE = z.object({
    title: NOTEBOOK_NOTE_TITLE,
    content: NOTEBOOK_NOTE_CONTENT,
}).strict();