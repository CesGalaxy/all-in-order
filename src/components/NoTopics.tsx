import BlankView from "@/components/BlankView";
import { Button } from "@nextui-org/button";
import noDataImage from "@/assets/pictures/no_data.svg";

export default function NoTopics() {
    return <BlankView
        title={"No topics found"}
        content={"Create a new topic for storing all the material"}
        image={noDataImage}
        alt=""
    >
        <Button>Create a topic</Button>
    </BlankView>
}