export default function getHexColor(color: number, alpha?: string): string {
    const raw = color.toString(16).padStart(8, "0");

    return `#${raw.substring(2)}${alpha || raw.substring(0, 2)}`;
}