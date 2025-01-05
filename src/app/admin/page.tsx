"use client";

import { useOne } from "@refinedev/core";

function Page() {
    const { data, isLoading } = useOne({ resource: "products", id: 123 });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return <div className="dark  text-foreground">Product name: {data?.data.name}</div>;
}

export default Page;