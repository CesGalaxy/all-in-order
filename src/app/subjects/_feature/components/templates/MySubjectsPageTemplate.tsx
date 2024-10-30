import CourseNavigationCard, {
    ExistentCourse as CourseNavigationCardExistentCourse
} from "@/collections/course/components/navigation/CourseNavigationCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import PageContainer from "@/components/containers/Page";
import { Profile } from "@/supabase/models/Profile";
import { CourseMember } from "@/supabase/entities";

export type RequiredCourse = CourseNavigationCardExistentCourse & { members: RequiredCourseMember[] };
export type RequiredCourseMember = Pick<CourseMember, "profile_id" | "is_admin">;

export interface MySubjectsPageTemplateProps {
    courses: RequiredCourse[];
    profile: Profile;
}

export default function MySubjectsPageTemplate({ courses, profile }: MySubjectsPageTemplateProps) {
    return <PageContainer>
        {courses && courses.length > 0
            ? <ul className="w-full h-full gap-4 lg:gap-8 xl:gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course => {
                    const isAdmin = course.members.some(m => m.profile_id === profile.id && m.is_admin);

                    return <CourseNavigationCard
                        key={course.id}
                        course={course}
                        forceAdmin={isAdmin}
                        profileId={profile.id}
                    />;
                })}
            </ul>
            : <NoCourses/>
        }
    </PageContainer>;
}