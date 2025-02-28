import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button, ButtonGroup } from "@heroui/button";
import { Link } from "@heroui/link";
import getHexColor from "@/lib/utils/color";
import NoSubjects from "@/collections/subject/components/views/NoSubjects";
import { Divider } from "@heroui/divider";
import CourseCardTopics from "@/collections/course/components/navigation/CourseCardTopics";
import { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import { Skeleton } from "@heroui/skeleton";
import { CreateSubjectModalAction } from "@/collections/subject/components/modals/CreateSubjectModal";
import { useMemo } from "react";
import { DeleteCourseModalAction } from "@/collections/course/components/modals/DeleteCourseModal";
import { Course, CourseMember, Subject, Topic } from "@/lib/supabase/entities";
import CourseCardFooter from "@/collections/course/components/navigation/CourseCardFooter";
import { IconArrowRight } from "@tabler/icons-react";

export type RequiredCourse = Pick<Course, "id" | "name" | "description" | "is_public"> & {
    subjects: RequiredSubject[],
    members?: RequiredCourseMember[],
}
export type RequiredCourseMember = Pick<CourseMember, "profile" | "is_admin">;
export type RequiredSubject = Pick<Subject, "id" | "name" | "color"> & { topics: RequiredTopic[] };
export type RequiredTopic = Pick<Topic, "id" | "title">

export interface CourseNavigationCardProps {
    course: RequiredCourse;
    forceAdmin?: boolean | null;
    createSubjectAction?: "auto" | CreateSubjectModalAction;
    deleteCourseAction?: "auto" | DeleteCourseModalAction;
    editCourseAction?: "auto" | EditCourseModalAction;
    profileId?: number;
}

export default function CourseCard({
                                       course,
                                       forceAdmin,
                                       createSubjectAction = "auto",
                                       deleteCourseAction = "auto",
                                       editCourseAction = "auto",
                                       profileId,
                                   }: CourseNavigationCardProps) {
    const isAdmin = useMemo(() =>
            forceAdmin
            || (("members" in course && course.members && profileId)
                ? course.members.some(m => m.profile === profileId && m.is_admin)
                : false),
        [forceAdmin, course, profileId]);

    return <Card className="p-4 w-full h-full" as="article">
        <CardHeader className="flex-col items-start" as="header">
            <div className="flex w-full items-center gap-4">
                <h2 className="font-bold text-3xl flex-grow">{course.name}</h2>
                <Button isIconOnly variant="light" as={Link} href={"/courses/" + course.id}>
                    <IconArrowRight/>
                </Button>
            </div>
            {course.description && <small className="text-default-500">{course.description}</small>}
        </CardHeader>
        <CardBody className="flex flex-wrap items-start gap-16">
            {
                "id" in course
                    ? course.subjects.length > 0
                        ? <ul className="w-full flex flex-col items-stretch gap-4">
                            {
                                course.subjects.map(subject => <ButtonGroup
                                    key={subject.id}
                                    className="w-full"
                                    as="li"
                                    size="lg"
                                >
                                    <Button
                                        as={Link}
                                        href={"/subjects/" + subject.id}
                                        style={{
                                            backgroundColor: subject.color
                                                ? `${getHexColor(subject.color)}`
                                                : "transparent",
                                            color: subject.color ? "#fff" : "#000"
                                        }}
                                        className="w-full"
                                    >
                                        {subject.name}
                                    </Button>
                                    <CourseCardTopics topics={subject.topics}/>
                                </ButtonGroup>)
                            }
                        </ul>
                        : <NoSubjects courseId={course.id}/>
                    : <Skeleton className="rounded-xl w-full h-12"/>
            }
        </CardBody>
        {"id" in course
            ? isAdmin && <>
            <Divider/>
            <CourseCardFooter
                courseId={course.id}
                courseName={course.name}
                courseDescription={course.description}
                courseVisibility={course.is_public}
                createSubjectAction={createSubjectAction}
                deleteCourseAction={deleteCourseAction}
                editCourseAction={editCourseAction}
                profileId={profileId}
                isAdmin={isAdmin}
            />
        </>
            : <>
                <Divider/>
                <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
                    <Skeleton className="w-40 h-10 rounded-xl"/>
                    <Skeleton className="w-10 h-10 rounded-xl"/>
                    <Skeleton className="w-10 h-10 rounded-xl"/>
                </CardFooter>
            </>
        }
    </Card>;
}