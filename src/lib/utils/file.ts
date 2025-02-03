export function getFileNameDetails(fileName: string): [name: string, ext: string] {
    const segments = fileName.split('.');
    const extension = segments.pop() || '';

    return [segments.join('.'), extension];
}