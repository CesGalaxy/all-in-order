import { NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/client";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import AppNavbarCourses from "@/app/(app)/_navigation/navigations/AppNavbarCourses";

export default function DesktopNavigation() {
    const t = useTranslations();

    return <ul className="hidden lg:flex gap-8 pl-4 justify-start items-center">
        <Popover backdrop="blur">
            <PopoverTrigger>
                <NavbarItem role="button">
                    <span className="text-foreground">{t("App.courses")}</span>
                </NavbarItem>
            </PopoverTrigger>
            <PopoverContent>
                <Suspense fallback={<Fallback/>}>
                    <AppNavbarCourses/>
                </Suspense>
            </PopoverContent>
        </Popover>
        <NavbarItem>
            <Link href="/agenda">
                <span className="text-foreground">{t("App.agenda")}</span>
            </Link>
        </NavbarItem>
        <NavbarItem>
            <Link href="/content">
                <span className="text-foreground">{t("App.documents")}</span>
            </Link>
        </NavbarItem>
    </ul>;
}

function Fallback() {
    return <p>Loading...</p>
}
