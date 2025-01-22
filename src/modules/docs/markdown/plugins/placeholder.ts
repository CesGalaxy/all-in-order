"use client";

import { $prose } from '@milkdown/kit/utils';
import type { EditorState } from '@milkdown/kit/prose/state';
import { Plugin, PluginKey } from '@milkdown/kit/prose/state';
import { Decoration, DecorationSet } from '@milkdown/kit/prose/view';
import { findParent } from '@milkdown/kit/prose';

function createPlaceholderDecoration(
    state: EditorState,
    placeholderText: string
): Decoration | null {
    const { selection } = state
    if (!selection.empty) return null

    const $pos = selection.$anchor
    const node = $pos.parent
    if (node.content.size > 0) return null

    const inTable = findParent((node) => node.type.name === 'table')($pos)
    if (inTable) return null

    const before = $pos.before()

    return Decoration.node(before, before + node.nodeSize, {
        class: 'crepe-placeholder',
        'data-placeholder': placeholderText,
    })
}

const placeholderPlugin = $prose(ctx => new Plugin({
    key: new PluginKey('AIO_PLACEHOLDER'),
    props: {
        decorations: (state) => {
            // if (isInCodeBlock(state.selection) || isInList(state.selection)) return null

            const placeholderText = 'Please enter...';
            const deco = createPlaceholderDecoration(state, placeholderText);
            return deco ? DecorationSet.create(state.doc, [deco]) : null;
        },
    },
}));

export default placeholderPlugin;