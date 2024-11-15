import ModalForm, { ModalFormAction, ModalFormProps } from "@/components/utils/ModalForm";
import { ReactNode } from "react";

export interface ConfirmActionModalProps {
    title?: string;
    message?: string;
    onConfirm?: ModalFormAction<any, any>;
    confirmText?: ReactNode;
    confirmIcon?: ReactNode;
    initialWait?: number;
    requireConfirmation?: boolean;
    extraFormProps?: Partial<ModalFormProps<any, any>>;
}

function ConfirmActionModal({
                                title = "Are you sure?",
                                message,
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
        {message}
    </ModalForm>;
}

export default ConfirmActionModal;