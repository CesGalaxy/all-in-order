import noDataImage from "@/assets/pictures/no_data.svg";
import BlankView from "@/components/views/BlankView";
import CreateCourseButton from "@/collections/course/components/CreateCourseButton";
import JoinCourseButton from "@/collections/course/components/JoinCourseButton";

export default function NoCourses() {
    return <BlankView title={"No courses found"} content={"Create a course to get started"} image={noDataImage} alt="">
        <nav className="flex items-center gap-4">
            <CreateCourseButton/>
            <JoinCourseButton/>
        </nav>
    </BlankView>;
}