enum DocType {
    // PDF = 'pdf',
    // WORD = 'word',
    // EXCEL = 'excel',
    // POWERPOINT = 'powerpoint',
    // IMAGE = 'image',
    // TEXT = 'text',
    // VIDEO = 'video',
    // AUDIO = 'audio',
    // ARCHIVE = 'archive',
    // CODE = 'code',
    // PRESENTATION = 'presentation',
    // SPREADSHEET = 'spreadsheet',
    // DOCUMENT = 'document',
    // PRESENTATION_SLIDE = 'presentation_slide',
    // SPREADSHEET_SHEET = 'spreadsheet_sheet',
    // DOCUMENT_PAGE = 'document_page',
    OTHER = 'other',
    MD = 'md',
    SD = 'sd',
}

// export const DOC_TYPE_NAMES = {
//     [DocType.PDF]: 'PDF',
//     [DocType.WORD]: 'Word',
//     [DocType.EXCEL]: 'Excel',
//     [DocType.POWERPOINT]: 'PowerPoint',
//     [DocType.IMAGE]: 'Image',
//     [DocType.TEXT]: 'Text',
//     [DocType.VIDEO]: 'Video',
//     [DocType.AUDIO]: 'Audio',
//     [DocType.ARCHIVE]: 'Archive',
//     [DocType.CODE]: 'Code',
//     [DocType.PRESENTATION]: 'Presentation',
//     [DocType.SPREADSHEET]: 'Spreadsheet',
//     [DocType.DOCUMENT]: 'Document',
//     [DocType.PRESENTATION_SLIDE]: 'Presentation Slide',
//     [DocType.SPREADSHEET_SHEET]: 'Spreadsheet Sheet',
//     [DocType.DOCUMENT_PAGE]: 'Document Page',
//     [DocType.OTHER]: 'Other',
//     [DocType.MD]: 'Markdown',
// }
//
// export const DOC_TYPE_DESCRIPTIONS = {
//     [DocType.PDF]: 'Portable Document Format',
//     [DocType.WORD]: 'Microsoft Word',
//     [DocType.EXCEL]: 'Microsoft Excel',
//     [DocType.POWERPOINT]: 'Microsoft PowerPoint',
//     [DocType.IMAGE]: 'Image',
//     [DocType.TEXT]: 'Text',
//     [DocType.VIDEO]: 'Video',
//     [DocType.AUDIO]: 'Audio',
//     [DocType.ARCHIVE]: 'Archive',
//     [DocType.CODE]: 'Code',
//     [DocType.PRESENTATION]: 'Presentation',
//     [DocType.SPREADSHEET]: 'Spreadsheet',
//     [DocType.DOCUMENT]: 'Document',
//     [DocType.PRESENTATION_SLIDE]: 'Presentation Slide',
//     [DocType.SPREADSHEET_SHEET]: 'Spreadsheet Sheet',
//     [DocType.DOCUMENT_PAGE]: 'Document Page',
//     [DocType.OTHER]: 'Other',
//     [DocType.MD]: 'A simple rich text format with the basic features for creating documents.',
// }

export const DOC_TYPE_ABBREVIATIONS = {
    // [DocType.PDF]: 'PDF',
    // [DocType.WORD]: 'WORD',
    // [DocType.EXCEL]: 'EXCEL',
    // [DocType.POWERPOINT]: 'PPT',
    // [DocType.IMAGE]: 'IMG',
    // [DocType.TEXT]: 'TXT',
    // [DocType.VIDEO]: 'VID',
    // [DocType.AUDIO]: 'AUD',
    // [DocType.ARCHIVE]: 'ZIP',
    // [DocType.CODE]: 'CODE',
    // [DocType.PRESENTATION]: 'PPT',
    // [DocType.SPREADSHEET]: 'XLS',
    // [DocType.DOCUMENT]: 'DOC',
    // [DocType.PRESENTATION_SLIDE]: 'SLD',
    // [DocType.SPREADSHEET_SHEET]: 'SHT',
    // [DocType.DOCUMENT_PAGE]: 'PG',
    [DocType.OTHER]: 'UNKNOWN',
    [DocType.MD]: 'MD',
    [DocType.SD]: 'SD',
}

export const DOC_TYPE_TRANSLATION = "Extra.DocType";

export function getDocTypeByExtension(ext?: string) {
    switch (ext?.toLowerCase().trim()) {
        case 'md':
            return DocType.MD;
        case 'sd':
            return DocType.SD;
        default:
            return DocType.OTHER
    }
}

export default DocType;