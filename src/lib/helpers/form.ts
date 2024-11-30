import { z } from "zod";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export const FORM_SCHEMAS = {
    EMAIL: z.string().email(),
    PASSWORD: z.string().min(8).max(64),
}

export function getFormFields<T extends string>(formData: FormData, fields: T[]) {
    const formFields: Record<T, File | string | null> = {} as Record<T, File | string | null>;
    fields.forEach(field => {
        formFields[field] = formData.get(field)
    })
    return formFields
}

export function validateForm<F extends string, S extends z.ZodType>(schema: S, fields: F[], formData: FormData): {
    receivedData: Record<F, string | File | null>
} & (
    // TODO: Return ActionErrors instead
    | { validationError: FailedActionResponse<F | "form">, validatedData: undefined }
    | { validationError: undefined, validatedData: z.TypeOf<S> }
    ) {
    const receivedData = getFormFields<F>(formData, fields);
    const validation: z.SafeParseReturnType<Record<F, string>, z.TypeOf<S>> = schema.safeParse(receivedData);
    return {
        validationError: validation.error && handleZodError<F>(validation.error),
        receivedData,
        validatedData: validation.data
    };
}

export function handleZodError<T extends string>(error: z.ZodError<{ [K in T]: any }>): FailedActionResponse<T | "form"> {
    const { formErrors, fieldErrors } = error.flatten();
    return mountActionError({ form: formErrors, ...fieldErrors } as any) as FailedActionResponse<T | "form">;
}

export function handleSupabaseResponse<T extends any, R extends any = any, E extends string = "db">(
    result: PostgrestSingleResponse<T>,
    handleSuccess: (data: T) => R,
    errorKey?: E
): ActionResponse<R, string extends E ? "db" : E> {
    const { data, error } = result;

    if (error) return mountActionError({ [errorKey || "db"]: [error.message] });
    return mountActionSuccess(handleSuccess ? handleSuccess(data) : data) as any;
}

export function mountActionError<T extends string>(errors: ActionErrors<T>): FailedActionResponse<T> {
    return { ok: false, errors }
}

export function mountActionSuccess<T>(data: T, comments?: string[]): SuccessfulActionResponse<T> {
    return { ok: true, data, comments }
}

export type ActionResponse<T, E extends string = string> =
    | (T extends never ? never : SuccessfulActionResponse<T>)
    | FailedActionResponse<E>;

export interface SuccessfulActionResponse<T> {
    ok: true;
    data: T;
    comments?: string[];
}

export interface FailedActionResponse<E extends string = string> {
    ok: false;
    errors?: ActionErrors<E>;
}

export type ActionErrors<E extends string> = Partial<Record<E, string[]>>;

export type FormActionState<R extends ActionResponse<any>> = { submitted: false } | ({ submitted: true } & R);
export type AutoFormActionState<T, E extends string = string> = FormActionState<ActionResponse<T, E>>;

// export interface InputErrorValidationProps {
//     isInvalid: true;
//     errorMessage: string;
// }
// export function getInputValidationProps<T extends string>(key: T, response?: ActionResponse<T, any>): InputErrorValidationProps | {} {
//     if (!response) return { isInvalid: "shit" };
//     return (!response || response.ok || !response.errors || !response.errors[key])
//         ? { isInvalid: false }
//         : { isInvalid: true, errorMessage: response.errors[key]!.join("; ").concat(".") };
// }
