import Blank from "@/components/views/Blank";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import serverDownImage from "@/assets/pictures/server_down.svg";
import { useTranslations } from "next-intl";
import { IconRefresh } from "@tabler/icons-react";

export interface ErrorViewProps {
    message?: string;
    reset?: () => void;
}

export default function ErrorView({ message, reset }: ErrorViewProps) {
    const t = useTranslations();

    return <Blank
        title={"Ups!"}
        content={message || t("Extra.unexpected_error")}
        image={serverDownImage}
        alt={t("Extra.error_occurred")}
    >
        <nav className="flex items-center gap-4">
            <Button as={Link} href="/">{t("Extra.go_home")}</Button>
            {reset && <Button onPress={reset} startContent={<IconRefresh/>} color="danger">Try again</Button>}
        </nav>
    </Blank>
}