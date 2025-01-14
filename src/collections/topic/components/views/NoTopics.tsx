import BlankView from "@/components/views/BlankView";
import noDataImage from "@/assets/pictures/no_data.svg";
import CreateTopicButton from "@/collections/topic/components/CreateTopicButton";

export default function NoTopics({ subjectId }: { subjectId: number }) {
    return <BlankView
        title={"No topics found"}
        content={"Create a new topic for storing all the material"}
        image={noDataImage}
        alt=""
    >
        <CreateTopicButton action={subjectId}/>
    </BlankView>
}