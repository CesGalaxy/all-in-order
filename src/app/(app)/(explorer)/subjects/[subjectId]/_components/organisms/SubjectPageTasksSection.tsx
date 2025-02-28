import { useTranslations } from "next-intl";
import NoTasks from "@/collections/task/components/views/NoTasks";
import SectionContainer from "@/components/containers/SectionContainer";

export interface SubjectPageTasksSectionProps {
    subjectId: number;
}

export default function SubjectPageTasksSection({ subjectId }: SubjectPageTasksSectionProps) {
    const t = useTranslations();

    return <SectionContainer title={t('App.tasks')} className="w-full flex flex-col">
        <NoTasks subjectId={subjectId} extraViewProps={{ small: true }}/>
    </SectionContainer>;
}