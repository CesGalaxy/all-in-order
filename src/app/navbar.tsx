import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import LogoNameCol from "@/assets/logo/NameCol.svg";
import Image from "next/image";
import ProfileAvatar from "@/app/_ProfileAvatar";
import { getMaybeMyProfile } from "@/lib/supabase/models/Profile";

export default async function Navbar() {
    const profile = await getMaybeMyProfile();

    return <Nav shouldHideOnScroll>
        <NavbarBrand>
            {/*<p className="font-bold text-inherit">ACME</p>*/}
            <Link href="/">
                <Image src={LogoNameCol} alt="ACME" height={64}/>
            </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
                <Link color="foreground" href="#">
                    Features
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link href="#" aria-current="page">
                    Customers
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
            {profile
                ? <>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/app">Dashboard</Button>
                    </NavbarItem>
                    <ProfileAvatar profile={profile} />
                </>
                : <>
                    <NavbarItem className="hidden lg:flex">
                        <Link as={Link} href="/login">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="/register" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </>}
        </NavbarContent>
    </Nav>;
}