"use client";

import { TopicActivity } from "@/lib/supabase/entities";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tooltip } from "@heroui/tooltip";
import {
    Question,
    QUESTION_ATTEMPT_GENERATORS,
    QUESTION_ICONS,
    QUESTION_PREVIEWS,
    QuestionType
} from "@/modules/learn/question";

export interface PracticePageActivitiesProps {
    activities: TopicActivity[];
}

export default function PracticePageActivities({ activities }: PracticePageActivitiesProps) {
    const QuestionIcon = ({ type, className }: { type: QuestionType, className?: string }) => {
        const Icon = QUESTION_ICONS[type];
        return <Icon className={className}/>;
    }

    const PreviewQuestion = <T extends QuestionType, >({ data }: { data: Question<T> }) => {
        const Preview = QUESTION_PREVIEWS[data.type];
        // @ts-ignore
        return <Preview attempt={QUESTION_ATTEMPT_GENERATORS[data.type](data)}/>;
    }

    return <Accordion variant="splitted" selectionMode="multiple">
        {activities.map(({ id, data, tags }: any) => <AccordionItem
            key={id}
            title={data.title}
            subtitle={<p>
                {data.details && <span>{data.details} · </span>}
                <span>{tags.join(", ")}</span>
            </p>}
            startContent={<Tooltip content={data.type.replaceAll('_', ' ').toUpperCase()}>
                <QuestionIcon type={data.type} className="hidden xl:block"/>
            </Tooltip>}
        >
            <PreviewQuestion data={data}/>
        </AccordionItem>)}
    </Accordion>
}