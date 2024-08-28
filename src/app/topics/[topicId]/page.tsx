import required from "@/lib/helpers/required";
import { getTopicById } from "@/lib/supabase/models/Topic";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const topic = required(await getTopicById(parseInt(topicId)));

    return <p>{topicId}</p>
}