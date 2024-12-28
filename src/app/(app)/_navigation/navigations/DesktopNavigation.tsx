import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { NavbarPage } from "@/app/(app)/_navigation/Navbar";
import { Popover, PopoverContent, PopoverTrigger } from "@/client";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import AppNavbarCourses from "@/app/(app)/_navigation/navigations/AppNavbarCourses";

export default function DesktopNavigation({ currentPage }: { currentPage?: NavbarPage }) {
    const t = useTranslations();

    return <NavbarContent className="hidden sm:flex gap-8" justify="center">
        <Popover backdrop="blur">
            <PopoverTrigger>
                <NavbarItem isActive={currentPage === 'subjects'} role="button">
                    <span className="text-foreground group-data-[active=true]:text-primary">{t("App.courses")}</span>
                </NavbarItem>
            </PopoverTrigger>
            <PopoverContent>
                <Suspense fallback={<Fallback/>}>
                    <AppNavbarCourses/>
                </Suspense>
            </PopoverContent>
        </Popover>
        <NavbarItem isActive={currentPage === 'agenda'}>
            <Link href="/agenda" aria-current={currentPage === 'agenda' ? 'page' : undefined}>
                <span className="text-foreground group-data-[active=true]:text-primary">{t("App.agenda")}</span>
            </Link>
        </NavbarItem>
        <NavbarItem isActive={currentPage === 'docs'}>
            <Link href="/content" aria-current={currentPage === 'docs' ? 'page' : undefined}>
                <span className="text-foreground group-data-[active=true]:text-primary">{t("App.documents")}</span>
            </Link>
        </NavbarItem>
    </NavbarContent>;
}

function Fallback() {
    return <p>Loading...</p>
}
