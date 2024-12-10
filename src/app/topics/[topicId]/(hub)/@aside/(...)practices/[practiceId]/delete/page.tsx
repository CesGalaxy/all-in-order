"use server";

import getSupabase from "@/supabase/server";
import AsideModalContainer from "@/components/containers/AsideModal";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconTrash, IconX } from "@tabler/icons-react";
import BlankView from "@/components/views/BlankView";
import throwAwayImage from "@/assets/pictures/throw_away.svg";
import { Divider } from "@nextui-org/divider";
import AYSButton from "@/app/topics/[topicId]/(hub)/@aside/(...)practices/[practiceId]/delete/_AYSButton";
import ModalButton from "@/components/utils/ModalButton";
import ModalForm from "@/components/utils/ModalForm";

export default async function Page(
    props: {
        params: Promise<{ topicId: string, practiceId: string }>
    }
) {
    const params = await props.params;

    const {
        topicId,
        practiceId
    } = params;

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
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
        <div className="px-8 w-full py-16">
            <BlankView
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
                <ModalButton modal={
                    <ModalForm
                        title={"Are you sure?"}
                        isFormValid
                        handleSuccess="close"
                        buttonLabel={"Yes, delete the practice"}
                        buttonIcon={<IconTrash/>}
                        buttonProps={{ color: "danger", variant: "shadow" }}
                        buttonInitialWait={5000}
                        buttonRequireConfirmation
                    >
                        <p>This cannot be undone!</p>
                    </ModalForm>
                } color="danger" variant="shadow" className="w-full" startContent={<IconTrash/>}>
                    Yes, delete the practice
                </ModalButton>
            </BlankView>
        </div>
    </AsideModalContainer>;
}