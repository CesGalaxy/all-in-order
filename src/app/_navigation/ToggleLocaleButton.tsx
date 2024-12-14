"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconLanguage } from "@tabler/icons-react";
import { Avatar } from "@nextui-org/avatar";
import { updateLocale } from "@/app/_navigation/actions";

function ToggleLocaleButton() {
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

export default ToggleLocaleButton;