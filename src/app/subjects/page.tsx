import { getCoursesWSubjectsWTopics } from "@/supabase/models/Course";
import NoCourses from "@/collections/course/NoCourses";
import PageContainer from "@/components/containers/Page";
import NavigationCard from "@/collections/course/NavigationCard";

export default async function Page() {
    const courses = await getCoursesWSubjectsWTopics();

    async function editCourse() {
        "use server";
        return undefined;
    }

    const content = courses ?
        courses.length > 0
            ? <ul className="w-full h-full gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course => <NavigationCard
                    course={course}
                    key={course.id}
                    editAction={editCourse}
                />)}
            </ul>
            : <NoCourses/>
        : <div className="w-full h-full flex flex-col items-center gap-4">Error</div>;

    return <PageContainer>{content}</PageContainer>;
}