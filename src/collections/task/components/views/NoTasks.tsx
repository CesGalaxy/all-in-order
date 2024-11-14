"use server";

import tasksImage from "@/assets/pictures/tasks.svg";
import Blank, { BlankViewProps } from "@/components/views/Blank";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import CreateTaskButton from "@/collections/task/components/CreateTaskButton";

export default async function NoTasks({ subjectId, extraViewProps }: {
    subjectId: number,
    extraViewProps?: Partial<BlankViewProps>
}) {
    const maybeProfile = await getMaybeMyProfile();

    const viewProps = { image: tasksImage, alt: "", title: "No tasks found", ...extraViewProps };

    return <Blank {...viewProps}>
        {maybeProfile && <nav className="flex items-center justify-center">
            <CreateTaskButton/>
        </nav>}
    </Blank>;
}