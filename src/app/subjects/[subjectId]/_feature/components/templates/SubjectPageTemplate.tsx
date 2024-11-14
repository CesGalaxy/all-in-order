import { Subject, SubjectNote, Topic } from "@aio/db/entities";
import PageContainer from "@/components/containers/Page";
import SubjectPageTasksSection from "@/app/subjects/[subjectId]/_feature/components/organisms/SubjectPageTasksSection";
import SubjectPageNotesSection from "@/app/subjects/[subjectId]/_feature/components/organisms/SubjectPageNotesSection";
import SectionContainer from "@/components/containers/SectionContainer";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import { useTranslations } from "next-intl";
import SubjectPageTopicSection from "@/app/subjects/[subjectId]/_feature/components/organisms/SubjectPageTopicSection";

export type RequiredTopic = Pick<Topic, "id" | "title" | "description">

export interface SubjectPageTemplateProps {
    notes: SubjectNote[];
    topics: RequiredTopic[];
    profileId?: number;
    subject: Subject;
    createNoteAction: (profileId: number, title: string, content: string) => Promise<string | undefined>;
}

export default function SubjectPageTemplate({
                                                notes,
                                                topics,
                                                profileId,
                                                subject,
                                                createNoteAction
                                            }: SubjectPageTemplateProps) {
    const t = useTranslations();

    return <PageContainer
        className="w-full h-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-8">
        <SubjectPageTasksSection subjectId={subject.id}/>
        <SubjectPageNotesSection
            notes={notes}
            createNoteAction={typeof profileId === "number" ? createNoteAction.bind(null, profileId) : null}
            subjectId={subject.id}
        />
        <SectionContainer title={t('App.calendar')}
                          className="w-full h-full flex flex-col col-span-2 row-span-2 relative">
            <MonthCalendar/>
            <div
                className="absolute rotate-45 text-6xl md:text-8xl text-center text-danger border-8 border-danger rounded-3xl top-1/3 -left-12 md:left-16">
                PRÓXIMAMENTE
            </div>
        </SectionContainer>
        <SubjectPageTopicSection subjectId={subject.id} topics={topics}/>
    </PageContainer>;
}