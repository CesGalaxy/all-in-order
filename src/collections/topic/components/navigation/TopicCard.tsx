"use client";

import { Topic } from "@/lib/supabase/entities";
import { Card, CardFooter, CardHeader } from "@heroui/card";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { IconDownload, IconEdit, IconPrinter, IconShare } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Tooltip } from "@heroui/tooltip";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">;

export interface TopicCardProps {
    topic: RequiredTopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
    const t = useTranslations();
    const router = useRouter();

    const topicPath = '/topics/' + topic.id;

    return <Card as="section" isPressable onPress={() => router.push(topicPath)}
                 onMouseEnter={() => router.prefetch(topicPath)}>
        <CardHeader className="flex-col items-start" as="header">
            <h2 className="font-bold text-3xl">{topic.title}</h2>
            {topic.description && <small className="text-default-500">{topic.description}</small>}
        </CardHeader>
        <Divider/>
        <CardFooter as="footer" className="justify-between flex-wrap gap-x-8">
            <Link className="text-primary hover:underline pl-2" href={topicPath + '/ai/chat'} showAnchorIcon isDisabled>
                {t('AI.chat_with')}
            </Link>
            <nav className="flex items-center gap-4">
                <Tooltip content={t('Global.content')}>
                    <Button isIconOnly variant="light" as={Link} href={topicPath + "/summary"}><IconPrinter/></Button>
                </Tooltip>
                <Tooltip content={t('Global.download')}>
                    <Button isIconOnly variant="light"><IconDownload/></Button>
                </Tooltip>
                <Tooltip content={t('Global.share')}>
                    <Button isIconOnly variant="light"><IconShare/></Button>
                </Tooltip>
                <Tooltip content={t('Global.settings')}>
                    <Button isIconOnly as={Link} href={topicPath + "/settings"}><IconEdit/></Button>
                </Tooltip>
            </nav>
        </CardFooter>
    </Card>;
}