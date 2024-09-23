import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_Navbar";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import required from "@/lib/helpers/required";
import EditSubjectButton from "@/app/@navbar/subjects/[subjectId]/_EditSubjectButton";
import ManageSubjectMembersButton from "@/app/@navbar/subjects/[subjectId]/_ManageSubjectMembersButton";
import getSupabase from "@/supabase/server";
import { revalidatePath } from "next/cache";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const { data, error } = await getSubject(subjectId);

    if (error) return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects]}/>

    const subject = required(data);

    async function updateSubject(name?: string, description?: string) {
        "use server";
        
        const { error } = await getSupabase()
            .from("subjects")
            .update({ name, description })
            .eq("id", subjectId);

        if (error) return error.message;

        revalidatePath("/subjects/" + subjectId);
    }

    return <AppNavbar
        currentPage="subjects"
        breadcrumbs={[BREADCRUMBS.dash, BREADCRUMBS.subjects, BREADCRUMBS.subject(subject.id, subject.name)]}
        actions={<>
            <ManageSubjectMembersButton subject={subject}/>
            <EditSubjectButton subject={subject} action={updateSubject}/>
        </>}
    />;
}