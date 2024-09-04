import { Button } from "@nextui-org/button";
import { IconBrandAndroid } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations();

    return <main className="w-full h-full flex flex-col items-center justify-center gap-8">
        <h1 className="text-3xl font-bold">{t('Home.create_resumes_with_ai')}</h1>
        <nav className="flex items-center gap-4">
            <Button
                size="lg"
                as={Link}
                href="/app"
            >
                {t('Global.web_version')}
            </Button>
            <Button
                size="lg"
                startContent={<IconBrandAndroid />}
                color="success"
                variant="shadow"
            >
                {t("Global.download")}
            </Button>
        </nav>
    </main>;
}
