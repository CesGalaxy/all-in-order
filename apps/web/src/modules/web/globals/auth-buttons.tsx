"use server";

import { getMyProfile } from "@/modules/user/auth/server";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export default async function AuthButtons() {
    const {data} = await getMyProfile();

    return data
        ? <>
            <Button size="sm" variant="brand-pink" asChild>
                <Link href={"/app"}>Dashboard</Link>
            </Button>
        </>
        : <>
            <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                asChild
            >
                <Link href={"/login"}>Sign In</Link>
            </Button>
            <Button size="sm" variant="brand-pink" asChild>
                <Link href={"/signup"}>Get Started</Link>
            </Button>
        </>;
}