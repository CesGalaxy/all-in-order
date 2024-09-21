import { getMyProfile } from "@/supabase/models/Profile";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import getHexColor from "@/lib/utils/color";
import { Link } from "@nextui-org/link";
import { getCoursesWSubjectsWTopics } from "@/supabase/models";
import NoCourses from "@/components/NoCourses";

export default async function Page() {
    const profile = await getMyProfile();
    const courses = await getCoursesWSubjectsWTopics();

    return courses ?
        courses.length > 0
            ? <ul className="w-full h-full flex flex-col flex-wrap items-center justify-center gap-16">
                {courses.map(course => (
                    <li key={course.id}>
                        <Card className="p-4 max-w-96">
                            <CardHeader className="flex-col items-start">
                                <h2 className="font-bold text-3xl">{course.name}</h2>
                                {course.description && <small className="text-default-500">{course.description}</small>}
                            </CardHeader>
                            <CardBody className="flex flex-wrap items-center justify-center gap-16">
                                {course.subjects.map(subject => (
                                    <Button key={subject.id} as={Link} href={"/subjects/" + subject.id} style={{
                                        backgroundColor: subject.color ? `${getHexColor(subject.color)}` : "transparent",
                                        color: subject.color ? "#fff" : "#000"
                                    }}>{subject.name}</Button>
                                ))}
                            </CardBody>
                        </Card>
                    </li>
                ))}
            </ul>
            : <NoCourses/>
        : <p>Error</p>;
}