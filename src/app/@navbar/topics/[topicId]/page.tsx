import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_Navbar";
import required from "@/lib/helpers/required";
import { getTopicById } from "@/supabase/models/Topic";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const topic = required(await getTopicById(parseInt(topicId)));

    return <AppNavbar currentPage="subjects" breadcrumbs={[
        BREADCRUMBS.dash,
        BREADCRUMBS.topics,
        BREADCRUMBS.topic(topic.id.toString(), topic.title),
    ]}/>;
}