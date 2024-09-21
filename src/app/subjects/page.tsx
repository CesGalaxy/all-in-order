import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import getHexColor from "@/lib/utils/color";
import { Link } from "@nextui-org/link";
import SubjectTopicsDropdown from "@/app/subjects/_SubjectTopicsDropdown";
import { getCoursesWSubjectsWTopics } from "@/supabase/models/Course";
import NoCourses from "@/components/NoCourses";

export default async function Page() {
    const courses = await getCoursesWSubjectsWTopics();

    return courses ?
        courses.length > 0
            ? <ul className="w-full h-full gap-16 grid grid-cols-3 px-16 py-8">
                {courses.map(course =>
                    <Card
                        key={course.id} className="p-4 w-full h-full" as="li">
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
                                    <SubjectTopicsDropdown topics={subject.topics}/>
                                </ButtonGroup>
                            ))}
                        </CardBody>
                    </Card>)}
            </ul>
            : <NoCourses/>
        : <div className="w-full h-full flex flex-col items-center gap-4">Error</div>;
}