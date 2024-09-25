import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import getHexColor from "@/lib/utils/color";
import { Link } from "@nextui-org/link";
import SubjectTopicsDropdown from "@/app/subjects/_SubjectTopicsDropdown";
import { getCoursesWSubjectsWTopics } from "@/supabase/models/Course";
import NoCourses from "@/collections/course/NoCourses";
import NoSubjects from "@/collections/subject/NoSubjects";
import CreateSubjectButton from "@/collections/subject/CreateSubjectButton";
import { Divider } from "@nextui-org/divider";
import PageContainer from "@/components/containers/Page";
import EditCourseButton from "@/app/subjects/_EditSubjectButton";

export default async function Page() {
    const courses = await getCoursesWSubjectsWTopics();

    async function editCourse() {
        "use server";
        return undefined;
    }

    const content = courses ?
        courses.length > 0
            ? <ul className="w-full h-full gap-16 grid lg:grid-cols-2 xl:grid-cols-3 auto-rows-min">
                {courses.map(course =>
                    <Card
                        key={course.id} className="p-4 w-full h-full" as="li">
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
                        <Divider/>
                        <CardFooter as="nav" className="flex items-center flex-wrap gap-4">
                            <EditCourseButton course={course} action={editCourse}/>
                            <CreateSubjectButton courseId={course.id}/>
                        </CardFooter>
                    </Card>)}
            </ul>
            : <NoCourses/>
        : <div className="w-full h-full flex flex-col items-center gap-4">Error</div>;

    return <PageContainer>{content}</PageContainer>;
}