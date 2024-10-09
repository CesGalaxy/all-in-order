import { getMyProfile } from "@/supabase/models/Profile";
import NoCourses from "@/collections/course/NoCourses";
import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import NavigationCard from "@/collections/course/NavigationCard";
import SectionContainer from "@/components/containers/SectionContainer";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { IconUserEdit } from "@tabler/icons-react";
import noDataImage from "@/assets/pictures/no_data.svg";
import Blank from "@/components/views/Blank";

export default async function Page() {
    const profile = await getMyProfile();

    const { data: courses, error } = await getSupabase()
        .from("courses")
        .select("id, name, description, is_public, subjects(id, name, color, topics(id, title))");

    if (error) return <ErrorView message={error.message}/>;

    return <PageContainer className="w-full h-full grid grid-cols-3 gap-16">
        <SectionContainer className="col-span-2 w-full h-full" title="My Courses">
            {
                courses && courses.length > 0
                    ? <ul className="w-full grid grid-cols-2 gap-16 auto-rows-min">
                        {courses.map(course => <NavigationCard
                            key={course.id}
                            course={course}
                        />)}
                    </ul>
                    : <NoCourses/>
            }
        </SectionContainer>
        <aside className="flex flex-col items-stretch gap-16">
            <SectionContainer title="My Profile">
                <Card className="w-full">
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <Avatar
                                isBordered
                                radius="full"
                                size="md"
                                src={profile.avatar_url || ""}
                            />
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">
                                    {profile.name}
                                </h4>
                                <h5 className="text-small tracking-tight text-default-400">
                                    @{profile.username}
                                </h5>
                            </div>
                        </div>
                        <Button
                            color="primary"
                            radius="full"
                            size="sm"
                            variant="solid"
                            startContent={<IconUserEdit/>}
                        >
                            Edit profile
                        </Button>
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small text-default-400" as="p">
                        {profile.bio || "No bio"}
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">0</p>
                            <p className=" text-default-400 text-small">Following</p>
                        </div>
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">0</p>
                            <p className="text-default-400 text-small">Followers</p>
                        </div>
                    </CardFooter>
                </Card>
            </SectionContainer>
            <SectionContainer title="Notifications">
                <Blank image={noDataImage} alt="No notifications" title="No notifications"/>
            </SectionContainer>
        </aside>
    </PageContainer>;
}