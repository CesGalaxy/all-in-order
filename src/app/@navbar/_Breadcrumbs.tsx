"use client";

import { BreadcrumbItem, BreadcrumbItemProps, Breadcrumbs } from "@nextui-org/breadcrumbs";

export default function NavbarBreadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
    // The items' children are passed separately due to an error with the IDE linter
    return <nav className="max-w-[1024px] flex items-center justify-between pb-4 mx-auto">
        <Breadcrumbs>
            {items.map(({ children, ...itemProps }, index) => <BreadcrumbItem
                key={index} {...itemProps}>{children}</BreadcrumbItem>)}
        </Breadcrumbs>
    </nav>;
}