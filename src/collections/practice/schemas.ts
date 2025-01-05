import { z } from "zod";

export const PRACTICE_NAME = z
    .string()
    .min(3)
    .max(64);

export const PRACTICE_DESCRIPTION = z
    .string()
    .max(512);

export const CREATE_PRACTICE_SCHEMA = z.object({
    title: PRACTICE_NAME,
    description: PRACTICE_DESCRIPTION,
}).strict();