"use server";

import NbVocabPractice from "@/modules/notebook/vocabulary/features/practice/app/NbVocabPractice";
import { getUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { notFound } from "next/navigation";
import NbVocabPracticeProvider
    from "@/modules/notebook/vocabulary/features/practice/reactivity/providers/NbVocabPracticeProvider";

export default async function Page({ params, searchParams }: {
    params: Promise<{ topicId: string }>,
    searchParams: Promise<Record<string, string | string[]>>,
}) {
    const { topicId } = await params;
    let { area: selectedAreas, mode } = await searchParams;

    if (!mode) return <ErrorView message="No practice mode selected."/>;

    if (typeof selectedAreas === "string") selectedAreas = [selectedAreas];

    const user = await getUser();
    const supabaseClient = await getSupabase();

    const { data, error } = await supabaseClient
        .from("notebooks")
        .select("*, areas:nb_vocab_areas(*, definitions:nb_vocab_definitions(*))")
        .eq("topic", parseInt(topicId))
        .eq("user", user.id)
        .in("areas.id", selectedAreas)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();

    const definitions = data.areas.flatMap(area => area.definitions);
    const shuffledDefinitions = shuffleArray(definitions);

    return <NbVocabPracticeProvider definitions={shuffledDefinitions}>
        <NbVocabPractice/>
    </NbVocabPracticeProvider>;
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}