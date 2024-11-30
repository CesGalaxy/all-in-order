import { z } from "zod";

export const TOPIC_TITLE = z
    .string()
    .min(1, "Name is required")
    .max(64, "Name is too long");

export const TOPIC_DESCRIPTION = z
    .string()
    .max(512, "Description is too long");

export const CREATE_TOPIC_SCHEMA = z.object({
    title: TOPIC_TITLE,
    description: TOPIC_DESCRIPTION,
}).strict();

export const UPDATE_TOPIC_SCHEMA = CREATE_TOPIC_SCHEMA.partial().strict();