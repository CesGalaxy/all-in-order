import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_feature/Navbar";
import getTopicData from "@/app/topics/[topicId]/(hub)/_feature/queries/getTopicData";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const { data: topic } = await getTopicData(parseInt(topicId));

    if (!topic) return <AppNavbar currentPage="subjects" breadcrumbs={[BREADCRUMBS.dash]}/>;

    return <AppNavbar currentPage="subjects" breadcrumbs={[
        BREADCRUMBS.dash,
        BREADCRUMBS.course(topic.subject!.course!.id.toString(), topic.subject!.course!.name),
        BREADCRUMBS.subject(topic.subject!.id.toString(), topic.subject!.name),
        BREADCRUMBS.topic(topic.id.toString(), topic.title),
    ]}/>;
}