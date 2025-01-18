"use server";

import getNotionClient from "@/modules/notebook/notion/lib/getNotionClient";
import ContentGallery from "@/components/navigation/ContentGallery";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { addNotionPageToNotebook } from "@/modules/notebook/notion/actions";

export default async function NotionPagesList({ topicId }: { topicId: number }) {
    const notion = await getNotionClient();

    const { results } = await notion.search({});

    const pages = results.filter(page => page.object === "page" && "properties" in page);

    return <ContentGallery
        className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 gap-4"
        items={pages}
        getItemKey={page => page.id}
        renderItem={page => <Card>
            <CardHeader className="font-medium text-lg">
                {Object.values(page.properties)
                    .find(prop => prop.type === "title")!
                    .title
                    .map(({ plain_text }) => plain_text)
                    .join(" ")}
            </CardHeader>
            <CardFooter>
                <Button onPress={addNotionPageToNotebook.bind(null, topicId, page.id)}>Add to notebook</Button>
            </CardFooter>
        </Card>}
    />
}