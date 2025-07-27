"use client";

import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@repo/ui/components/sheet";
import { use, useState } from "react";
import { SearchResponse } from "@notionhq/client/build/src/api-endpoints";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";

export default function AddNotionPage({pagesQuery}: {pagesQuery: Promise<SearchResponse>}) {
    const search = use(pagesQuery);
    const [selectedPage, setSelectedPage] = useState<string>();

    console.log(search)

    if (!search.results || search.results.length === 0) {
        return <SheetContent>
            <SheetHeader>
                <SheetTitle>No Notion pages found</SheetTitle>
                <SheetDescription>
                    You can only link the pages that you specify when connecting your Notion account.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    }

    const pages = search.results.filter(p => p.object === "page" && "properties" in p);

    // TODO: Add form
    return <SheetContent>
        <SheetHeader>
            <SheetTitle>Link a page from Notion</SheetTitle>
            <SheetDescription>
                You&#39;ll be able to read the live-sync content of the page, comment, ask AI questions and highlight text.
            </SheetDescription>
        </SheetHeader>
        <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger className="w-5/6 mx-auto">
                <SelectValue placeholder="Page"/>
            </SelectTrigger>
            <SelectContent>
                {pages.map(({ id, icon, properties, parent }) => (
                    <SelectItem key={id} value={id}>
                        <span className="flex flex-col items-start">
                            <span>
                                {icon?.type === "emoji" && icon.emoji}
                                {Object.values(properties).find(p => p.type === "title")!.title.map(t => t.plain_text).join("") || "Untitled Page"}
                            </span>
                            {parent.type === "page_id" && pages.find(p => p.id === parent.page_id) && <span className="text-muted-foreground text-xs">
                                {Object.values(pages.find(p => p.id === parent.page_id)!.properties).find(p => p.type === "title")!.title.map(t => t.plain_text).join("") || "Untitled Page"}
                            </span>}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <SheetFooter className="text-muted-foreground text-xs text-balance">You can only link the pages that you specify when connecting your Notion account.</SheetFooter>
    </SheetContent>
}