import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useTranslations } from "next-intl";
import { IconDatabase, IconNotebook, IconSparkles, IconVocabulary } from "@tabler/icons-react";
import { Link } from "@nextui-org/link";

export default function Page() {
    const t = useTranslations();

    return <div className="w-full flex-col lg:flex-row h-full flex-grow flex items-stretch p-8 lg:gap-8">
        <main className="flex items-center justify-center w-full flex-grow lg:order-last z-10">
            <Card className="p-8" shadow="lg">
                <CardHeader>
                    <h1 className="text-4xl font-bold uppercase">{t("Auth.sign_up")}</h1>
                </CardHeader>
                <CardBody as="form">
                    <Input isRequired label={t("Global.email")} placeholder={t("Auth.email_example")} type="email"
                           name="email"/>
                    <br/>
                    <Input isRequired label={t("Global.password")} type="password" name="password"/>
                    <br/>
                    <Button color="primary" className="w-full" type="submit">{t("Auth.sign_up")}</Button>
                </CardBody>
            </Card>
        </main>
        <Card as="aside"
              className="basis-1/3 lg:min-w-[600px] xl:min-w-[800px] p-6 rounded-3xl text-white bg-gradient-to-br
              -mt-32 pt-36 lg:pt-6 lg:m-0
              from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
            <CardHeader as="header">
                <h1 className="font-bold text-4xl sm:text-6xl md:text-8xl">Start organizing your ideas!</h1>
            </CardHeader>
            <CardBody as="ul" className="grid lg:grid-cols-2 gap-8 auto-rows-min">
                <Card as="li" className="border-small border-primary bg-opacity-50">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconNotebook/>
                        Create notebooks & docs
                    </CardHeader>
                    <CardBody>
                        And store everything, just like Notion!
                    </CardBody>
                </Card>
                <Card as="li" className="border-small border-primary bg-opacity-50">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconVocabulary/>
                        Save the vocabulary
                    </CardHeader>
                    <CardBody>
                        Create flashcards, dictionaries and more!
                    </CardBody>
                </Card>
                <Card as="li" className="border-small border-primary bg-opacity-50">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconDatabase/>
                        Organize your agenda
                    </CardHeader>
                    <CardBody>
                        Manage your tasks and organize your time!
                    </CardBody>
                </Card>
                <Card as="li" className="border-small border-primary bg-opacity-50">
                    <CardHeader className="font-bold text-xl gap-2 items-center">
                        <IconSparkles/>
                        Think with AI
                    </CardHeader>
                    <CardBody>
                        Let the AI help you with learning!
                    </CardBody>
                </Card>
            </CardBody>
            <CardFooter as="footer">
                <Link href="/login" color="foreground">Already have an account?</Link>
            </CardFooter>
        </Card>
    </div>
}