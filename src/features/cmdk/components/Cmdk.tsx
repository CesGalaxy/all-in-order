"use client";

import { Command } from "cmdk";
import { Modal, ModalContent } from "@nextui-org/modal";
import { useCmdkStore } from "@/features/cmdk/store";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";

interface SearchResultItem {
    content: string;
    objectID: string;
    url: string;
    type: "lvl1" | "lvl2" | "lvl3";
    hierarchy: {
        lvl1: string | null;
        lvl2?: string | null;
        lvl3?: string | null;
    };
}

const MATCH_KEYS = ["hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "content"];
const RECENT_SEARCHES_KEY = "recent-searches";
const MAX_RECENT_SEARCHES = 10;
const MAX_RESULTS = 20;

export default function Cmdk() {
    const router = useRouter();
    const pathname = usePathname();
    const eventRef = useRef<"mouse" | "keyboard">("keyboard");
    const listRef = useRef<HTMLDivElement>(null);
    const { isOpen, open, close } = useCmdkStore();

    const [query, setQuery] = useState("");
    const [activeItem, setActiveItem] = useState(0);

    const items: [] = useMemo(() => [], []);

    // Toggle the menu when ⌘K / CTRL K is pressed
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e?.key?.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                isOpen ? close() : open();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [close, isOpen, open]);

    const onItemSelect = useCallback((item: SearchResultItem) => {
        close();
        router.push(item.url);
    }, [close, router]);

    const onInputKeyDown = useCallback((e: React.KeyboardEvent) => {
        eventRef.current = "keyboard";
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                if (activeItem + 1 < items.length) setActiveItem(activeItem + 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                if (activeItem - 1 >= 0) setActiveItem(activeItem - 1);
                break;
            case "Control":
            case "Alt":
            case "Shift":
                e.preventDefault();
                break;
            case "Enter":
                if (items?.length <= 0) break;
                onItemSelect(items[activeItem]);
                break;
        }
    }, [activeItem, items, onItemSelect]);

    useEffect(() => setActiveItem(0), [query]);

    return <Modal
        hideCloseButton
        backdrop="opaque"
        classNames={{
            base: [
                "mt-[20vh] border-small dark:border-default-100 dark:supports-[backdrop-filter]:bg-background/30",
                "supports-[backdrop-filter]:bg-background/80 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150",
            ],
            backdrop: "bg-black/80",
        }}
        isOpen={isOpen}
        motionProps={{
            onAnimationComplete: () => {
                if (!isOpen) setQuery("");
            },
        }}
        placement="top-center"
        scrollBehavior="inside"
        size="xl"
        onClose={close}
    >
        <ModalContent>
            <Command className="max-h-full overflow-y-auto" label="Quick search command" shouldFilter={false}>
                <div className="flex items-center w-full px-4 border-b border-default-400/50 dark:border-default-100">
                    <IconSearch className="text-default-400 text-lg shrink-0"/>
                    <Command.Input
                        // autoFocus={!isWebKit()}
                        autoFocus={true}
                        className="w-full px-2 h-14 font-sans text-lg outline-none rounded-none bg-transparent text-default-700 placeholder-default-500 dark:text-default-500 dark:placeholder:text-default-300"
                        placeholder="Search anything..."
                        value={query}
                        onKeyDown={onInputKeyDown}
                        onValueChange={setQuery}
                    />
                    {query.length > 0 &&
                        <Button isIconOnly radius="full" size="sm" variant="light" onPress={() => setQuery("")}>
                            <IconX/>
                        </Button>}
                    <Kbd className="hidden md:block border-none px-2 py-1 ml-2 font-medium text-[0.6rem]">ESC</Kbd>
                </div>
                <Command.List
                    ref={listRef}
                    className="px-4 mt-2 pb-4 overflow-y-auto max-h-[50vh]"
                    role="listbox"
                >
                    <Command.Empty>
                        {query.length > 0 &&
                            <div className="flex flex-col text-center items-center justify-center h-32">
                                <div>
                                    <p>No results for &quot;{query}&quot;</p>
                                    {query.length === 1
                                        ? <p className="text-default-400">
                                            Try adding more characters to your search term.
                                        </p>
                                        : <p className="text-default-400">Try searching for something else.</p>}
                                </div>
                            </div>}
                    </Command.Empty>

                    {query.trim().length === 0
                        ? <div className="flex flex-col text-center items-center justify-center h-32">
                            <p className="text-default-400">No recent searches</p>
                        </div>
                        // @ts-ignore
                        : "a" === "b" && <Command.Group
                        heading={
                            <div className="flex items-center justify-between">
                                <p className="text-default-600">Recent</p>
                            </div>
                        }
                    >
                        {/*{recentSearches.map((item, index) => renderItem(item, index, true))}*/}
                    </Command.Group>}
                </Command.List>
            </Command>
        </ModalContent>
    </Modal>
}