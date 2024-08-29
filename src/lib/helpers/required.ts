import { redirect } from "next/navigation";

export default function required<T>(result?: T | null, redirectPath = "/"): T {
    return result ?? redirect(redirectPath);
}