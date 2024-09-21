"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { createSupabaseClient } from "@/supabase/client";
import { useTranslations } from "next-intl";
import { Profile } from "@/supabase/models/Profile";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IconAt, IconUser } from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";

export default function ProfileAvatar({ profile }: { profile: Profile }) {
    const t = useTranslations();

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
                <DropdownItem key="profile" onClick={onOpen}>
                    <p className="font-semibold">{t('Auth.signed_in_as', { identity: profile.name })}</p>
                </DropdownItem>
                <DropdownItem key="settings" href="/subjects">{t('Dash.my_content.courses')}</DropdownItem>
                <DropdownItem key="configurations">{t('Global.settings')}</DropdownItem>
                <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => createSupabaseClient().auth.signOut().then(() => location.reload())}
                >
                    {t('Auth.logout')}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
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
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
}