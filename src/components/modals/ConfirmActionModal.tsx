import ModalForm, { ModalFormAction, ModalFormProps } from "@/components/utils/ModalForm";
import { ReactNode } from "react";

export interface ConfirmActionModalProps {
    title?: string;
    children?: ReactNode;
    onConfirm?: ModalFormAction<any, any>;
    confirmText?: ReactNode;
    confirmIcon?: ReactNode;
    initialWait?: number | null;
    requireConfirmation?: boolean;
    extraFormProps?: Partial<ModalFormProps<any, any>>;
}

function ConfirmActionModal({
                                title = "Are you sure?",
                                children,
                                onConfirm,
                                confirmText = "Yes",
                                confirmIcon,
                                initialWait = 5000,
                                requireConfirmation = true,
                                extraFormProps,
                            }: ConfirmActionModalProps) {
    return <ModalForm {...{
        title,
        action: onConfirm,
        buttonLabel: confirmText,
        buttonIcon: confirmIcon,
        buttonInitialWait: initialWait,
        buttonRequireConfirmation: requireConfirmation,
        isFormValid: true,
        handleSuccess: "close",
        buttonProps: { color: "danger", variant: "shadow" },
        ...extraFormProps,
    }}>
        {children}
    </ModalForm>;
}

export default ConfirmActionModal;