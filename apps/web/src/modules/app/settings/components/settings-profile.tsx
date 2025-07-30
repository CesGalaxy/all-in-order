"use client";

import { api } from "@/trpc/react";

export default function SettingsConnectedAccounts() {
    // This component is a placeholder for connected accounts settings.
    const [{ user, profile }] = api.settings.account.getProfile.useSuspenseQuery();

    return <>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
}