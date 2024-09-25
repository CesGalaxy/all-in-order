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
import ProfileAvatar from "@/app/@navbar/_ProfileAvatar";
import { getMaybeMyProfile } from "@/supabase/models/Profile";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/lib/services/locale";
import { revalidatePath } from "next/cache";
import ToggleLocale from "@/app/@navbar/_ToggleLocale";
import { BreadcrumbItemProps } from "@nextui-org/breadcrumbs";
import NavbarBreadcrumbs from "@/app/@navbar/_Breadcrumbs";
import type { ReactNode } from "react";
import { IconHome } from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";

export interface NavbarProps {
    currentPage?: 'subjects' | 'agenda' | 'docs';
    breadcrumbs?: BreadcrumbItemProps[];
    actions?: ReactNode;
}

export const BREADCRUMBS = {
    courses: { href: "/courses", children: "Courses" },
    course: (id: string | number, name: string) => ({ href: `/courses/${id}`, children: name }),
    subjects: { href: "/subjects", children: "Subjects" },
    subject: (id: string | number, name: string) => ({ href: `/subjects/${id}`, children: name }),
    agenda: { href: "/agenda", children: "Agenda" },
    docs: { href: "/content", children: "Documents" },
    dash: { href: "/app", children: "Dashboard" },
    topics: { href: "/topics", children: "Topics" },
    topic: (id: string | number, name: string) => ({ href: `/topics/${id}`, children: name }),
} satisfies Record<string, BreadcrumbItemProps | ((...props: any[]) => BreadcrumbItemProps)>;

export default async function AppNavbar({ currentPage, breadcrumbs, actions }: NavbarProps) {
    const profile = await getMaybeMyProfile();

    const t = await getTranslations();

    async function updateLocale(locale: Locale) {
        "use server";

        await setUserLocale(locale);
        revalidatePath("/");
    }

    return <header className="w-full relative border-b-2 border-b-divider pb-2 md:pb-0 md:border-b-0">
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
            <NavbarContent className="hidden sm:flex gap-8" justify="center">
                <NavbarItem isActive={currentPage === 'subjects'}>
                    <Link href="/subjects" aria-current={currentPage === 'subjects' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Subjects</span>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={currentPage === 'agenda'}>
                    <Link href="/agenda" aria-current={currentPage === 'agenda' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Agenda</span>
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={currentPage === 'docs'}>
                    <Link href="/content" aria-current={currentPage === 'docs' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Documents</span>
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex" justify="end">
                <ToggleLocale updateLocaleAction={updateLocale}/>
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
                        <NavbarItem className="hidden lg:flex">
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
            {profile && <NavbarContent className="sm:hidden !flex-grow-0" justify="end">
                <ProfileAvatar profile={profile}/>
            </NavbarContent>}
            <NavbarMenu>
                <NavbarMenuItem isActive={currentPage === 'subjects'}>
                    <Link href="/subjects" aria-current={currentPage === 'subjects' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Subjects</span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={currentPage === 'agenda'}>
                    <Link href="/agenda" aria-current={currentPage === 'agenda' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Agenda</span>
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={currentPage === 'docs'}>
                    <Link href="/content" aria-current={currentPage === 'docs' ? 'page' : undefined}>
                        <span className="text-foreground group-data-[active=true]:text-primary">Documents</span>
                    </Link>
                </NavbarMenuItem>
                <Divider/>
                <nav className="flex items-center justify-between w-full">
                    <Button as={Link} color="primary" href="/app">
                        {t('Global.dashboard')}
                    </Button>
                    <ToggleLocale updateLocaleAction={updateLocale}/>
                </nav>
            </NavbarMenu>
        </Nav>
        {breadcrumbs && <NavbarBreadcrumbs items={breadcrumbs} actions={actions}/>}
    </header>;
}