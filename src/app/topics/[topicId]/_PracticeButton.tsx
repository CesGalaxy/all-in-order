"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
    IconChartHistogram,
    IconEdit,
    IconEye,
    IconHistory,
    IconMeteor,
    IconPlayerPlay,
    IconTrash
} from "@tabler/icons-react";

export default function PracticeButton({ practiceId }: { practiceId: number }) {
    return <Dropdown>
        <DropdownTrigger>
            <Button color="primary" className="w-full">
                Practice
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownSection title="Practice" showDivider>
                <DropdownItem
                    href={`/practices/${practiceId}/start`}
                    startContent={<IconPlayerPlay/>}
                    description="All questions"
                    color="primary"
                    className="text-primary"
                >
                    Start now
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/quick`}
                    startContent={<IconMeteor/>}
                    description="Just half of the questions"
                >
                    Quick practice
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Your history" showDivider>
                <DropdownItem
                    href={`/practices/${practiceId}/attempts`}
                    startContent={<IconHistory/>}
                    description="Review your previous attempts"
                >
                    Attempts
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/stats`}
                    startContent={<IconChartHistogram/>}
                    description="Check how you have evolved"
                >
                    Progress & stats
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Options">
                <DropdownItem
                    href={`/practices/${practiceId}`}
                    startContent={<IconEye/>}
                    description="See a resume of the practice"
                >
                    Details
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/edit`}
                    startContent={<IconEdit/>}
                    description="Edit this practice and questions"
                >
                    Edit
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/delete`}
                    startContent={<IconTrash/>}
                    description="Permanently delete this practice"
                    color="danger"
                    className="text-danger"
                >
                    Delete
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}