import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export default function Page() {
    return <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
        <Alert variant="destructive" className="w-fit">
            <AlertCircleIcon />
            <AlertTitle>Unable to connect your account.</AlertTitle>
            <AlertDescription>
                <p>If the problem persists, try to:</p>
                <ul className="list-inside list-disc text-sm">
                    <li>Use another browser</li>
                    <li>Log out before trying again</li>
                    <li>Contact support</li>
                </ul>
            </AlertDescription>
        </Alert>
        <Button variant="destructive" className="w-40" asChild>
            <Link href="/app">Go home</Link>
        </Button>
        <span className="text-destructive fixed bottom-1 right-2 text-xs font-mono">🔥 AUTH-007</span>
    </div>
}