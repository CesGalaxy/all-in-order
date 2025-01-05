import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import ErrorView from "@/components/views/ErrorView";
import { notFound } from "next/navigation";
import NbVocabPageNavbar
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/vocabulary/_components/navigation/NbVocabPageNavbar";
import PageContainer from "@/components/containers/PageContainer";
import NbVocabDefinitionsTable
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/vocabulary/_components/data/NbVocabDefinitionsTable";
import ModalButton from "@/components/utils/ModalButton";
import NbAddDefinitionsModal from "@/modules/notebook/vocabulary/components/modals/NbAddDefinitionsModal";
import { IconPencilPlus } from "@tabler/icons-react";

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

    return <div className="w-full h-full flex-grow flex flex-col">
        <NbVocabPageNavbar area={area}/>
        <PageContainer className="h-full flex-grow overflow-y-auto">
            <NbVocabDefinitionsTable definitions={area.definitions}/>
        </PageContainer>
        <ModalButton
            modal={<NbAddDefinitionsModal defaultArea={area.id.toString()}/>}
            color="primary"
            radius="none"
            size="lg"
            startContent={<IconPencilPlus/>}
        >
            New definition
        </ModalButton>
    </div>;
}