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
import Logo from "@/assets/logo/NameCol.svg";
import Image from "next/image";
import { getMaybeMyProfile } from "@/supabase/auth/profile";
import { getLocale, getTranslations } from "next-intl/server";
import { NavbarSearchButton, NavbarSmallSearchButton, ToggleLocaleButton } from "@/app/(app)/_navigation/buttons";
import { Divider } from "@nextui-org/divider";
import DesktopNavigation from "@/app/(app)/_navigation/navigations/DesktopNavigation";
import { IconHome } from "@tabler/icons-react";
import ProfileAvatar from "@/app/(app)/_navigation/ProfileAvatar";
import news from "@/news.json";

export type NavbarPage = 'subjects' | 'agenda' | 'docs';

export default async function AppNavbar() {
    const profile = await getMaybeMyProfile();

    const t = await getTranslations();
    const locale = await getLocale() as "en" | "es" | "val";

    return <Nav shouldHideOnScroll isBordered className="transition-background h-16">
        <NavbarContent className="gap-1 lg:gap-4">
            <NavbarMenuToggle className="lg:hidden"/>
            <NavbarBrand className="grow-0 shrink-0 min-w-32 sm:min-w-[187px] h-16">
                <Link href="/">
                    <Image src={Logo} alt="All In Order" height={64} width={187} priority className="w-32 sm:w-auto"/>
                </Link>
            </NavbarBrand>
            {profile && <>
                <Divider className="h-7 hidden lg:flex" orientation="vertical"/>
                <DesktopNavigation/>
            </>}
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="end">
            <ToggleLocaleButton/>
            {profile
                ? <>
                    <NavbarSearchButton/>
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
                ? <>
                    <NavbarSmallSearchButton/>
                    <Button as={Link} href="/app" color="primary" isIconOnly radius="full" variant="flat">
                        <IconHome/>
                    </Button>
                    <ProfileAvatar profile={profile}/>
                </>
                : <NavbarItem>
                    <Button variant="flat" color="primary" as={Link} href="/login">
                        {t('Auth.login')}
                    </Button>
                </NavbarItem>}
        </NavbarContent>
        <NavbarMenu>
            <NavbarMenuItem>
                <Link href="/subjects">
                    <span className="text-foreground">{t("App.subjects")}</span>
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link href="/agenda">
                    <span className="text-foreground">{t("App.agenda")}</span>
                </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link href="/content">
                    <span className="text-foreground">{t("App.documents")}</span>
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
                    {news[locale].map((newsDetails, index) => <li key={index} className="text-default-500 text-sm">
                        {newsDetails}
                    </li>)}
                </ul>
            </section>
            <Divider/>
            <nav className="flex items-center justify-between w-full">
                <Button as={Link} color="primary" href="/app">{t('Global.dashboard')}</Button>
                <ToggleLocaleButton/>
            </nav>
        </NavbarMenu>
    </Nav>;
}