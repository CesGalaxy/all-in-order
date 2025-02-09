"use client";

import { DrawerBody, DrawerContent, DrawerFooter, DrawerHeader } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { IconCalendarPlus } from "@tabler/icons-react";
import { Input, Textarea } from "@heroui/input";
import { Radio, RadioGroup } from "@heroui/radio";
import { cn } from "@heroui/theme";

const EVENT_TYPES = [
    { value: "task", name: "Task", info: "Manage all your TODOs" },
    { value: "event", name: "Event", info: "Something important!" },
    { value: "reminder", name: "Reminder", info: "Remember important things" },
]

export default function CreateSubjectEventDrawer() {
    return <DrawerContent as="form">{onClose => <>
        <DrawerHeader>New event</DrawerHeader>
        <DrawerBody>
            <Input
                label="Title"
                placeholder="Enter title"
                required
            />
            <Textarea
                label="Description"
                placeholder="Enter description"
                required
            />
            <RadioGroup name="event_type" defaultValue="task">
                {EVENT_TYPES.map(t => <Radio
                    key={t.value}
                    value={t.value}
                    description={t.info}
                    classNames={{
                        base: cn(
                            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                            "flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-1 border-2 border-transparent",
                            "data-[selected=true]:border-primary pr-4",
                        ),
                    }}
                >{t.name}</Radio>)}
            </RadioGroup>
        </DrawerBody>
        <DrawerFooter>
            <Button color="danger" size="lg" variant="light" onPress={onClose} type="button">Cancel</Button>
            <Button
                color="primary"
                size="lg"
                startContent={<IconCalendarPlus/>}
                type="submit"
            >Schedule</Button>
        </DrawerFooter>
    </>}</DrawerContent>
}