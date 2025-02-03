"use client";

import { Command } from "cmdk";
import { ComponentProps } from "react";
import { type Icon, IconLayoutGrid, IconPlus, IconPresentation } from "@tabler/icons-react";
import { Kbd, KbdKey } from "@heroui/kbd";
import { useRouter } from "next/navigation";

export default function CmdkHome() {
    const router = useRouter();

    return <>
        <Command.Group heading="Topics">
            <LinkItem icon={IconLayoutGrid} keys={["shift"]} shortcut="T" href="/courses">
                Search Topics...
            </LinkItem>
            <Item icon={IconPlus}>
                Create New Topic...
            </Item>
        </Command.Group>
        <Command.Group heading="Practices">
            <Item icon={IconLayoutGrid} keys={["shift"]} shortcut="P">
                Search Practices...
            </Item>
            <Item icon={IconPresentation}>
                My Stats...
            </Item>
            <Item icon={IconPlus}>
                Create New Practice...
            </Item>
        </Command.Group>
        <Command.Group heading="Help">
            <Item icon={IconPlus} keys={["shift"]} shortcut="D">
                Search Docs...
            </Item>
            <Item icon={IconPlus}>
                Send Feedback...
            </Item>
            <Item icon={IconPlus}>
                Contact Support
            </Item>
        </Command.Group>
    </>;
}

function LinkItem({ href, ...props }: Omit<ComponentProps<typeof Item>, "onSelect"> & { href: string }) {
    const router = useRouter();

    return <Item {...props} onSelect={() => router.push(href)} onMouseEnter={() => router.prefetch(href)}/>;
}

function Item({
                  children,
                  icon: Icon,
                  keys,
                  shortcut,
                  onSelect,
              }: ComponentProps<typeof Command.Item> & {
    icon: Icon,
    keys?: KbdKey[],
    shortcut?: string
}) {
    return (
        <Command.Item onSelect={onSelect} className="
            flex items-center justify-between cursor-pointer rounded-lg text--lg gap-2 px-4
            select-none will-change-auto transition-all duration-150 text-content3-foreground
            data-[selected='true']:bg-primary data-[selected='true']:text-primary-foreground
            data-[disabled='true']:text-gray-400 data-[disabled='true']:cursor-not-allowed
            active:bg-red-500 h-10
        ">
            <span className="flex items-center gap-2"><Icon className="shrink-0"/>{children}</span>
            {shortcut && (
                <Kbd keys={keys}>{shortcut}</Kbd>
            )}
        </Command.Item>
    )
}
