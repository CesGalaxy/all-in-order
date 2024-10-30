import { Practice } from "@/supabase/entities";

export interface PracticeSimpleCardProps {
    practice: Pick<Practice, "id" | "title" | "description"> & {};
}

export default function PracticeSimpleCard() {

}