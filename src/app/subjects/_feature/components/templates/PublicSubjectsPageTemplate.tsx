import CourseNavigationCard from "@/collections/course/components/navigation/CourseNavigationCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import PageContainer from "@/components/containers/Page";
import { Course, Subject, Topic } from "@/supabase/entities";

export type RequiredCourse = Course & { subjects: RequiredSubject[] };
export type RequiredSubject = Subject & { topics: Topic[] }

export interface PublicSubjectsPageTemplateProps {
    courses: RequiredCourse[];
}

export default function PublicSubjectsPageTemplate({ courses }: PublicSubjectsPageTemplateProps) {
    return <PageContainer>
        {courses && courses.length > 0
            ? <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course =>
                    <CourseNavigationCard
                        course={course}
                        key={course.id}
                        forceAdmin={false}
                    />
                )}
            </ul>
            : <NoCourses/>
        }
    </PageContainer>;
}