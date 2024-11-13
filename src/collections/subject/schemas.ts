import { z } from "zod";

export const SUBJECT_NAME = z
    .string()
    .trim()
    .min(3, "Subject name must be at least 3 characters long")
    .max(32, "Subject name cannot have more than 32 characters");

export const SUBJECT_DESCRIPTION = z
    .string()
    .max(512, "The subject description cannot have more than 512 characters")
    .trim();

// (-2147483648) (+2147483647)
export const SUBJECT_COLOR = z.number().int().min(-0x7FFFFFFF - 1).max(0x7FFFFFFF);

export const CREATE_SUBJECT_SCHEMA = z.object({
    name: SUBJECT_NAME,
    description: SUBJECT_DESCRIPTION.default(""),
    color: SUBJECT_COLOR,
}).strict("The server receives more/less data than expected (name, description?, color)");

export const UPDATE_SUBJECT_SCHEMA = z.object({
    name: SUBJECT_NAME.optional(),
    description: SUBJECT_DESCRIPTION.optional(),
    // color: SUBJECT_COLOR.optional().nullable(),
});
























