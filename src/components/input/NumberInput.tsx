"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { IconMinus, IconPlayerSkipForward, IconPlus, IconReload } from "@tabler/icons-react";
import { type ComponentProps, type JSX, useCallback, useEffect, useState } from "react";

/**
 * NumberInput component allows users to increment, decrement, and reset a numeric value within a specified range.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} [props.vertical=false] - Whether the buttons should be displayed vertically.
 * @param {number} [props.min=0] - The minimum value allowed.
 * @param {number} [props.max=10] - The maximum value allowed.
 * @param {number} [props.value] - The controlled value of the input.
 * @param {number} [props.defaultValue=0] - The default value of the input.
 * @param {number} [props.step=1] - The step value for incrementing/decrementing.
 * @param {boolean} [props.maxButton] - Whether to show a button to set the value to the maximum.
 * @param {boolean} [props.minButton] - Whether to show a button to set the value to the minimum.
 * @param {boolean} [props.onlyButtons] - Whether to show only the buttons without the input field.
 * @param {boolean|number} [props.showReset] - Whether to show a reset button and the value to reset to.
 * @param {Object} [props.buttonProps] - Additional properties for the buttons.
 *
 * @returns {JSX.Element} The rendered NumberInput component.
 */
export default function NumberInput({
                                        vertical = false,
                                        min = 0,
                                        max = 10,
                                        value: forcedValue,
                                        defaultValue = 0,
                                        step = 1,
                                        maxButton,
                                        minButton,
                                        onlyButtons,
                                        showReset,
                                        buttonProps,
                                    }: {
    vertical?: boolean,
    min?: number,
    max?: number,
    value?: number,
    defaultValue?: number,
    step?: number,
    maxButton?: boolean,
    minButton?: boolean,
    onlyButtons?: boolean,
    showReset?: boolean | number,
    buttonProps?: Omit<ComponentProps<typeof Button>, "children" | "onPress">,
}): JSX.Element {
    // This could, but won't, be handled with a ref.
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (forcedValue) setValue(forcedValue);
    }, [forcedValue]);

    const updateValue = useCallback((newValue: any) => {
        const num = Number(newValue);

        if (isNaN(num)) return;

        if (num < min) setValue(min);
        else if (num > max) setValue(max);
        else setValue(num);
    }, [max, min]);

    return <div className="flex rounded-md w-fit overflow-hidden">
        <Button
            isIconOnly
            isDisabled={buttonProps?.isDisabled || value <= min}
            onPress={() => setValue(((value + step) < min) ? min : (value - step))}
            radius="none"
            {...buttonProps}
        >
            <IconMinus/>
        </Button>
        <Input
            type="number"
            value={value.toString()}
            onValueChange={updateValue}
            className="w-16"
            radius="none"
            min={min}
            max={max}
            step={step}
        />
        {showReset && ((showReset === true && value !== defaultValue) || value !== showReset) && <Button
            isIconOnly
            isDisabled={buttonProps?.isDisabled}
            onPress={() => setValue(defaultValue)}
            radius="none"
        >
            <IconReload/>
        </Button>}
        <Button
            isIconOnly
            isDisabled={buttonProps?.isDisabled || value >= max}
            onPress={() => setValue(((value + step) > max) ? max : (value + step))}
            radius="none"
        >
            <IconPlus/>
        </Button>
        <Button
            isIconOnly
            isDisabled={buttonProps?.isDisabled || value >= max}
            onPress={() => setValue(max)}
            radius="none"
        >
            <IconPlayerSkipForward/>
        </Button>
    </div>
}