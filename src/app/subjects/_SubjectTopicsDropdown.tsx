"use client";

import Topic from "@/supabase/models/Topic";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconList } from "@tabler/icons-react";

export default function SubjectTopicsDropdown({ topics }: { topics: Topic[] }) {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly>
                <IconList/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            {topics.map(topic => (
                <DropdownItem key={topic.id} as="a" href={"/topics/" + topic.id}>{topic.title}</DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
}