"use server";

import getNotionClient from "@/modules/notebook/notion/lib/getNotionClient";
import ContentGallery from "@/components/navigation/ContentGallery";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { addNotionPageToNotebook } from "@/modules/notebook/notion/actions";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Divider } from "@heroui/divider";
import { Link } from "@heroui/link";
import { IconEye, IconLinkPlus } from "@tabler/icons-react";

export default async function NotionPagesList({ notebookId }: { notebookId: number }) {
    const notion = await getNotionClient();

    const { results } = await notion.search({});

    const pages = results.filter(page => page.object === "page" && "properties" in page);

    const organizedPages = organizePages(pages);

    return <ContentGallery
        className="space-y-4"
        items={organizedPages}
        getItemKey={page => page.id}
        renderItem={page => <Card>
            <CardHeader className="font-medium text-lg">
                <Link href={page.url} size="lg" color="foreground" showAnchorIcon isBlock target="_blank">
                    {page.icon?.type === "emoji" && page.icon.emoji + " "}
                    {Object.values(page.properties)
                        .find(prop => prop.type === "title")!
                        .title
                        .map(({ plain_text }) => plain_text)
                        .join(" ")}
                </Link>
            </CardHeader>
            {page.children.length > 0 && <CardBody>
                <ContentGallery
                    className="gap-2 list-disc list-inside"
                    items={page.children}
                    getItemKey={page => page.id}
                    renderItem={page => <Link
                        href="#"
                        underline="hover"
                    >{Object.values(page.properties)
                        .find(prop => prop.type === "title")!
                        .title
                        .map(({ plain_text }) => plain_text)
                        .join(" ")}</Link>}
                />
            </CardBody>}
            <Divider/>
            <CardFooter className="gap-4">
                <Button
                    color="primary"
                    startContent={<IconLinkPlus/>}
                    onPress={addNotionPageToNotebook.bind(null, notebookId, page.id)}
                >Add to notebook</Button>
                {page.public_url && <Button as={Link} href={page.public_url} startContent={<IconEye/>}>Preview</Button>}
            </CardFooter>
        </Card>}
    />
}

type Page = PageObjectResponse & { children: PageObjectResponse[] };

function organizePages(pages: PageObjectResponse[]): Page[] {
    const pageMap: Record<string, Page> = {};
    const roots: Page[] = [];

    // Initialize map and set up children arrays
    pages.forEach(page => {
        pageMap[page.id] = { ...page, children: [] };
    });

    // Assign children to their parent if the parent exists in the set
    pages.forEach(page => {
        if (page.parent.type === "page_id") {
            if (page.parent && pageMap[page.parent.page_id]) {
                pageMap[page.parent.page_id].children.push(page);
            }
        } else {
            // roots.push(page);
            roots.push(pageMap[page.id]);
        }
    });

    return roots;
}