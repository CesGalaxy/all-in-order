import ErrorView from "@/components/views/ErrorView";
import { getSubjectPageData } from "@/app/(explorer)/subjects/[subjectId]/query";
import { revalidatePath } from "next/cache";
import { createNoteAction } from "@/collections/note/action";
import { notFound } from "next/navigation";
import SubjectPageTopicSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageTopicSection";
import SubjectPageTasksSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageTasksSection";
import SubjectPageNotesSection
    from "@/app/(explorer)/subjects/[subjectId]/_components/organisms/SubjectPageNotesSection";
import SectionContainer from "@/components/containers/SectionContainer";
import { Button } from "@nextui-org/button";
import { IconArrowsMaximize } from "@tabler/icons-react";
import MonthCalendar from "@/features/calendar/components/MonthCalendar";
import PageContainer from "@/components/containers/PageContainer";
import { getTranslations } from "next-intl/server";

export default async function Page(props: { params: Promise<{ subjectId: string }> }) {
    const { subjectId } = await props.params;

    // Get the subject (with topics and notes), also handle query related and not found errors
    const { data, error } = await getSubjectPageData(subjectId);
    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();
    const { id, topics, notes } = data;

    const t = await getTranslations();

    return <PageContainer className="h-full grid grid-cols-1 xl:grid-cols-2 gap-8 auto-rows-auto">
        <div className="flex flex-col gap-8">
            <SubjectPageTopicSection subjectId={id} topics={topics}/>
            <SubjectPageTasksSection subjectId={id}/>
            <SubjectPageNotesSection
                notes={notes}
                createNoteAction={async (formData: FormData) => {
                    "use server";
                    return await createNoteAction(id, formData)
                        .finally(() => revalidatePath(`/subjects/${id}`, "layout"));
                }}
                subjectId={id}
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