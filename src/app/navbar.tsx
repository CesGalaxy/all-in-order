import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import LogoNameCol from "@/assets/logo/NameCol.svg";
import Image from "next/image";
import ProfileAvatar from "@/app/_ProfileAvatar";
import { getMaybeMyProfile } from "@/lib/supabase/models/Profile";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/lib/services/locale";
import { revalidatePath } from "next/cache";
import ToggleLocale from "@/app/_ToggleLocale";

export default async function Navbar() {
    const profile = await getMaybeMyProfile();

    const t = await getTranslations();

    async function updateLocale(locale: Locale) {
        "use server";

        await setUserLocale(locale);
        revalidatePath("/");
    }

    return <Nav shouldHideOnScroll>
        <NavbarBrand>
            {/*<p className="font-bold text-inherit">ACME</p>*/}
            <Link href="/">
                {/* TODO: Set priority={true} */}
                <Image src={LogoNameCol} alt="All In Order" height={64}/>
            </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {/*<NavbarItem>*/}
            {/*    <Link color="foreground" href="#">*/}
            {/*        Features*/}
            {/*    </Link>*/}
            {/*</NavbarItem>*/}
            <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    {t('Global.web')}
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="/">
                    {t('Global.android')}
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            <ToggleLocale updateLocale={updateLocale} />
            {profile
                ? <>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/app">
                            {t('Global.dashboard')}
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
    </Nav>;
}