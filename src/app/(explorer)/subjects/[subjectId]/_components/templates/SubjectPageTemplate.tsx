import { Subject, SubjectNote, Topic } from "@aio/db/entities";
import PageContainer from "@/components/containers/Page";
import SubjectPageTasksSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageTasksSection";
import SubjectPageNotesSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageNotesSection";
import SectionContainer from "@/components/containers/SectionContainer";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import { useTranslations } from "next-intl";
import SubjectPageTopicSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageTopicSection";
import { CreateNoteModalAction } from "@/collections/note/components/modals/CreateNoteModal";
import { Button } from "@nextui-org/button";
import { IconArrowsMaximize } from "@tabler/icons-react";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">

export interface SubjectPageTemplateProps {
    notes: SubjectNote[];
    topics: RequiredTopic[];
    profileId?: number;
    subject: Subject;
    createNoteAction: CreateNoteModalAction;
}

export default function SubjectPageTemplate({
                                                notes,
                                                topics,
                                                profileId,
                                                subject,
                                                createNoteAction
                                            }: SubjectPageTemplateProps) {
    const t = useTranslations();

    return <PageContainer className="h-full grid grid-cols-1 xl:grid-cols-2 gap-8 auto-rows-auto">
        <div className="flex flex-col gap-8">
            <SubjectPageTopicSection subjectId={subject.id} topics={topics}/>
            <SubjectPageTasksSection subjectId={subject.id}/>
            <SubjectPageNotesSection
                notes={notes}
                createNoteAction={createNoteAction}
                subjectId={subject.id}
            />
        </div>
        <div>
            <SectionContainer
                title={t('App.calendar')}
                className="flex flex-col col-span-2 row-span-2 relative"
                trailing={<Button isIconOnly size="sm" variant="flat"><IconArrowsMaximize/></Button>}
            >
                <MonthCalendar/>
            </SectionContainer>
        </div>
    </PageContainer>;
}