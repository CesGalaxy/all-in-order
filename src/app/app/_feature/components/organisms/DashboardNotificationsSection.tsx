import Blank from "@/components/views/Blank";
import noDataImage from "@/assets/pictures/no_data.svg";
import SectionContainer from "@/components/containers/SectionContainer";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default function DashboardNotificationsSection() {
    return <SectionContainer
        title="Notifications"
        trailing={
            <Button
                as={Link}
                href="/app#notifications"
                color="primary"
                size="sm"
                variant="flat"
                radius="full"
                showAnchorIcon
            >
                View all
            </Button>
        }
    >
        <Blank image={noDataImage} alt="No notifications" title="No notifications"/>
    </SectionContainer>;
}