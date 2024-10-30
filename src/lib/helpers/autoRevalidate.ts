import { revalidatePath } from "next/cache";
import { ActionResponse } from "@/lib/helpers/form";

/**
 * Automatically revalidates the cache at the given paths if the response is successful.
 * @param fn
 * @param path
 * @param type
 */
export default function autoRevalidate<T extends ActionResponse<any, any>, Args extends any[]>(
    fn: (...args: Args) => Promise<T>,
    path: string | string[] = "",
    type?: "layout" | "page"
): (...args: Args) => Promise<T> {
    // Return the modified function
    return async function (...args: Args) {
        "use server";

        // Run the action
        const response = await fn(...args);

        // If the action was successful: for each path provided, revalidate it.
        if (response.ok) typeof path === "string"
            ? revalidatePath(path, type)
            : path.forEach((p) => revalidatePath(p, type));

        // Return the action response
        return response;
    };
}

