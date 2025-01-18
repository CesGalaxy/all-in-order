"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconLanguage, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import { Avatar } from "@nextui-org/avatar";
import { updateLocale } from "@/app/(website)/_navigation/actions";
import { Kbd } from "@nextui-org/kbd";
import { useCmdkStore } from "@/features/cmdk/store";
import { useTheme } from "next-themes";

export function ToggleLocaleButton() {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly variant="light" aria-label="Language" title="Language">
                <IconLanguage/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownItem
                key="en"
                onPress={() => updateLocale('en')}
                startContent={<Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/gb.svg"/>}
            >English</DropdownItem>
            <DropdownItem
                key="es"
                onPress={() => updateLocale('es')}
                startContent={<Avatar alt="Español" className="w-6 h-6" src="https://flagcdn.com/es.svg"/>}
            >Español</DropdownItem>
            <DropdownItem
                key="val"
                onPress={() => updateLocale('val')}
                startContent={<Avatar alt="Valencià" className="w-6 h-6"
                                      src="https://upload.wikimedia.org/wikipedia/commons/1/16/Flag_of_the_Valencian_Community_%282x3%29.svg"/>}
            >Valencià</DropdownItem>
        </DropdownMenu>
    </Dropdown>;
}

export function ToggleThemeButton() {
    const { theme, setTheme } = useTheme();

    const toggle = () => {
        if (theme == "dark") setTheme("light");
        else setTheme("dark");
    }

    const icon = theme == "dark" ? <IconSun/> : <IconMoon/>;

    return <Button isIconOnly variant="flat" radius="full" onPress={toggle}>{icon}</Button>
}

export function NavbarSearchButton() {
    const { open } = useCmdkStore();
    return <Button
        startContent={<IconSearch/>}
        variant="flat"
        endContent={<Kbd keys={"command"} className="ml-2 hidden lg:inline-block">K</Kbd>}
        onPress={open}
    >
        Search
    </Button>;
}

export function NavbarSmallSearchButton() {
    const { open } = useCmdkStore();
    return <Button isIconOnly variant="flat" radius="full" onPress={open}><IconSearch/></Button>;
}