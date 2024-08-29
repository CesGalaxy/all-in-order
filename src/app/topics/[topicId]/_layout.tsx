import type { ReactNode } from "react";
import UserLocationInDashboard from "@/app/app/_UserLocationInDashboard";
import { getTopicByIdWithSubjectAndCourse } from "@/lib/supabase/models/Topic";
import required from "@/lib/helpers/required";

export default async function _layout({ children, params: { topicId } }: { children: ReactNode, params: { topicId: string } }) {
    const topic = required(await getTopicByIdWithSubjectAndCourse(parseInt(topicId)));

    return <div className="w-full h-full flex flex-col items-stretch justify-stretch">
        <UserLocationInDashboard items={[
            { href: "/app", children: "Dashboard" },
            { href: "/app", children: topic.subject.course.name },
            { href: `/subjects/${topic.subject.id}`, children: topic.subject.name },
            { href: `/topics/${topic.id}`, children: topic.title }
        ]} />
        <div className="w-full h-full flex-grow">
            {children}
        </div>
    </div>
}