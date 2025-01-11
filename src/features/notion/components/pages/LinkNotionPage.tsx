"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { IconBrandNotion } from "@tabler/icons-react";

export default function LinkNotionPage() {
    return <div className="min-w-96 space-y-8">
        <Button as={Link} href="notion" startContent={<IconBrandNotion/>} variant="ghost">
            Sync with Notion
        </Button>
    </div>;
}