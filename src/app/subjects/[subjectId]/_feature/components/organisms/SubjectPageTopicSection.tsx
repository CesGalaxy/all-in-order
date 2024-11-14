import NoTopics from "@/collections/topic/components/views/NoTopics";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";
import { Topic } from "@aio/db/entities";
import TopicCard from "@/collections/topic/components/navigation/TopicCard";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">;

export interface SubjectPageTopicSectionProps {
    subjectId: number;
    topics: RequiredTopic[];
}

export default function SubjectPageTopicSection({ subjectId, topics }: SubjectPageTopicSectionProps) {
    const t = useTranslations();

    return <SectionContainer title={t('App.topics')} className="w-full h-full col-span-2 order-first xl:order-none">
        {topics.length > 0
            ? <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 items-stretch justify-start gap-8 px-4">
                {topics.map(topic => <li key={topic.id}><TopicCard topic={topic}/></li>)}
            </ul>
            : <NoTopics subjectId={subjectId}/>}
    </SectionContainer>;
}