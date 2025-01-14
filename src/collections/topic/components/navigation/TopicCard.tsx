"use client";

import { Topic } from "@aio/db/entities";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { useTranslations } from "next-intl";
import { useTransitionRouter } from "next-view-transitions";
import { Button } from "@nextui-org/button";
import { IconDownload, IconEdit, IconPrinter, IconShare } from "@tabler/icons-react";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">;

export interface TopicCardProps {
    topic: RequiredTopic;
}

export default function TopicCard({ topic }: TopicCardProps) {
    const t = useTranslations();
    const router = useTransitionRouter();

    const topicPath = '/topics/' + topic.id;

    return <Card as="section" isPressable onPress={() => router.push(topicPath)}>
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
                <Button isIconOnly variant="light"><IconPrinter/></Button>
                <Button isIconOnly variant="light"><IconDownload/></Button>
                <Button isIconOnly variant="light"><IconShare/></Button>
                <Button isIconOnly><IconEdit/></Button>
            </nav>
        </CardFooter>
    </Card>;
}