"use server";

import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import ShareButton from "@/app/(app)/(explorer)/subjects/[subjectId]/@aside/(.)notes/[noteId]/_ShareButton";
import EditButton from "@/app/(app)/(explorer)/subjects/[subjectId]/@aside/(.)notes/[noteId]/_EditButton";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";

export default async function Page(props: { params: Promise<{ subjectId: string, noteId: string }> }) {
    const { subjectId, noteId } = await props.params;

    await new Promise(resolve => setTimeout(resolve, 1000));

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("subject_notes")
        .select()
        .eq("subject_id", parseInt(subjectId));

    if (error) return <ErrorView message={error.message}/>;

    const notes = required(data);
    const note = notes.find(note => note.id === parseInt(noteId));

    const t = await getTranslations();

    if (!note) return <ErrorView message={t("Dash.Note.not_found")}/>;

    async function editNote(title: string, content: string) {
        "use server";

        const supabaseClient = await getSupabase();
        const { error } = await supabaseClient
            .from("subject_notes")
            .update({ title, content })
            .eq("id", parseInt(noteId));

        if (error) return error.message;

        revalidatePath("/subjects/" + subjectId);
    }

    return <div className="p-4">
        {note.title && <>
            <h1 className="text-3xl font-medium">{note.title}</h1>
            <hr/>
        </>}
        <p className="text-xl">{note.content}</p>
        <br/>
        <nav className="flex items-center gap-4">
            <EditButton note={note} action={editNote}/>
            {/* `undefined` makes sure the title isn't used when "" */}
            <ShareButton title={note.title || undefined} content={note.content}/>
        </nav>
    </div>;
}
