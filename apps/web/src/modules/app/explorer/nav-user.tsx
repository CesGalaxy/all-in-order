"use client"

import { BadgeCheck, Bell, Blocks, ChevronsUpDown, CreditCard, LogOut, Sparkles, } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage, } from "@repo/ui/components/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@repo/ui/components/sidebar"
import { getMyProfile } from "@/modules/user/auth/server";
import { use, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import createSupabaseClient from "@/lib/supabase/client";
import { toast } from "sonner";
import { buildAuthRedirectUrl } from "@/modules/user/auth/utils";

export default function ExplorerNavUser({ query }: {
    query: ReturnType<typeof getMyProfile>
}) {
    const { isMobile } = useSidebar();
    const { error, user, data } = use(query);
    const pathname = usePathname();

    const connectNotion = useCallback(async () => {
        const sb = createSupabaseClient();

        const {data, error} = await sb.auth.linkIdentity({
            provider: "notion",
            options: { redirectTo: buildAuthRedirectUrl(pathname) },
        });

        console.log(data, error);
    }, [pathname]);

    if (error) return <p>Error getting profile</p>;

    const { email, identities } = user;

    const notionConnected = identities?.some(identity => identity.provider === "notion") || false;

    const unlinkNotion = () => {
        const notionIdentity = user.identities?.find(identity => identity.provider === "notion");
        if (notionIdentity) {
            const sb = createSupabaseClient();
            sb.auth.unlinkIdentity(notionIdentity)
                .then(({ error }) => error ? toast.error("Error unlinking Notion identity:" + error.message) : toast("Notion identity unlinked successfully"))
                .then(() => window.location.reload())
                .catch(console.error);
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={"user.avatar"} alt={data.name}/>
                                <AvatarFallback className="rounded-lg">{data.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{data.name}</span>
                                <span className="truncate text-xs">{email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="start"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={"user.avatar"} alt={data.name}/>
                                    <AvatarFallback className="rounded-lg">{data.name[0]}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{data.name}</span>
                                    <span className="truncate text-xs">{email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                className="hover:bg-gradient-to-r from-primary to-brand-pink hover:text-white! hover:*:text-white!">
                                <Sparkles/>
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <Link href={"/me?from=" + pathname}>
                                    <BadgeCheck/>
                                    Account
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard/>
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            {notionConnected
                                ? <DropdownMenuItem onClick={unlinkNotion} variant="destructive">
                                    <Sparkles/>
                                    Unlink Notion
                                </DropdownMenuItem>
                                : <DropdownMenuItem onClick={connectNotion}>
                                    <Blocks/>
                                    Connect to Notion
                                </DropdownMenuItem>
                            }
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant="destructive">
                            <LogOut/>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
