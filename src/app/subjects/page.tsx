import { getMyCoursesWithSubjectsWithTopics } from "@/lib/supabase/models/Course";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import getHexColor from "@/lib/utils/color";
import { Link } from "@nextui-org/link";
import SubjectTopicsDropdown from "@/app/subjects/_SubjectTopicsDropdown";

export default async function Page() {
    const courses = await getMyCoursesWithSubjectsWithTopics();

    return <div>
        <ul className="w-full h-full gap-16 grid grid-cols-3 px-16 py-8">
            {courses.map(course => <Card key={course.id} className="p-4 w-full h-full" as="li">
                <CardHeader className="flex-col items-start">
                    <h2 className="font-bold text-3xl">{course.name}</h2>
                    {course.description && <small className="text-default-500">{course.description}</small>}
                </CardHeader>
                <CardBody className="flex flex-wrap items-start justify-center gap-16">
                    {course.subjects.map(subject => (
                        <ButtonGroup key={subject.id}>
                            <Button as={Link} href={"/subjects/" + subject.id} style={{
                                backgroundColor: subject.color ? `${getHexColor(subject.color)}` : "transparent",
                                color: subject.color ? "#fff" : "#000"
                            }}>{subject.name}</Button>
                            <SubjectTopicsDropdown topics={subject.topics} />
                        </ButtonGroup>
                    ))}
                </CardBody>
            </Card>)}
        </ul>
    </div>
}