"use client";

import { Tab, Tabs } from "@nextui-org/tabs";
import { IconEye, IconLock, IconWorld } from "@tabler/icons-react";

const FILTERS = {
    "all": "All",
    "public": "Public",
    "private": "Private",
};

const ICONS = {
    "all": <IconEye/>,
    "public": <IconWorld/>,
    "private": <IconLock/>,
}

export interface DocsVisibilityFilterProps {
    filter: keyof typeof FILTERS;
    setFilter: (filter: keyof typeof FILTERS) => void;
}

function DocsVisibilityFilter({ filter, setFilter }: DocsVisibilityFilterProps) {
    return <Tabs aria-label="Tabs radius" size="sm" selectedKey={filter} onSelectionChange={setFilter as any}>
        {Object.entries(FILTERS).map(([key, label]) => <Tab
            key={key}
            value={key}
            title={<div className="flex items-center space-x-2">
                {ICONS[key as keyof typeof ICONS]}
                <span>{label}</span>
            </div>}
        />)}
    </Tabs>;
}

export default DocsVisibilityFilter;