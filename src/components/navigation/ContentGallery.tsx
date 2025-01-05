import type { HTMLAttributes, Key, ReactNode } from "react";

export interface ContentGalleryProps<T> extends Omit<HTMLAttributes<HTMLUListElement>, "children"> {
    items?: T[];
    // FIXME: Prevent keys with a non Key value
    getItemKey: keyof T | ((item: T) => Key);
    renderItem: (item: T) => ReactNode;
    emptyView?: ReactNode;
    itemProps?: HTMLAttributes<HTMLLIElement>;
    children?: (children: ReactNode) => ReactNode;
}

export default function ContentGallery<T>({
                                              items,
                                              getItemKey,
                                              renderItem,
                                              emptyView,
                                              itemProps,
                                              children = (c) => c,
                                              ...props
                                          }: ContentGalleryProps<T>) {
    return items && items.length > 0
        ? <ul {...props}>
            {children(
                items.map(item => <li
                    key={typeof getItemKey === "function" ? getItemKey(item) : item[getItemKey] as Key}
                    {...itemProps}
                >
                    {renderItem(item)}
                </li>)
            )}
        </ul>
        : emptyView;
}