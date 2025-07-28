import { Card, CardAction, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Tables } from "@/lib/supabase/database.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";

export default function WorkspaceCard({name, id, slug = ""}: {slug?: string} & Pick<Tables<"workspaces">, "id" | "name" | "owner"> & {}) {
    return <Card>
        <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardAction>
                <Tooltip>
                    <TooltipTrigger><Star className="text-muted-foreground" size={16} fill="yellow"/></TooltipTrigger>
                    <TooltipContent>
                        <p>You own this workspace</p>
                    </TooltipContent>
                </Tooltip>
            </CardAction>
        </CardHeader>
        <CardFooter>
            <Button asChild className="w-full">
                <Link href={"/w/" + id + slug}>Go to workspace <ArrowRight/></Link>
            </Button>
        </CardFooter>
    </Card>
}