"use server";

import addNotesImage from "@/assets/pictures/add_notes.svg";
import Blank from "@/components/views/Blank";
import getSupabase from "@/supabase/server";
import { getMaybeMyProfile, getMyProfile } from "@/supabase/models/Profile";
import { revalidatePath } from "next/cache";
import CreateNoteButton from "@/collections/note/CreateNoteButton";

export default async function NoNotes({ subjectId }: { subjectId: number }) {
    const maybeProfile = await getMaybeMyProfile();

    async function createNoteAction(content: string, title: string) {
        "use server";

        const { id } = await getMyProfile();

        const { error } = await getSupabase()
            .from("subject_notes")
            .insert({ title, content, subject_id: subjectId, author_id: id });

        if (error) return error.message;

        revalidatePath("/subjects/" + subjectId);
    }

    return <Blank title={"No notes found"} image={addNotesImage} alt="">
        {maybeProfile && <nav className="flex items-center justify-center">
            <CreateNoteButton action={createNoteAction}/>
        </nav>}
    </Blank>;
}