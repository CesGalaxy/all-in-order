"use client";

import { TopicActivity } from "@aio/db/entities";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import QuestionIcon from "@/features/beta_question/QuestionIcon";
import { Tooltip } from "@nextui-org/tooltip";
import { generateQuestionAttempt } from "@aio/db/features/questions";
import PreviewQuestion from "@/features/beta_question/PreviewQuestion";

export interface PracticePageActivitiesProps {
    activities: TopicActivity[];
}

export default function PracticePageActivities({ activities }: PracticePageActivitiesProps) {
    return <Accordion variant="splitted" selectionMode="multiple">
        {activities.map(({ id, data, tags }) => <AccordionItem
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
            <PreviewQuestion type={data.type} attempt={generateQuestionAttempt(data)}/>
        </AccordionItem>)}
    </Accordion>
}