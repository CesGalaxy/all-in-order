"use server";

import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";

export default async function Page({ params: { practiceId } }: { params: { practiceId: string } }) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select()
        .eq("id", practiceId);

    if (error) return <ErrorView message={error.message}/>;

    const practice = required(data);

    return <PageContainer>
        hello
    </PageContainer>
}