import noDataImage from "@/assets/pictures/no_data.svg";
import Blank from "@/components/views/Blank";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";
import CreateSubjectButton from "@/collections/subject/CreateSubjectButton";

export default function NoSubjects({ courseId }: { courseId: number }) {
    return <Blank title={"No subjects found"} content={"Create a subject to get started"} image={noDataImage}
                  alt="">
        <nav className="flex items-center gap-4">
            <CreateSubjectButton courseId={courseId}/>
            <JoinCourseButton/>
        </nav>
    </Blank>;
}