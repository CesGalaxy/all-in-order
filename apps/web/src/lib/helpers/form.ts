import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
    // This can't be enabled, as @next-safe-action/adapter-react-hook-form won't be
    // able to display the field errors at the form
    // defaultValidationErrorsShape: "flattened"
});

export type PrevState<S extends z.ZodType, I extends string> = {
    inputs?: Record<I, null | FormDataEntryValue>
    errors?: z.inferFlattenedErrors<S>;
}

export function validatedAction<S extends z.ZodType, I extends string>(
    schema: S,
    getRawData: (prevState: PrevState<S, I>, formData: FormData) => Record<I, FormDataEntryValue | null>,
    action: (prevState: PrevState<S, I>, validatedData: z.infer<S>) => Promise<PrevState<S, I>>,
): ((prevState: PrevState<S, I>, formData: FormData) => Promise<PrevState<S, I>>) {
    return async function(prevState: PrevState<S, I>, formData: FormData): Promise<PrevState<S, I>> {
        const rawData = getRawData(prevState, formData);

        const validation = schema.safeParse(rawData);

        // Return early if the form data is invalid
        if (!validation.success) {
            return {
                inputs: rawData,
                errors: validation.error.flatten(),
            } satisfies PrevState<S, I>
        } else {
            return await action(prevState, validation.data);
        }
    }
}