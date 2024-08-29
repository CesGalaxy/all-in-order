"use client";

import { BreadcrumbItem, BreadcrumbItemProps, Breadcrumbs, BreadcrumbsProps } from "@nextui-org/breadcrumbs";

export interface UserLocationInDashboardProps extends BreadcrumbsProps {
    items: BreadcrumbItemProps[];
}

export default function UserLocationInDashboard({ items, ...props }: UserLocationInDashboardProps) {
    // The items' children are passed separately due to an error with the IDE linter
    return <nav className="px-16 flex items-center justify-between pt-4">
        <Breadcrumbs {...props}>
            {items.map(({ children, ...itemProps }, index) => <BreadcrumbItem
                key={index} {...itemProps}>{children}</BreadcrumbItem>)}
        </Breadcrumbs>
    </nav>
}
