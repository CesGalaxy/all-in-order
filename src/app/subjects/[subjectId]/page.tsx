import required from "@/lib/helpers/required";
import ErrorView from "@/components/views/ErrorView";
import { getSubject } from "@/app/subjects/[subjectId]/query";
import getSupabase from "@/supabase/server";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { revalidatePath } from "next/cache";
import SubjectPageTemplate from "@/app/subjects/[subjectId]/_feature/components/templates/SubjectPageTemplate";

export default async function Page({ params: { subjectId } }: { params: { subjectId: string } }) {
    const maybeProfilePromise = getMaybeMyProfile();

    const { data, error } = await getSubject(subjectId);

    if (error) return <ErrorView message={error.message}/>;

    const { topics, notes, ...subject } = required(data);

    async function createNote(profileId: number, title: string, content: string) {
        "use server";

        const { error } = await getSupabase()
            .from("subject_notes")
            .insert({ title, content, subject_id: subject.id, author_id: profileId });

        if (error) return error.message;

        revalidatePath(`/subjects/${subject.id}`);
    }

    const maybeProfile = await maybeProfilePromise;

    return <SubjectPageTemplate
        notes={notes}
        topics={topics}
        subject={subject}
        profileId={maybeProfile?.id}
        createNoteAction={createNote}
    />;
}