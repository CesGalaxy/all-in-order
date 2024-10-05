import { IconListCheck, IconMist, IconSquareRoundedCheck } from "@tabler/icons-react";
import type { ComponentProps } from "react";

export const QUESTION_ICONS = {
    choice: IconListCheck,
    fill_the_gap: IconMist,
    true_or_false: IconSquareRoundedCheck,
}

export interface QuestionIconProps extends ComponentProps<typeof IconListCheck> {
    type: keyof typeof QUESTION_ICONS;
}

export default function QuestionIcon({ type, ...props }: QuestionIconProps) {
    const Icon = QUESTION_ICONS[type];
    return <Icon {...props}/>;
};