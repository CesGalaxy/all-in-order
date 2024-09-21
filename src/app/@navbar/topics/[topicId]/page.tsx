import AppNavbar, { BREADCRUMBS } from "@/app/@navbar/_Navbar";
import required from "@/lib/helpers/required";
import { getTopicWithSubjectAndCourse } from "@/supabase/models/Topic";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const topic = required(await getTopicWithSubjectAndCourse(parseInt(topicId)));

    return <AppNavbar currentPage="subjects" breadcrumbs={[
        BREADCRUMBS.dash,
        BREADCRUMBS.course(topic.subject.course.id.toString(), topic.subject.course.name),
        BREADCRUMBS.subject(topic.subject.id.toString(), topic.subject.name),
        BREADCRUMBS.topic(topic.id.toString(), topic.title),
    ]}/>;
}