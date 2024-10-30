"use server";

import getSupabase from "@/supabase/server";
import AsideModalContainer from "@/components/containers/AsideModal";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconX } from "@tabler/icons-react";
import Blank from "@/components/views/Blank";
import throwAwayImage from "@/assets/pictures/throw_away.svg";
import { Divider } from "@nextui-org/divider";
import AYSButton from "@/app/topics/[topicId]/(hub)/@aside/(...)practices/[practiceId]/delete/_AYSButton";

export default async function Page({ params: { topicId, practiceId } }: {
    params: { topicId: string, practiceId: string }
}) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("id, title, activities:topic_activities(count)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    const topicPath = "/topics/" + topicId;

    if (error) return <AsideModalContainer closeUrl={topicPath}>
        <ErrorView message={error.message}/>
    </AsideModalContainer>;

    const { activities: [{ count: activitiesCount }], id, title } = required(data, topicPath);

    return <AsideModalContainer
        title={title}
        className="md:w-1/2 md:min-w-96"
        closeUrl={topicPath}
        actions={<Button as={Link} href={"/practices/" + id} startContent={<IconX/>} color="danger">Cancel</Button>}
    >
        <div className="px-8 md:px-16 w-full h-full">
            <Blank
                image={throwAwayImage}
                alt="Delete practice"
                title={`Are you sure?`}
                content={<>
                    You are about to delete the practice <b>{title}</b> and its <b>{activitiesCount}</b> activities.
                    <Divider className="my-2"/>
                    <b>This cannot be undone.</b>
                </>}
            >
                <AYSButton/>
            </Blank>
        </div>
    </AsideModalContainer>;
}