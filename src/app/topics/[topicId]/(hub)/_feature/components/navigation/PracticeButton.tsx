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
import { useTranslations } from "next-intl";

export default function PracticeButton({ practiceId, ready }: { practiceId: number, ready: boolean }) {
    const t = useTranslations();

    return <Dropdown>
        <DropdownTrigger>
            <Button color="primary" className="w-full">
                {t('App.practice')}
            </Button>
        </DropdownTrigger>
        <DropdownMenu disabledKeys={ready ? [] : ["start", "quick"]}>
            <DropdownSection title={t('App.practice')} showDivider>
                <DropdownItem
                    href={`/practices/${practiceId}/start`}
                    startContent={<IconPlayerPlay/>}
                    description="All questions"
                    color="primary"
                    className="text-primary"
                    key="start"
                >
                    Start now
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/quick`}
                    startContent={<IconMeteor/>}
                    description="Just half of the questions"
                    key="quick"
                >
                    {t("Dash.Practice.quick")}
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title="Your history" showDivider>
                <DropdownItem
                    href={`/practices/${practiceId}/attempts`}
                    startContent={<IconHistory/>}
                    description="Review your previous attempts"
                >
                    {t('App.attempts')}
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/stats`}
                    startContent={<IconChartHistogram/>}
                    description="Check how you have evolved"
                >
                    Progress & stats
                </DropdownItem>
            </DropdownSection>
            <DropdownSection title={t('Global.options')}>
                <DropdownItem
                    href={`/practices/${practiceId}`}
                    startContent={<IconEye/>}
                    description="Preview & edit the questions"
                >
                    Details
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/edit`}
                    startContent={<IconEdit/>}
                    description="Edit the practice details"
                >
                    {t('Global.edit')}
                </DropdownItem>
                <DropdownItem
                    href={`/practices/${practiceId}/delete`}
                    startContent={<IconTrash/>}
                    description="Permanently delete this practice"
                    color="danger"
                    className="text-danger"
                >
                    {t("Global.delete")}
                </DropdownItem>
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
}