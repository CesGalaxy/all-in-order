"use client";

import { api } from "@/trpc/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@repo/ui/components/accordion";
import { Button } from "@repo/ui/components/button";
import createSupabaseClient from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { type UserIdentity } from "@supabase/supabase-js";
import { buildAuthRedirectUrl } from "@/modules/user/auth/utils";

export default function SettingsConnectedAccounts() {
    // This component is a placeholder for connected accounts settings.
    const [{ identities }] = api.settings.account.getConnectedAccounts.useSuspenseQuery();
    const pathname = usePathname();

    const relinkNotion = async (identity: UserIdentity) => {
        const sb = createSupabaseClient();

        const { error: unlinkError } = await sb.auth.unlinkIdentity(identity);

        if (unlinkError) {
            toast.error("Error unlinking Notion identity: " + unlinkError.message);
            return;
        }

        const { error: linkError } = await sb.auth.linkIdentity({
            provider: "notion",
            options: { redirectTo: buildAuthRedirectUrl("notion", pathname) },
        });

        if (linkError) {
            toast.error("Error linking Notion identity: " + linkError.message);
            return;
        }
    }

    return <>
        <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={identities[1]!.id}
        >
            {identities.map(identity => <AccordionItem key={identity.id} value={identity.id}>
                <AccordionTrigger className="uppercase">{identity.provider}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p className="text-muted-foreground">
                        <strong>Linked at:</strong> {new Date(identity.created_at!).toLocaleDateString()}
                    </p>
                    {identity.provider === "notion" && <Button onClick={() => relinkNotion(identity)}>Update allowed pages</Button>}
                    {/*<pre className="">*/}
                    {/*    {JSON.stringify(identity.identity_data, null, 2)}*/}
                    {/*</pre>*/}
                </AccordionContent>
            </AccordionItem>)}
        </Accordion>
    </>
}