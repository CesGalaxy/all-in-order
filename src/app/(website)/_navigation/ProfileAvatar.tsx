"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IconAt, IconBrightness, IconLayoutDashboard, IconLogout, IconTool, IconUser } from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";
import { Profile } from "@/lib/supabase/entities";
import { useTheme } from "next-themes";

export default function ProfileAvatar({ profile }: { profile: Profile }) {
    const t = useTranslations();
    const { resolvedTheme, setTheme } = useTheme();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Dropdown placement="bottom-end">
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
                <DropdownItem key="profile" onPress={onOpen} className="font-semibold">
                    {t('Auth.signed_in_as', { identity: profile.name })}
                </DropdownItem>
                <DropdownItem key="settings" href="/courses" startContent={<IconLayoutDashboard/>}>
                    {t('Dash.my_content.courses')}
                </DropdownItem>
                <DropdownItem key="configurations" startContent={<IconTool/>}>
                    {t('Global.settings')}
                </DropdownItem>
                <DropdownItem
                    key="theme"
                    startContent={<IconBrightness/>}
                    onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                >
                    {t("App.Actions.theme_change")}
                </DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={() => createSupabaseClient().auth.signOut().then(() => location.reload())}
                    startContent={<IconLogout/>}
                >
                    {t('Auth.logout')}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>{(onClose) => <>
                <ModalHeader className="flex flex-col gap-1">My Profile</ModalHeader>
                <ModalBody>
                    <Input
                        isReadOnly
                        startContent={<IconUser/>}
                        defaultValue={profile.name}
                        label="Name"
                        placeholder="Name"/>
                    <Input
                        isReadOnly
                        startContent={<IconAt/>}
                        defaultValue={profile.username}
                        label="Username"
                        placeholder="Username"/>
                    <Divider/>
                    <Textarea
                        isReadOnly
                        defaultValue={profile.bio || ""}
                        label="Bio"
                        placeholder="Bio"/>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        {t("Global.close")}
                    </Button>
                </ModalFooter>
            </>}</ModalContent>
        </Modal>
    </>;
}