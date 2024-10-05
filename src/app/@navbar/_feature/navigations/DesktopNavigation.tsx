import { NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { NavbarPage } from "@/app/@navbar/_feature/Navbar";

export default function DesktopNavigation({ currentPage }: { currentPage?: NavbarPage }) {
    // const t = useTranslations();

    return <NavbarContent className="hidden sm:flex gap-8" justify="center">
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
    </NavbarContent>;
}