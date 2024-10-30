import noDataImage from "@/assets/pictures/no_data.svg";
import Blank from "@/components/views/Blank";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";
import CreateSubjectButton from "@/collections/subject/components/CreateSubjectButton";

export default function NoSubjects({ courseId }: { courseId: number }) {
    return <Blank title={"No subjects found"} content={"Create a subject to get started"} image={noDataImage}
                  alt="No subjects found">
        <nav className="flex items-center gap-4">
            <CreateSubjectButton action={courseId}/>
            <JoinCourseButton/>
        </nav>
    </Blank>;
}