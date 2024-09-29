import { redirect } from "next/navigation";

/**
 * If the given argument is null or undefined, it will redirect to the specified path.
 * @param result The result to check.
 * @param redirectPath The path to redirect to if the result is null or undefined.
 * @returns The result (not null nor undefined).
 */
export default function required<T>(result?: T | null, redirectPath = "/"): T {
    return result ?? redirect(redirectPath);
}