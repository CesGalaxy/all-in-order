import BlankView from "@/components/views/BlankView";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import serverDownImage from "@/assets/pictures/server_down.svg";
import { useTranslations } from "next-intl";
import { IconRefresh } from "@tabler/icons-react";
import { ReactNode } from "react";

export interface ErrorViewProps {
    title?: string;
    message?: string;
    reset?: () => void;
    small?: boolean;
    children?: ReactNode;
}

export default function ErrorView({ title, message, reset, small, children }: ErrorViewProps) {
    const t = useTranslations();

    return <BlankView
        title={title || "Ups!"}
        content={message || t("Extra.unexpected_error")}
        image={serverDownImage}
        alt={t("Extra.error_occurred")}
        small={small}
    >
        <nav className="flex items-center gap-4">
            <Button as={Link} href="/">{t("Extra.go_home")}</Button>
            {reset && <Button onPress={reset} startContent={<IconRefresh/>} color="danger">Try again</Button>}
        </nav>
        {children}
    </BlankView>
}