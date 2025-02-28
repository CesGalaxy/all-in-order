"use server";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { IconUserEdit } from "@tabler/icons-react";
import { getMyProfile } from "@/lib/supabase/auth/profile";

export default async function ProfileCard({}: {
    //profile: Pick<Profile, "name" | "username" | "bio" | "avatar_url">
}) {
    const profile = await getMyProfile();
    return <Card className="w-full">
        <CardHeader className="justify-between">
            <div className="flex gap-4">
                <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={profile.avatar_url || ""}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                        {profile.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                        @{profile.username}
                    </h5>
                </div>
            </div>
            <Button
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconUserEdit/>}
            >
                Edit profile
            </Button>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400" as="p">
            {profile.bio || "No bio"}
        </CardBody>
        <CardFooter className="gap-3">
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">0</p>
                <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">0</p>
                <p className="text-default-400 text-small">Followers</p>
            </div>
        </CardFooter>
    </Card>;
}