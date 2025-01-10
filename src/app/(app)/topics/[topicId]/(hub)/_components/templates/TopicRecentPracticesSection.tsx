"use server";

import NoPractices from "@/collections/practice/components/views/NoPractices";
import PracticeCard from "@/collections/practice/components/navigation/PracticeCard";
import { getTranslations } from "next-intl/server";
import { getMyProfile } from "@/supabase/auth/profile";
import getSupabase from "@/supabase/server";
import { redirect } from "next/navigation";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import getTopicData from "@/app/(app)/topics/[topicId]/(hub)/query";
import SectionContainer from "@/components/containers/SectionContainer";
import ModalButton from "@/components/utils/ModalButton";
import { IconLayoutGridAdd } from "@tabler/icons-react";
import CreatePracticeModal from "@/collections/practice/components/modals/CreatePracticeModal";

export interface PracticeSectionProps {
    topicId: number;
}

export default async function TopicRecentPracticesSection({ topicId }: PracticeSectionProps) {
    const t = await getTranslations();

    const dbRequest = getTopicData(topicId);
    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data, false);

    async function createPracticeAction(title: string, description: string) {
        "use server";

        const { id } = await getMyProfile();

        const supabaseClient = await getSupabase();
        const { data, error } = await supabaseClient
            .from("practices")
            // Idea for deltaX: suggest using topicId, so it doesn't have to wait for dbRequest before creating the function
            .insert({ topic_id: topic.id, title, description, created_by: id })
            .select("id")
            .maybeSingle();

        if (error) return error.message;

        redirect("/practices/" + data!.id);
    }

    return <SectionContainer
        expanded
        title={t("App.practice")}
        className="w-full lg:h-full"
        trailing={
            createPracticeAction && <ModalButton
                color="primary"
                variant="light"
                size="sm"
                startContent={<IconLayoutGridAdd/>}
                modal={<CreatePracticeModal action={createPracticeAction}/>}
                radius="full"
            >
                New practice
            </ModalButton>
        }
    >
        {practices.length === 0
            // FIXME: Don't forget this!!!
            ? <NoPractices topicId={topicId} createPracticeAction={topicId as any}/>
            : <ul className="w-full gap-4 grid lg:grid-cols-2 xl:grid-cols-1">
                {practices
                    .filter(v => typeof v === "object")
                    .map(practice => <PracticeCard key={practice.id} practice={practice}/>)
                }
            </ul>
        }
    </SectionContainer>;
}
