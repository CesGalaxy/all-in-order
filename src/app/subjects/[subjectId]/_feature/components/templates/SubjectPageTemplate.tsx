import { Subject } from "@/supabase/entities";
import PageContainer from "@/components/containers/Page";
import SubjectPageTasksSection from "@/app/subjects/[subjectId]/_feature/components/organisms/SubjectPageTasksSection";
import SubjectPageNotesSection from "@/app/subjects/[subjectId]/_feature/components/organisms/SubjectPageNotesSection";
import SectionContainer from "@/components/containers/SectionContainer";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import NoTopics from "@/collections/topic/NoTopics";
import { useTranslations } from "next-intl";

export interface SubjectPageTemplateProps {
    notes: any[];
    topics: any[];
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
        className="w-full h-full flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-x-8 gap-8">
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
        <SectionContainer title={t('App.topics')} className="w-full h-full col-span-2 order-first xl:order-none">
            {topics.length > 0
                ? <ul className="grid grid-cols-1 md:grid-cols-2 items-stretch justify-start gap-8 px-4">
                    {topics.map(topic => <Card as="li" key={topic.id}>
                        <CardHeader as={Link} className="flex-col items-start" href={"/topics/" + topic.id}>
                            <h2 className="font-bold text-3xl">{topic.title}</h2>
                            {topic.description && <small className="text-default-500">{topic.description}</small>}
                        </CardHeader>
                        <Divider/>
                        <CardFooter>
                            <Link className="text-primary hover:underline"
                                  href={`/src/app/@navbar/topics/${topic.id}/ai/chat`}
                                  showAnchorIcon isDisabled>
                                {t('AI.chat_with')}
                            </Link>
                        </CardFooter>
                    </Card>)}
                </ul>
                : <NoTopics subjectId={subject.id}/>}
        </SectionContainer>
    </PageContainer>;
}