import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import getHexColor from "@/lib/utils/color";
import NoSubjects from "@/collections/subject/components/views/NoSubjects";
import { Divider } from "@nextui-org/divider";
import CourseNavigationCardTopics from "@/collections/course/components/navigation/CourseNavigationCardTopics";
import { Course, Subject, Topic } from "@/supabase/entities";
import CourseNavigationCardFooter from "@/collections/course/components/navigation/CourseNavigationCardFooter";
import { EditCourseModalAction } from "@/collections/course/components/modals/EditCourseModal";
import { Skeleton } from "@nextui-org/skeleton";
import { CreateSubjectModalAction } from "@/collections/subject/components/modals/CreateSubjectModal";

export type ExistentCourse = LoadingCourse & Pick<Course, "id"> & { subjects: RequiredSubject[] };
export type LoadingCourse = Pick<Course, "name" | "description" | "is_public">;

export type RequiredCourse = ExistentCourse | LoadingCourse;
export type RequiredSubject = Pick<Subject, "id" | "name" | "color"> & { topics: RequiredTopic[] };
export type RequiredTopic = Pick<Topic, "id" | "title">

export interface CourseNavigationCardProps {
    course: RequiredCourse;
    isCourseAdmin?: boolean | null;
    createSubjectAction?: number | CreateSubjectModalAction;
    editCourseAction?: number | EditCourseModalAction;
}

export default function CourseNavigationCard({
                                                 course,
                                                 isCourseAdmin,
                                                 createSubjectAction,
                                                 editCourseAction
                                             }: CourseNavigationCardProps) {
    return <Card className="p-4 w-full h-full" as="li">
        <CardHeader className="flex-col items-start">
            <h2 className="font-bold text-3xl">{course.name}</h2>
            {course.description && <small className="text-default-500">{course.description}</small>}
        </CardHeader>
        <CardBody className="flex flex-wrap items-start justify-center gap-16">
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
                                    <CourseNavigationCardTopics topics={subject.topics}/>
                                </ButtonGroup>)
                            }
                        </ul>
                        : <NoSubjects courseId={course.id}/>
                    : <Skeleton className="rounded-xl w-full h-12">
                    </Skeleton>
            }
        </CardBody>
        {"id" in course && isCourseAdmin && <>
            <Divider/>
            <CourseNavigationCardFooter
                courseId={course.id}
                courseName={course.name}
                courseDescription={course.description}
                courseVisibility={course.is_public}
                createSubjectAction={createSubjectAction}
                editCourseAction={editCourseAction}
            />
        </>}
    </Card>;
}