"use server";

import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_feature/Navbar";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import ModalButton from "@/components/utils/ModalButton";
import EditSubjectModal from "@/app/subjects/[subjectId]/_feature/components/modals/EditSubjectModal";
import autoRevalidate from "@/lib/helpers/autoRevalidate";
import { deleteSubjectAction, updateSubjectAction } from "@/collections/subject/actions";
import { ButtonGroup } from "@nextui-org/button";
import SubjectOptionsButton from "@/app/@navbar/subjects/[subjectId]/_feature/SubjectOptionsButton";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const { data: subject, error } = await getSubject(subjectId);

    if (error || !subject)
        return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects]}/>

    const { id, name, description } = subject;

    return <AppNavbar
        currentPage="subjects"
        breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects, BREADCRUMBS.subject(id, name)]}
        actions={<>
            <ButtonGroup>
                <ModalButton
                    size="sm"
                    modal={<EditSubjectModal
                        action={autoRevalidate(updateSubjectAction.bind(null, id), "/", "layout")}
                        subjectName={name}
                        subjectDescription={description}
                    />}
                >
                    Edit subject
                </ModalButton>
                <SubjectOptionsButton subjectId={id} deleteAction={deleteSubjectAction.bind(null, subject.id)}/>
            </ButtonGroup>
        </>}
    />;
}