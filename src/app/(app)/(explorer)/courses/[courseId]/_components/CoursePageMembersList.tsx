"use server";

import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { IconCrown, IconDots, IconUser } from "@tabler/icons-react";
import { Chip } from "@nextui-org/chip";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export default async function CoursePageMembersList({ request }: {
    request: PromiseLike<PostgrestSingleResponse<{
        profile: { id: number, name: string, username: string },
        is_admin: boolean,
        created_at: string
    }[]>>
}) {
    const { data } = await request;

    // TODO: Handle error
    if (!data) return <p>error</p>;

    return <ul>
        {data.map(member =>
            <Card as="li" key={member.profile!.id}>
                <CardHeader className="flex gap-3">
                    <Image
                        alt="nextui logo"
                        height={40}
                        src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                        width={40}
                    />
                    <div className="flex flex-col flex-grow">
                        <p className="text-md">{member.profile!.name}</p>
                        <p className="text-small text-default-500">@{member.profile!.username}</p>
                    </div>
                    <Button isIconOnly variant="light">
                        <IconDots/>
                    </Button>
                </CardHeader>
                <CardFooter className="flex justify-between items-center gap-4">
                    <Chip
                        size="sm"
                        className="uppercase gap-1"
                        color={member.is_admin ? "primary" : "secondary"}
                        startContent={member.is_admin ? <IconCrown/> : <IconUser/>}
                        radius="sm"
                    >
                        {member.is_admin ? "Admin" : "Member"}
                    </Chip>
                    <span className="text-default-500">
                                Joined on&nbsp;
                        <time dateTime={member.created_at}>{new Date(member.created_at).toDateString()}</time>
                            </span>
                </CardFooter>
            </Card>
        )}
    </ul>
}

CoursePageMembersList.Skeleton = function CoursePageMembersListSkeleton() {
    return <Card as="div">
        <CardHeader className="flex gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"/>
            <div className="flex flex-col flex-grow">
                <div className="w-20 h-4 bg-gray-300 rounded"/>
                <div className="w-10 h-3 bg-gray-300 rounded"/>
            </div>
            <Button isIconOnly variant="light">
                <IconDots/>
            </Button>
        </CardHeader>
        <CardFooter className="flex justify-between items-center gap-4">
            <Chip
                size="sm"
                className="uppercase gap-1"
                color="secondary"
                startContent={<IconUser/>}
                radius="sm"
            >
                Member
            </Chip>
            <span className="text-default-500">
                                Joined on&nbsp;
                <time dateTime="2022-01-01">January 1, 2022</time>
                            </span>
        </CardFooter>
    </Card>;
}
