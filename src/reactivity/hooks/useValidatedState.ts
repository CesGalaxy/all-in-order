"use client";

import { ZodType } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import useValidation, { ValidationData } from "@/reactivity/hooks/useValidation";

export type ValidatedStateData<T> = [
    value: T,
    setValue: Dispatch<SetStateAction<T>>,
    ...ValidationData
];

export default function useValidatedState<T>(schema: ZodType, initialValue: T): ValidatedStateData<T> {
    // Handle the state
    const [value, setValue] = useState(initialValue);

    // Validate the current value
    const [validationResult, validate, isValid] = useValidation(schema, value);

    // Return the current value and its validation result
    return [value, setValue, validationResult, validate, isValid] as const;
}