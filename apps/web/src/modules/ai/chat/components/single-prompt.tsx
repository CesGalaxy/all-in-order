"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useState } from "react";
import Link from "next/link";
import { mountNotionMCPAuthorizationUrl } from "@/modules/integrations/notion/ai/oauth";

export default function SinglePrompt({action, initialPrompt}: { action: (prompt: string) => Promise<string | null>, initialPrompt: string }) {
    // const { completion, complete, isLoading, error } = useCompletion(aiOptions);

    const [prompt, setPrompt] = useState(initialPrompt);
    const [txt, setTxt] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const submit = async () => {
        try {
            setTxt(await action(prompt));
        } catch (e) {
            console.error(e);
            setError(e as Error);
        }
    }

    return <div className="grow flex flex-col">
        {error && <p className="text-destructive">{error.message}</p>}
        {error?.message === "Notion token not found. Please connect your Notion account." && <div>
            <Link href={mountNotionMCPAuthorizationUrl(window.location.href)}>Connect Notion</Link>
        </div>}
        {txt
            ? <div className="prose prose-invert max-w-none p-4 overflow-y-auto grow">{txt}</div>
            : <div>
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt..." />
                <Button onClick={submit}>{'Generate Response'}</Button>
            </div>
        }
    </div>;
}