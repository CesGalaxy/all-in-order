import { HTMLAttributes, ReactNode } from "react";

export interface ContentGalleryProps<T> extends HTMLAttributes<HTMLUListElement> {
    items?: T[];
    renderItem: (item: T) => ReactNode;
    emptyView?: ReactNode;
    // autoStyle?: "" | false;
}

export default function ContentGallery<T>({ items, renderItem, emptyView, ...props }: ContentGalleryProps<T>) {
    return items && items.length > 0
        ? <ul {...props}>
            {items.map(item => renderItem(item))}
        </ul>
        : emptyView;
}