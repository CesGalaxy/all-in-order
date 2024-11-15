import required from "@/lib/helpers/required";
import ErrorView from "@/components/views/ErrorView";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import { revalidatePath } from "next/cache";
import SubjectPageTemplate from "@/app/subjects/[subjectId]/_components/templates/SubjectPageTemplate";
import { createNoteAction } from "@/collections/note/action";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const maybeProfilePromise = getMaybeMyProfile();

    const { data, error } = await getSubject(subjectId);
    if (error) return <ErrorView message={error.message}/>;
    const { topics, notes, ...subject } = required(data);

    const maybeProfile = await maybeProfilePromise;

    return <SubjectPageTemplate
        notes={notes}
        topics={topics}
        subject={subject}
        profileId={maybeProfile?.id}
        createNoteAction={async (formData: FormData) => {
            "use server";
            return await createNoteAction(subject.id, formData)
                .finally(() => revalidatePath(`/subjects/${subject.id}`, "layout"));
        }}
    />;
}