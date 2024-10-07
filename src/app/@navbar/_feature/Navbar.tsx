import {
    Navbar as Nav,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import LogoNameCol from "@/assets/logo/NameCol.svg";
import Image from "next/image";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { getLocale, getTranslations } from "next-intl/server";
import ToggleLocaleButton from "@/app/@navbar/_feature/ToggleLocaleButton";
import { BreadcrumbItemProps } from "@nextui-org/breadcrumbs";
import type { ReactNode } from "react";
import { Divider } from "@nextui-org/divider";
import DesktopNavigation from "@/app/@navbar/_feature/navigations/DesktopNavigation";
import { IconHome } from "@tabler/icons-react";
import ProfileAvatar from "@/app/@navbar/_feature/ProfileAvatar";
import BottomNavigation from "@/app/@navbar/_feature/navigations/BottomNavigation";
import news from "@/news.json";

export { BREADCRUMBS } from "@/app/@navbar/_feature/BREADCRUMBS";

export type NavbarPage = 'subjects' | 'agenda' | 'docs';

export interface NavbarProps {
    currentPage?: NavbarPage;
    breadcrumbs?: BreadcrumbItemProps[];
    actions?: ReactNode;
}

export default async function AppNavbar({ currentPage, breadcrumbs, actions }: NavbarProps) {
    const profile = await getMaybeMyProfile();

    const t = await getTranslations();
    const locale = await getLocale() as "en" | "es" | "val";

    return <header className="w-full relative border-b-2 border-b-divider --pb-2 md:pb-0 md:border-b-0">
        <Nav shouldHideOnScroll classNames={{ item: "group" }}>
            <NavbarContent>
                <NavbarMenuToggle className="sm:hidden"/>
                <NavbarBrand>
                    {/*<p className="font-bold text-inherit">ACME</p>*/}
                    <Link href="/">
                        <Image src={LogoNameCol} alt="All In Order" height={64} priority/>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
            <DesktopNavigation currentPage={currentPage}/>
            <NavbarContent className="hidden sm:flex" justify="end">
                <ToggleLocaleButton/>
                {profile
                    ? <>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/app" className="hidden md:inline-flex">
                                {t('Global.dashboard')}
                            </Button>
                            <Button as={Link} color="primary" href="/app" className="md:hidden" isIconOnly>
                                <IconHome/>
                            </Button>
                        </NavbarItem>
                        <ProfileAvatar profile={profile}/>
                    </>
                    : <>
                        <NavbarItem>
                            <Link as={Link} href="/login">
                                {t('Auth.login')}
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/register" variant="flat">
                                {t('Auth.sign_up')}
                            </Button>
                        </NavbarItem>
                    </>}
            </NavbarContent>
            <NavbarContent className="sm:hidden !flex-grow-0" justify="end">
                {profile
                    ? <ProfileAvatar profile={profile}/>
                    : <NavbarItem>
                        <Button variant="flat" color="primary" as={Link} href="/login">
                            {t('Auth.login')}
                        </Button>
                    </NavbarItem>}
            </NavbarContent>
            <NavbarMenu>
                <NavbarMenuItem isActive={currentPage === 'subjects'} className="group">
                    <Link href="/subjects" aria-current={currentPage === 'subjects' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active]:text-primary">{t("App.subjects")}</span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={currentPage === 'agenda'} className="group">
                    <Link href="/agenda" aria-current={currentPage === 'agenda' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active]:text-primary">{t("App.agenda")}</span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={currentPage === 'docs'} className="group">
                    <Link href="/content" aria-current={currentPage === 'docs' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active]:text-primary">{t("App.documents")}</span>
                    </Link>
                </NavbarMenuItem>
                <Divider/>
                <section>
                    <header className="flex items-end justify-between">
                        <h1 className="font-medium">
                            {locale === "en" ? "News" : (locale === "es" ? "Novedades" : "Novetats")}
                        </h1>
                        <small className="font-mono">{news.id}</small>
                    </header>
                    <ul className="list-disc pl-6">
                        {news[locale].map((newsDetails, index) =>
                            <li key={index} className="text-default-500 text-sm">
                                {newsDetails}
                            </li>)}
                    </ul>
                </section>
                <Divider/>
                <nav className="flex items-center justify-between w-full">
                    <Button as={Link} color="primary" href="/app">
                        {t('Global.dashboard')}
                    </Button>
                    <ToggleLocaleButton/>
                </nav>
            </NavbarMenu>
        </Nav>
        <div>
            {breadcrumbs && <BottomNavigation items={breadcrumbs} actions={actions}/>}
        </div>
    </header>;
}