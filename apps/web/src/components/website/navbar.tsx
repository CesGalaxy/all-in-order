import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@repo/ui/components/accordion";
import { Button } from "@repo/ui/components/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@repo/ui/components/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, } from "@repo/ui/components/sheet";
import Image from "next/image";
import Link from "next/link";
import NameCol from "@/assets/logo/NameColMargin.svg";
import IcoCol from "@/assets/logo/IcoCol.svg";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const MENU_ITEMS: MenuItem[] = [
    { title: "Home", url: "#" },
    {
        title: "Products",
        url: "#",
        items: [
            {
                title: "Blog",
                description: "The latest industry news, updates, and info",
                icon: <Book className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Company",
                description: "Our mission is to innovate and empower the world",
                icon: <Trees className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Careers",
                description: "Browse job listing and discover our workspace",
                icon: <Sunset className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Support",
                description:
                    "Get in touch with our support team or visit our community forums",
                icon: <Zap className="size-5 shrink-0"/>,
                url: "#",
            },
        ],
    },
    {
        title: "Resources",
        url: "#",
        items: [
            {
                title: "Help Center",
                description: "Get all the answers you need right here",
                icon: <Zap className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Contact Us",
                description: "We are here to help you with any questions you have",
                icon: <Sunset className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Status",
                description: "Check the current status of our services and APIs",
                icon: <Trees className="size-5 shrink-0"/>,
                url: "#",
            },
            {
                title: "Terms of Service",
                description: "Our terms and conditions for using our services",
                icon: <Book className="size-5 shrink-0"/>,
                url: "#",
            },
        ],
    },
    {
        title: "Pricing",
        url: "#",
    },
    {
        title: "Blog",
        url: "#",
    },
];

const WebsiteNavbar = ({
                           auth = {
                               login: { title: "Login", url: "/login" },
                               signup: { title: "Sign up", url: "/signup" },
                           },
                       }: Navbar1Props) => {
    return (
        <header className="container mx-auto">
            {/* Desktop Menu */}
            <nav className="hidden justify-between lg:flex">
                <div className="flex items-center gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={NameCol} alt="All In Order"/>
                    </Link>
                    <div className="flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {MENU_ITEMS.map((item) => renderMenuItem(item))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                <div className="flex gap-2 items-center pr-4">
                    <Button asChild variant="outline" size="sm">
                        <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild size="sm">
                        <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden px-2">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image src={IcoCol} className="max-h-16" alt="All In Order" height={64}/>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="size-4"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Image src={IcoCol} className="max-h-16" alt="All In Order"/>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6 p-4">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="flex w-full flex-col gap-4"
                                >
                                    {MENU_ITEMS.map((item) => renderMobileMenuItem(item))}
                                </Accordion>

                                <div className="flex flex-col gap-3">
                                    <Button asChild variant="outline">
                                        <a href={auth.login.url}>{auth.login.title}</a>
                                    </Button>
                                    <Button asChild>
                                        <a href={auth.signup.url}>{auth.signup.title}</a>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="text-lg">{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem}/>
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-lg font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem}/>
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
    return (
        <a
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </a>
    );
};

export default WebsiteNavbar;
