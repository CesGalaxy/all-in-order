"use client";

import { Locale } from "@/i18n/config";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconLanguage } from "@tabler/icons-react";
import { Avatar } from "@nextui-org/avatar";

export default function ToggleLocale({ updateLocaleAction }: { updateLocaleAction: (locale: Locale) => void }) {
    return <Dropdown>
        <DropdownTrigger>
            <Button isIconOnly variant="light">
                <IconLanguage/>
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownItem
                onPress={() => updateLocaleAction('en')}
                startContent={<Avatar alt="English" className="w-6 h-6" src="https://flagcdn.com/gb.svg"/>}
            >English</DropdownItem>
            <DropdownItem
                onPress={() => updateLocaleAction('es')}
                startContent={<Avatar alt="Español" className="w-6 h-6" src="https://flagcdn.com/es.svg"/>}
            >Español</DropdownItem>
            <DropdownItem
                onPress={() => updateLocaleAction('val')}
                startContent={<Avatar alt="Valenciá" className="w-6 h-6"
                                      src="https://upload.wikimedia.org/wikipedia/commons/1/16/Flag_of_the_Valencian_Community_%282x3%29.svg"/>}
            >Valenciá</DropdownItem>
        </DropdownMenu>
    </Dropdown>;

}