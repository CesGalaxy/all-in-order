import NoTopics from "@/collections/topic/components/views/NoTopics";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";
import { Topic } from "@/supabase/entities";
import TopicCard from "@/collections/topic/components/navigation/TopicCard";
import ContentGallery from "@/components/navigation/ContentGallery";
import { IconPlus } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";
import CreateTopicModal from "@/collections/topic/components/modals/CreateTopicModal";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">;

export interface SubjectPageTopicSectionProps {
    subjectId: number;
    topics: RequiredTopic[];
}

export default function SubjectPageTopicSection({ subjectId, topics }: SubjectPageTopicSectionProps) {
    const t = useTranslations();

    return <SectionContainer title={t('App.topics')} className="w-full" trailing={<ModalButton
        modal={<CreateTopicModal action={subjectId}/>}
        color="primary"
        size="sm"
        radius="full"
        variant="flat"
        isIconOnly
    >
        <IconPlus/>
    </ModalButton>}>
        <ContentGallery
            className="flex flex-col items-stretch justify-start gap-8 px-4"
            getItemKey={topic => topic.id}
            renderItem={topic => <TopicCard topic={topic}/>}
            items={topics}
            emptyView={<NoTopics subjectId={subjectId}/>}
        />
    </SectionContainer>;
}