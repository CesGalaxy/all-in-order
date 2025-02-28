"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IconList } from "@tabler/icons-react";
import { Topic } from "@/lib/supabase/entities";

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