import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_feature/Navbar";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import ModalButton from "@/components/utils/ModalButton";
import EditSubjectModal from "@/app/subjects/[subjectId]/_feature/components/modals/EditSubjectModal";
import autoRevalidate from "@/lib/helpers/autoRevalidate";
import { updateSubjectAction } from "@/collections/subject/actions";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const { data: subject, error } = await getSubject(subjectId);

    if (error || !subject)
        return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects]}/>

    return <AppNavbar
        currentPage="subjects"
        breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects, BREADCRUMBS.subject(subject.id, subject.name)]}
        actions={<>
            <ModalButton
                size="sm"
                modal={<EditSubjectModal
                    action={autoRevalidate(updateSubjectAction.bind(null, subject.id), "/", "layout")}
                    subjectName={subject.name}
                    subjectDescription={subject.description}
                />}
            >
                Edit subject
            </ModalButton>
        </>}
    />;
}