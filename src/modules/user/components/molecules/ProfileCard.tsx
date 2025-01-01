import { Profile } from "@aio/db/entities";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { IconUserEdit } from "@tabler/icons-react";

export default function ProfileCard({ profile }: {
    profile: Pick<Profile, "name" | "username" | "bio" | "avatar_url">
}) {
    return <Card className="w-full">
        <CardHeader className="justify-between">
            <div className="flex gap-5">
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