"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconList } from "@tabler/icons-react";
import { Topic } from "@aio/db/entities";

export type RequiredTopic = Pick<Topic, "id" | "title">;

export default function CourseCardTopics({ topics }: { topics: RequiredTopic[] }) {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly aria-label="Show subject topics" title="Subject topics">
                <IconList/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            {topics.map(topic =>
                <DropdownItem key={topic.id} as="a" href={"/topics/" + topic.id}>{topic.title}</DropdownItem>
            )}
        </DropdownMenu>
    </Dropdown>
}