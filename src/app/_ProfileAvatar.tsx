"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import Profile from "@/lib/supabase/models/Profile";
import { createSupabaseClient } from "@/lib/supabase/client";

export default function ProfileAvatar({ profile }: { profile: Profile }) {
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
            />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
                <p className="font-semibold">Signed in as {profile.name}</p>
            </DropdownItem>
            <DropdownItem key="settings">My courses</DropdownItem>
            <DropdownItem key="configurations">Settings</DropdownItem>
            <DropdownItem key="logout" color="danger"
                          onClick={() => createSupabaseClient().auth.signOut().then(() => location.reload())}>
                Log Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}