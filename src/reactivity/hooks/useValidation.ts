"use client";

import { z } from "zod";
import { useCallback, useMemo } from "react";

export type ValidationResult = string[] | undefined;
export type ValidationFunction = (value: any) => ValidationResult;

export type ValidationData = [validationResult: ValidationResult, validate: ValidationFunction, isValid: boolean];

export default function useValidation(type: z.ZodType, value: any): ValidationData {
    const validate = useCallback((v: any) => {
        return type.safeParse(v).error?.flatten().formErrors;
    }, [type]);

    const validationResult = useMemo(() => validate(value), [validate, value]);

    return [validationResult, validate, !validationResult];
}