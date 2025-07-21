import z from "zod";
// import { zfd } from "zod-form-data";

export const LOGIN_SCHEMA = z.object({
    email: z.email(),
    password: z.string().min(8).max(128),
}).required();

export const SIGNUP_SCHEMA = z.object({
    name: z.string().max(32).nonempty(),
    username: z.string().regex(/^[a-z0-9][a-z0-9._]+[a-z0-9]$/gi).min(3).max(24),
    email: z.email(),
    password: z.string().min(8).max(128),
}).required();