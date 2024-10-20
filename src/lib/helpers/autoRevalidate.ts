import { revalidatePath } from "next/cache";

export default function autoRevalidate<T extends any, A extends any[]>(fn: (...args: A) => T, path: string = ""): (...args: A) => T {
    return function (...args: A) {
        revalidatePath(path);
        return fn(...args);
    };
}