import { createContext } from "react";
import { FileObject } from "@supabase/storage-js";

export interface FolderContextValue {
    path: string;
    objects: FileObject[];
}

const FolderContext = createContext(null);

export default FolderContext;