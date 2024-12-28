"use server";

import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import getHexColor from "@/lib/utils/color";
import CourseCardTopics from "@/collections/course/components/navigation/CourseCardTopics";

export default async function AppNavbarCourses() {
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from('courses')
        .select('id, name, subjects(id, name, color, topics(id, title))');

    if (error) return <ErrorView message={error.message}/>;

    return <div className="px-1 py-2">
        <header className="flex gap-8 mb-4 w-full justify-between items-center">
            <p className="font-bold text-xl">Recent courses</p>
            <Button
                size="sm" radius="full" variant="flat" color="primary"
                endContent={<IconArrowRight/>}
                as={Link} href="/courses"
            >View all</Button>
        </header>
        <ul className="grid sm:grid-cols-2 gap-4">
            {data.map(course => <Card as="li" key={course.id} className="min-w-64">
                {/* @ts-ignore */}
                <CardHeader as={Link} href={`/courses/${course.id}`} underline="hover" color="foreground" size="lg">
                    {course.name}
                </CardHeader>
                <CardBody as="ul">
                    {
                        course.subjects.map(subject => <ButtonGroup
                            key={subject.id}
                            className="w-full"
                            as="li"
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
                </CardBody>
            </Card>)}
        </ul>
    </div>
}