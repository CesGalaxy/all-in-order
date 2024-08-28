import { z } from "zod";

export const FORM_SCHEMAS = {
    EMAIL: z.string().email(),
    PASSWORD: z.string().min(8).max(64),
}

export function getFormFields<T extends string>(formData: FormData, fields: T[]) {
    const formFields: Record<T, string> = {} as Record<T, string>;
    fields.forEach((field) => {
        formFields[field] = formData.get(field) as string
    })
    return formFields
}
