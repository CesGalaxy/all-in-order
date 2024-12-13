"use client";

import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import useNotebookPage from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookPage";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

export default function NbPageNavbar() {
    const { saveContent } = useNotebookPage();

    return <Navbar isBordered className="z-0" classNames={{ wrapper: "max-w-full" }}>
        <NavbarContent className="hidden sm:flex gap-4" justify="start">
            <NavbarItem>
                <Link color="foreground" href="#">
                    Read
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link aria-current="page" href="#">
                    Editor
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="#">
                    Presentation
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="center">
            <Button onPress={async () => {
                const success = await saveContent();
                if (success) toast("Saved successfully!", { type: "success" });
                else toast("Failed to save!", { type: "error" });
            }}>
                Save
            </Button>
        </NavbarContent>
        <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
                <Link href="#">Share</Link>
            </NavbarItem>
        </NavbarContent>
    </Navbar>
}