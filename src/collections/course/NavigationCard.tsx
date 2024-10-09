import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import getHexColor from "@/lib/utils/color";
import NoSubjects from "@/collections/subject/NoSubjects";
import { Divider } from "@nextui-org/divider";
import EditCourseButton from "@/collections/course/EditButton";
import CreateSubjectButton from "@/collections/subject/CreateSubjectButton";
import SubjectTopicsDropdown from "@/collections/course/NavigationCardTopicsDropdown";
import { PostgrestError } from "@supabase/supabase-js";
import { Course, Subject, Topic } from "@/supabase/entities";

export type RequiredCourse = Pick<Course, "id" | "name" | "description" | "is_public">
    & { subjects: RequiredSubject[] };
export type RequiredSubject = Pick<Subject, "id" | "name" | "color">
    & { topics: RequiredTopic[] };
export type RequiredTopic = Pick<Topic, "id" | "title">

export default function NavigationCard({ course, editAction, isCourseAdmin }: {
    course: RequiredCourse;
    editAction?: () => Promise<PostgrestError | undefined>,
    isCourseAdmin?: boolean | null
}) {

    return <Card className="p-4 w-full h-full" as="li">
        <CardHeader className="flex-col items-start">
            <h2 className="font-bold text-3xl">{course.name}</h2>
            {course.description && <small className="text-default-500">{course.description}</small>}
        </CardHeader>
        <CardBody className="flex flex-wrap items-start justify-center gap-16">
            {course.subjects.length > 0
                ? <ul className="w-full grid md:grid-cols-2 lg:grid-cols-1 gap-4">
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
                            <SubjectTopicsDropdown topics={subject.topics}/>
                        </ButtonGroup>)
                    }
                </ul>
                : <NoSubjects courseId={course.id}/>
            }
        </CardBody>
        {isCourseAdmin && <>
            <Divider/>
            <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
                {editAction && <EditCourseButton course={course} action={editAction}/>}
                <CreateSubjectButton courseId={course.id}/>
            </CardFooter>
        </>}
    </Card>;
}