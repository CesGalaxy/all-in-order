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

export function mountActionError<T extends string>(errors: ActionErrors<T>): FailedActionResponse<T> {
    return { ok: false, errors }
}

export function mountActionSuccess<T>(data: T, comments?: string[]): SuccessfulActionResponse<T> {
    return { ok: true, data, comments }
}

export type ActionResponse<T, E extends string = string> = SuccessfulActionResponse<T> | FailedActionResponse<E>;

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
