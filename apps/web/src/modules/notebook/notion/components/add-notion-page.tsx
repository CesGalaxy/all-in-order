"use client";

import { SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@repo/ui/components/sheet";
import { use } from "react";
import { SearchResponse } from "@notionhq/client/build/src/api-endpoints";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LINK_NOTION_PAGE_SCHEMA } from "@/modules/notebook/app/schemas";
import { linkNotionPage } from "@/modules/notebook/app/actions";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@repo/ui/components/form";
import { getPageTitle } from "@/modules/integrations/notion/utils";
import { useWatch } from "react-hook-form";

export default function AddNotionPage({ pagesQuery, notebookId }: {
    pagesQuery: Promise<SearchResponse>;
    notebookId: string;
}) {
    const search = use(pagesQuery);
    // const [selectedPage, setSelectedPage] = useState<string>();

    const { form, action, handleSubmitWithAction } = useHookFormAction(
        linkNotionPage.bind(null, notebookId),
        zodResolver(LINK_NOTION_PAGE_SCHEMA),
        {
            actionProps: {
                onError: ({ error: { validationErrors, serverError } }) => {
                    if (validationErrors?._errors) validationErrors._errors.forEach(e => toast.error(e, { richColors: true }));
                    if (serverError) toast.error(serverError, { richColors: true });
                }
            },
            formProps: { mode: "all", defaultValues: { pageId: undefined, alias: "" } },
            errorMapProps: {},
        }
    );

    const selectedPageId = useWatch({name: "pageId", control: form.control});

    if (!search.results || search.results.length === 0) return <SheetContent>
        <SheetHeader>
            <SheetTitle>No Notion pages found</SheetTitle>
            <SheetDescription>
                You can only link the pages that you specify when connecting your Notion account.
            </SheetDescription>
        </SheetHeader>
    </SheetContent>;

    const pages = search.results.filter(p => p.object === "page" && "properties" in p);
    const selectedPage = pages.find(({id}) => id === selectedPageId);

    // TODO: Add form
    return <SheetContent>
        <SheetHeader>
            <SheetTitle>Link a page from Notion</SheetTitle>
            <SheetDescription>
                You&#39;ll be able to read the live-sync content of the page, comment, ask AI questions and highlight
                text.
            </SheetDescription>
        </SheetHeader>
        <Form {...form}>
            <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-8 items-center">
                <FormField
                    control={form.control}
                    name="pageId"
                    render={({ field }) => <FormItem className="w-5/6">
                        <FormLabel>Page</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-full truncate">
                                    <SelectValue placeholder="Page"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {pages.map(({ id, icon, properties, parent }) => <SelectItem key={id} value={id}>
                                        <span className="flex flex-col items-start">
                                            <span>
                                                {icon?.type === "emoji" && icon.emoji}
                                                {getPageTitle({ properties }) || "Untitled Page"}
                                            </span>
                                            {parent.type === "page_id" && pages.find(p => p.id === parent.page_id) &&
                                                <span className="text-muted-foreground text-xs">
                                                    {getPageTitle(pages.find(p => p.id === parent.page_id)!) || "Untitled Page"}
                                                </span>}
                                        </span>
                                    </SelectItem>)}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>}
                />
                <FormField
                    control={form.control}
                    name="alias"
                    render={({ field }) => (
                        <FormItem className="w-5/6">
                            <FormLabel>Alias</FormLabel>
                            <FormControl>
                                <Input placeholder={selectedPage && getPageTitle(selectedPage)} {...field} />
                            </FormControl>
                            <FormDescription>If blank, the page will be called by its Notion name.</FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={action.isPending} className="w-1/2">Link</Button>
            </form>
        </Form>
        <SheetFooter className="text-muted-foreground text-xs text-balance">You can only link the pages that you specify
            when connecting your Notion account.</SheetFooter>
    </SheetContent>
}