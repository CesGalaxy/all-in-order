import CreatePracticeModal from "@/collections/practice/CreatePracticeModal";
import NoPractices from "@/collections/practice/NoPractices";
import SectionContainer from "@/components/containers/SectionContainer";
import { useTranslations } from "next-intl";
import PracticeCard from "@/app/topics/[topicId]/(hub)/_feature/components/navigation/PracticeCard";
import { IconLayoutGridAdd } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";

export type RequiredPractice = {
    id: number;
    title: string;
    description: string;
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
            ? <NoPractices topicId={topicId}/>
            : <ul className="w-full gap-4 grid lg:grid-cols-2 xl:grid-cols-1">
                {practices
                    .filter(v => typeof v === "object")
                    .map(practice => <PracticeCard key={practice.id} practice={practice}/>)
                }
            </ul>
        }
    </SectionContainer>;
}
