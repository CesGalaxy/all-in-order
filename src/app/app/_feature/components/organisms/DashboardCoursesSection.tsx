"use client";

import CourseNavigationCard from "@/collections/course/components/navigation/CourseNavigationCard";
import NoCourses from "@/collections/course/components/views/NoCourses";
import SectionContainer from "@/components/containers/SectionContainer";
import { Modal, useDisclosure } from "@nextui-org/modal";
import CreateCourseModal from "@/collections/course/components/modals/CreateCourseModal";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import useDashboard from "@/app/app/_feature/reactivity/hooks/useDashboard";
import { dashboard_editCourse } from "@/app/app/_feature/actions";


function DashboardCoursesSection() {
    const { onOpen, isOpen, onOpenChange } = useDisclosure();

    const { optimisticCourses, createCourse, profile: { id } } = useDashboard();

    return <SectionContainer
        title="My Courses"
        className="xl:col-span-2 w-full xl:h-full"
        trailing={
            <Button
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconPlus/>}
                onPress={onOpen}
            >
                Create course
            </Button>
        }
    >
        {
            optimisticCourses && optimisticCourses.length > 0
                ? <ul className="w-full grid lg:grid-cols-2 gap-8 lg:gap-16 auto-rows-min">
                    {optimisticCourses.map(course => course.creating
                        ? <CourseNavigationCard
                            key={course.creationTime}
                            course={course}
                        />
                        : <CourseNavigationCard
                            key={course.id}
                            course={course}
                            isCourseAdmin={course.course_members.find(member => member.profile_id === id)?.is_admin}
                            editCourseAction={dashboard_editCourse.bind(null, course.id)}
                            createSubjectAction={course.id}
                        />)}
                </ul>
                : <NoCourses/>
        }
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <CreateCourseModal action={createCourse}/>
        </Modal>
    </SectionContainer>;
}

export default DashboardCoursesSection;