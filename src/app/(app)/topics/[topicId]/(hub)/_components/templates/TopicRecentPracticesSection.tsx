import CreatePracticeModal from "@/collections/practice/components/modals/CreatePracticeModal";
import NoPractices from "@/collections/practice/components/views/NoPractices";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";
import PracticeCard from "@/collections/practice/components/navigation/PracticeCard";
import { IconLayoutGridAdd } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";

export type RequiredPractice = {
    id: number;
    title: string;
    description: string;
    activities: { count: number }[];
    attempts: { perfection: number }[];
};

export interface PracticeSectionProps {
    practices: RequiredPractice[];
    createPracticeAction: (title: string, description: string) => Promise<string | undefined>;
    topicId: number;
}

export default function TopicRecentPracticesSection({
                                                        practices,
                                                        createPracticeAction,
                                                        topicId
                                                    }: PracticeSectionProps) {
    const t = useTranslations();

    return <SectionContainer
        expanded
        title={t("App.practice")}
        className="w-full lg:h-full"
        trailing={
            practices.length > 0 && <ModalButton
                color="primary"
                variant="light"
                size="sm"
                startContent={<IconLayoutGridAdd/>}
                modal={<CreatePracticeModal action={createPracticeAction}/>}
                radius="full"
            >
                New practice
            </ModalButton>
        }
    >
        {practices.length === 0
            // FIXME: Don't forget this!!!
            ? <NoPractices topicId={topicId} createPracticeAction={topicId as any}/>
            : <ul className="w-full gap-4 grid lg:grid-cols-2 xl:grid-cols-1">
                {practices
                    .filter(v => typeof v === "object")
                    .map(practice => <PracticeCard key={practice.id} practice={practice}/>)
                }
            </ul>
        }
    </SectionContainer>;
}
