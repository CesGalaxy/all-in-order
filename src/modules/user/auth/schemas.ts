import { z } from "zod";
import { FORM_SCHEMAS } from "@/lib/helpers/form";

export const LOGIN_SCHEMA = z.object({
    email: FORM_SCHEMAS.EMAIL,
    password: FORM_SCHEMAS.PASSWORD,
});