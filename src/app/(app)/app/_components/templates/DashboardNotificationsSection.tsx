import BlankView from "@/components/views/BlankView";
import noDataImage from "@/assets/pictures/no_data.svg";
import SectionContainer from "@/components/containers/SectionContainer";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useTranslations } from "next-intl";

export default function DashboardNotificationsSection() {
    const t = useTranslations();
    
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
                {t("Global.view_all")}
            </Button>
        }
    >
        <BlankView image={noDataImage} alt="No notifications" title="No notifications"/>
    </SectionContainer>;
}