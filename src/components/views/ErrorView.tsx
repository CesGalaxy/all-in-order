import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import serverDownImage from "@/assets/pictures/server_down.svg";
import { useTranslations } from "next-intl";

export interface ErrorViewProps {
    message?: string;
}

export default function ErrorView({ message }: ErrorViewProps) {
    const t = useTranslations();

    return <Blank
        title={"Ups!"}
        content={message || t("Extra.unexpected_error")}
        image={serverDownImage}
        alt={t("Extra.error_occurred")}
    >
        <Button as={Link} href="/">{t("Extra.go_home")}</Button>
    </Blank>
}