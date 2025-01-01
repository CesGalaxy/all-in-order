import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import ErrorView from "@/components/views/ErrorView";
import { notFound } from "next/navigation";
import NbVocabPage
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/vocabulary/_feature/components/templates/NbVocabPage";

interface Params {
    topicId: string;
    encodedAreaName: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
    const { topicId, encodedAreaName } = await params;

    const user = await getUser();
    const areaName = decodeURIComponent(encodedAreaName);

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("notebooks")
        .select("area:nb_vocab_areas(id, icon, name, description, definitions: nb_vocab_definitions(*))")
        .eq("topic", topicId)
        .eq("user", user.id)
        .eq("area.name", areaName)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();

    const { area: [area] } = data;

    if (!area) return notFound();

    return <NbVocabPage area={area}/>;
}