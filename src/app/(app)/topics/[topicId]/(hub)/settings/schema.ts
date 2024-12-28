import { z } from "zod";

export const UPDATE_TOPICS_SETTINGS_SCHEMA = z.object({
    title: z.string().min(3).max(64),
    description: z.string().max(512),
}).strict();