import SectionContainer from "@/components/containers/SectionContainer";
import CreateCourseModal, { CreateCourseModalAction } from "@/collections/course/components/modals/CreateCourseModal";
import { IconPlus } from "@tabler/icons-react";
import ModalButton from "@/components/utils/ModalButton";
import DashboardCoursesListSkeleton from "@/app/app/_feature/components/misc/DashboardCoursesListSkeleton";
import { Suspense } from "react";
import DashboardCoursesList from "@/app/app/_feature/components/navigation/DashboardCoursesList";

export interface DashboardCoursesSectionProps {
    createCourseAction?: CreateCourseModalAction;
    profileId: number;
}

async function DashboardCoursesSection({ createCourseAction, profileId }: DashboardCoursesSectionProps) {
    return <SectionContainer
        title="My Courses"
        className="xl:col-span-2 w-full"
        trailing={
            createCourseAction && <ModalButton
                color="primary"
                radius="full"
                size="sm"
                variant="solid"
                startContent={<IconPlus/>}
                modal={<CreateCourseModal action={createCourseAction}/>}
            >
                Create course
            </ModalButton>
        }
    >
        <Suspense fallback={<DashboardCoursesListSkeleton/>}>
            <DashboardCoursesList profileId={profileId}/>
        </Suspense>
    </SectionContainer>;
}

export default DashboardCoursesSection;