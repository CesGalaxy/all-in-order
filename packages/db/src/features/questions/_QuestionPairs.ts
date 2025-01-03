import { BaseQuestion } from "./index";

export type PairsInputMethod = 'relation' | 'text' | 'letters' | 'choice';

export interface QuestionPairsData extends BaseQuestion<"pairs"> {
    pairs: Record<string, string>,
    reversible: boolean,
    single: boolean,
    methods: PairsInputMethod[],
}