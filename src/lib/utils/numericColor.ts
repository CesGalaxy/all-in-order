/**
 * Convert a numeric color (0xAARRGGBB) to a hex rgb color string
 * @param color The numeric color to convert
 * @param start Whether to include the hash at the start of the string
 * @returns The hex color string
 */
export function numericColorToHexRGB(color: number, start: boolean = false): string {
    // Check that the color is a signed int4
    if (color < 0 || color > 16777215) throw new Error('Invalid color');

    // Get the RGB values
    const rgb = [(color >> 16), (color >> 8), color];

    // Convert to hex (0xAARRGGBB)
    return (start ? '#' : '') + rgb.map(c => (c & 0xff).toString(16).padStart(2, '0')).join("");
}

/**
 * Convert a hex rgb color string to a numeric color (0xAARRGGBB)
 * @param hex The hex color string to convert, in the format #RRGGBB (the hash is optional)
 * @returns The numeric color
 */
export function hexRGBToNumericColor(hex: string) {
    // Remove the initial '#' if present
    const rgb = hex.replace(/^#/, '');

    // Check that the color is a valid hex color
    if (!/^[0-9a-f]{6}$/i.test(rgb)) throw new Error('Invalid color');

    // Convert to numeric in the format 0xAARRGGBB
    return parseInt(rgb, 16) | 0xff000000;
}