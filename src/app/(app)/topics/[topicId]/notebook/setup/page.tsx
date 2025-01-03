"use server";

import getSupabase from "@/supabase/server";
import { getUser } from "@/supabase/auth/user";
import ErrorView from "@/components/views/ErrorView";
import { redirect } from "next/navigation";
import required from "@/lib/helpers/required";
import { Divider } from "@nextui-org/divider";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { IconDatabase, IconNotebook, IconVocabulary } from "@tabler/icons-react";
import setupNotebook from "@/modules/notebook/app/actions/setupNotebook";

export default async function Page({ params, searchParams }: {
    params: Promise<{ topicId: string }>,
    searchParams: Promise<Record<string, string>>
}) {
    const { topicId } = await params;
    const { formError } = await searchParams;
    const topicPath = "/topics/" + topicId;

    const supabaseClient = await getSupabase();
    const topicRequest = supabaseClient
        .from("topics")
        .select('title')
        .eq('id', topicId)
        .maybeSingle();

    const user = await getUser();
    const { data: nbData, error: nbError } = await supabaseClient
        .from("notebooks")
        .select('count')
        .eq('topic', topicId)
        .eq('user', user.id)
        .single();

    if (nbError) return <ErrorView message={nbError.message}/>
    if (nbData.count !== 0) redirect(topicPath);

    const { data, error } = await topicRequest;
    if (error) return <ErrorView message={error.message}/>
    const { title } = required(data, topicPath)

    async function submit(formData: FormData) {
        "use server";
        const name = formData.get("name");

        const setup = async (alias: string | null) => {
            const { error } = await setupNotebook(topicId, alias);
            if (error) redirect(topicPath + "/notebook/setup/?formError=" + error.message);
            redirect(topicPath + "/notebook");
        }

        if (typeof name === "string" && name.trim()) {
            if (name.trim().length > 2 && name.trim().length < 64) await setup(name);
            else redirect(topicPath + "/notebook/setup/?formError=Invalid notebook name");
        } else {
            await setup(null);
        }
    }

    return <div className="flex-grow w-full h-full flex flex-col md:flex-row items-stretch justify-center gap-8 p-4">
        <Card
            as="aside"
            className="basis-1/3 bg-gradient-to-br from-primary/50 to-secondary/50 text-primary-foreground p-6">
            <CardHeader className="text-3xl font-medium">
                {title}
            </CardHeader>
            <Divider/>
            <CardBody>

            </CardBody>
            <CardFooter>
                <Button as={Link} href={topicPath} variant="flat" color="secondary">
                    Go back
                </Button>
            </CardFooter>
        </Card>
        <main className="grow flex flex-col items-center justify-center gap-8">
            <h1 className="text-6xl">Create a notebook</h1>
            <ul className="grid lg:grid-cols-3 gap-4 lg:px-4">
                <Card as="li" className="border-small border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconNotebook/>
                        Organize the content
                    </CardHeader>
                    <CardBody>
                        Create for storing everything, just like Notion!
                    </CardBody>
                </Card>
                <Card as="li" className="border-small border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconVocabulary/>
                        Save the vocabulary
                    </CardHeader>
                    <CardBody>
                        Create flashcards, dictionaries and more with it!
                    </CardBody>
                </Card>
                <Card as="li" className="border-small border-primary">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconDatabase/>
                        Store all kind of data
                    </CardHeader>
                    <CardBody>
                        Whether for statistics, investigation or coding!
                    </CardBody>
                </Card>
            </ul>
            <Divider/>
            {formError && <p className="text-danger font-medium text-lg">{formError}</p>}
            <form action={submit} className="flex flex-col sm:flex-row w-full items-center max-w-[400px] gap-8">
                <Input
                    size="lg"
                    placeholder={title}
                    label={"Notebook name"}
                    className="grow"
                    name="name"
                    autoComplete="off"
                />
                <Button type="submit" size="lg" color="primary" variant="shadow">
                    Create
                </Button>
            </form>
        </main>
    </div>
}