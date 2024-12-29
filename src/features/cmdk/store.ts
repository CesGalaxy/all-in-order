import { create } from "zustand";

export interface CmdkStore {
    isOpen: boolean;
    close: () => void;
    open: () => void;
}

export const useCmdkStore = create<CmdkStore>(set => ({
    isOpen: false,
    close: () => set({ isOpen: false }),
    open: () => set({ isOpen: true }),
}));