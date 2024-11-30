import { HTMLAttributes, Key, ReactNode } from "react";

export interface ContentGalleryProps<T> extends HTMLAttributes<HTMLUListElement> {
    items?: T[];
    getItemKey: (item: T) => Key;
    renderItem: (item: T) => ReactNode;
    emptyView?: ReactNode;
    itemProps?: HTMLAttributes<HTMLLIElement>;
}

export default function ContentGallery<T>({
                                              items,
                                              getItemKey,
                                              renderItem,
                                              emptyView,
                                              itemProps,
                                              ...props
                                          }: ContentGalleryProps<T>) {
    return items && items.length > 0
        ? <ul {...props}>
            {items.map(item => <li key={getItemKey(item)} {...itemProps}>{renderItem(item)}</li>)}
        </ul>
        : emptyView;
}