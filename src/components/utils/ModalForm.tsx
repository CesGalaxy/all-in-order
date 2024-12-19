"use client";

// Dear developer,
// This piece of shit works, it really does.
// Do yourself a favor, and don't touch it!
// I've never made such complex code
// don't ask me about it.
// ~ César 2024

import {
    ActionErrors,
    ActionResponse,
    FailedActionResponse,
    mountActionError,
    SuccessfulActionResponse
} from "@/lib/helpers/form";
import { type ComponentProps, type ReactElement, type ReactNode, useCallback, useEffect, useState } from "react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button, ButtonProps } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import useActionFunction, { ActionFunctionState } from "@/reactivity/hooks/useActionFunction";
import ErrorListView from "@/components/views/ErrorListView";

/**
 * Type definition for the action function used in the ModalForm component.
 * @template T - The type of the successful action response data.
 * @template E - The type of the error keys.
 * @param {FormData} formData - The form data to be processed by the action.
 * @returns {Promise<ActionResponse<T, E | "submit">> | ActionErrors<E> | undefined | null | string} - The result of the action.
 */
export type ModalFormAction<T, E extends string> = (formData: FormData) => (
    | Promise<ActionResponse<T, E | "submit"> | undefined>
    | ActionErrors<E | "submit">
    | undefined
    | null
    | string
    | void);

/**
 * Props for the ModalForm component.
 * @template T - The type of the successful action response data.
 * @template E - The type of the error keys.
 */
export interface ModalFormProps<T, E extends string> {
    // Modal settings
    title: ReactNode;
    modalProps?: Partial<Omit<ComponentProps<typeof ModalContent>, "children">>;

    // Action function
    action?: ModalFormAction<T, E> | null;
    altActionState?: ActionFunctionState<ActionResponse<T, E>, [formData: FormData]>;

    // Action button
    buttonLabel?: ReactNode | null;
    buttonIcon?: ReactNode | null;
    buttonProps?: Omit<ButtonProps, "children" | "startContent" | "formAction" | "type">;
    buttonInitialWait?: number | null;
    buttonRequireConfirmation?: boolean | null;
    buttonConfirmationTimeout?: number;
    isFormValid: boolean;

    // The cancel button (close modal)
    hideCancelButton?: null | boolean;

    // Handle response
    handleResponse?: null | "close" | ((response: ActionResponse<T, E>, onClose: () => void) => void);
    handleSuccess?: null | "close" | ((response: SuccessfulActionResponse<T>, onClose: () => void) => void);
    handleError?: null | "close" | ((error: FailedActionResponse<E>, onClose: () => void) => void);

    // Children, footer and other props
    showFooterDivider?: boolean;
    footer?: ReactNode;
    children?: ReactNode;
}

/**
 * ModalForm component for handling form submissions within a modal dialog.
 * @template T - The type of the successful action response data.
 * @template E - The type of the error keys.
 * @param {ModalFormProps<T, E>} props - The props for the ModalForm component.
 * @returns {JSX.Element} - The rendered ModalForm component.
 */
function ModalForm<T, E extends string>({
                                            title,
                                            action,
                                            altActionState,
                                            modalProps: { as: modalAs = "form", ...modalProps } = {},
                                            buttonLabel = "Ok",
                                            buttonIcon,
                                            buttonProps: {
                                                className = "",
                                                isDisabled: forceDisable,
                                                isLoading: forceLoad,
                                                ...buttonProps
                                            } = {},
                                            buttonInitialWait,
                                            buttonRequireConfirmation,
                                            buttonConfirmationTimeout = 5000,
                                            isFormValid,
                                            handleResponse,
                                            handleSuccess,
                                            handleError,
                                            hideCancelButton = false,
                                            showFooterDivider,
                                            footer,
                                            children,
                                        }: ModalFormProps<T, E>): ReactElement<any> {
    type ModalErrors = E | "submit";

    // Handle form submission
    const handleSubmit = useCallback(async (formData: FormData): Promise<ActionResponse<T, ModalErrors> | undefined> => {
        if (!action) return {
            ok: false,
            errors: { submit: ["No action provided. This is probably an internal error"] } as ActionErrors<ModalErrors>
        } satisfies FailedActionResponse<ModalErrors>;

        const act = action(formData);

        if (typeof act === "string")
            return mountActionError({ submit: [act] } as ActionErrors<ModalErrors>);
        else if (act instanceof Promise)
            return await act;
        else if (typeof act === "object" && act !== null && !Array.isArray(act) && Object.values(act).every(Array.isArray))
            return mountActionError(act);
        else
            return mountActionError({ submit: ["Invalid action"] } as ActionErrors<ModalErrors>);
    }, [action]);

    // Action state
    const automaticActionState = useActionFunction(handleSubmit);
    const [loading, result, formAction] = altActionState || automaticActionState;

    // Submission confirmation state
    const [waiting, setWaiting] = useState(Boolean(buttonInitialWait));
    const [pendingConfirmation, setPendingConfirmation] = useState(false);

    // Handle initial wait for the button
    useEffect(() => {
        if (buttonInitialWait && waiting) setTimeout(() => setWaiting(false), buttonInitialWait);
    }, [buttonInitialWait, waiting]);

    // Handle confirmation timeout for the button
    useEffect(() => {
        if (pendingConfirmation) setTimeout(() => setPendingConfirmation(false), buttonConfirmationTimeout);
    }, [buttonConfirmationTimeout, pendingConfirmation]);

    return <ModalContent as={modalAs} {...modalProps}>
        {onClose => <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            {(children || (result?.ok === false && result.errors)) && <ModalBody>
                {children}
                {result?.ok === false && result.errors && <ErrorListView errors={result.errors}/>}
            </ModalBody>}
            {showFooterDivider && <Divider/>}
            <ModalFooter>
                {footer && <div className="self-center flex-grow w-full">{footer}</div>}
                {!hideCancelButton && <Button color="danger" variant="flat" onPress={onClose} type="button">
                    Cancel
                </Button>}
                <Button
                    color="primary"
                    startContent={buttonIcon}
                    isDisabled={forceDisable || !isFormValid}
                    isLoading={forceLoad || loading || waiting}
                    type="submit"
                    formAction={async (formData) => {
                        if (buttonRequireConfirmation && !pendingConfirmation) {
                            setPendingConfirmation(true);
                            return;
                        }

                        setPendingConfirmation(false);

                        const response = await formAction(formData);

                        if (!response) {
                            if (handleResponse === "close") onClose();
                            return;
                        }

                        if (handleResponse === "close") onClose();
                        else if (handleResponse) handleResponse(response, onClose);

                        if (response.ok) {
                            if (handleSuccess === "close") onClose();
                            else if (handleSuccess) handleSuccess(response, onClose);
                        } else if (handleError === "close") {
                            onClose();
                        } else if (handleError) {
                            handleError(response, onClose);
                        }
                    }}
                    {...buttonProps}
                >
                    {pendingConfirmation
                        ? "Confirm"
                        : waiting
                            ? `Please wait ${Math.round(buttonInitialWait! / 1000)}s`
                            : buttonLabel}
                </Button>
            </ModalFooter>
        </>}
    </ModalContent>
}

export default ModalForm;