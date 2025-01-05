import { z } from "zod";

export const COURSE_NAME = z
    .string()
    .trim()
    .min(3, "Course name must be at least 3 characters long")
    .max(32, "Course name cannot have more than 32 characters");

export const COURSE_DESCRIPTION = z
    .string()
    .max(512, "The course description cannot have more than 512 characters")
    .trim();

export const COURSE_VISIBILITY = z.boolean({
    // message: "The course visibility must be a boolean",
    required_error: "The course visibility is required",
    invalid_type_error: "The course visibility must be a boolean",
});

export const CREATE_COURSE_SCHEMA = z.object({
    name: COURSE_NAME,
    description: COURSE_DESCRIPTION.default(""),
    is_public: COURSE_VISIBILITY.default(false),
}).strict("The server receives more/less data than expected (name, description?, is_public?)");

export const UPDATE_COURSE_SCHEMA = z.object({
    name: COURSE_NAME.optional(),
    description: COURSE_DESCRIPTION.optional(),
    is_public: COURSE_VISIBILITY.optional(),
});