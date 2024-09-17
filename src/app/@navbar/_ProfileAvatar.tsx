"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { createSupabaseClient } from "@/supabase/client";
import { useTranslations } from "next-intl";
import { Profile } from "@/supabase/models";

export default function ProfileAvatar({ profile }: { profile: Profile }) {
    const t = useTranslations();

    return <Dropdown placement="bottom-end">
        <DropdownTrigger>
            <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={profile.name}
                size="sm"
                src={profile.avatar_url || "https://www.gravatar.com/avatar/0?d=mp&f=y"}
                alt={t('Social.Profile.avatar_alt', { name: profile.name })}
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
                <p className="font-semibold">{t('Auth.signed_in_as', { identity: profile.name })}</p>
            </DropdownItem>
            <DropdownItem key="settings">{t('Dash.my_content.courses')}</DropdownItem>
            <DropdownItem key="configurations">{t('Global.settings')}</DropdownItem>
            <DropdownItem
                key="logout"
                color="danger"
                onClick={() => createSupabaseClient().auth.signOut().then(() => location.reload())}
            >
                {t('Auth.logout')}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}