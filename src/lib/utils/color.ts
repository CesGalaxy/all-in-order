export default function getHexColor(color: number, alpha?: string): string {
    const raw = decimalHexTwosComplement(color).padStart(8, "0");

    return `#${raw.substring(0, 6)}${alpha || raw.substring(6)}`;
}

function decimalHexTwosComplement(decimal: number) {
    let hexadecimal;
    const size = 8;

    if (decimal >= 0) {
        hexadecimal = decimal.toString(16);

        while ((hexadecimal.length % size) != 0) {
            hexadecimal = "" + 0 + hexadecimal;
        }

        return hexadecimal;
    } else {
        hexadecimal = Math.abs(decimal).toString(16);
        while ((hexadecimal.length % size) != 0) {
            hexadecimal = "" + 0 + hexadecimal;
        }

        let output = '';
        for (let i = 0; i < hexadecimal.length; i++) {
            output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
        }

        output = (0x01 + parseInt(output, 16)).toString(16);
        return output;
    }
}
