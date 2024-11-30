import { z } from "zod";

export const TOPIC_DOC_NAME = z
    .string()
    .regex(/^[a-z0-9][a-z0-9-. _+&@#$!]*[a-z0-9]$/gmi, "Invalid document name")
    .min(2)
    .max(64);