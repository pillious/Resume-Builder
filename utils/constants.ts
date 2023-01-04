import { jsPDFOptions } from "jspdf";
import { pt } from "../custom2";

// GUID
export const CHARACTER_SET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const GUID_LEN = 6;
export const FILE_GUID_LEN = 20;

// PDF
export const PDF_OPTIONS: jsPDFOptions = {
    orientation: "p",
    unit: "pt",
    format: "letter",
    putOnlyUsedFonts: true,
};
export const PAGE_MARGIN: { X: pt; Y: pt } = {
    X: 36, // 0.5 in
    Y: 36, // 0.5 in
};
export const BULLET_TEXT = "* ";
export const BULLET_ICON = "• ";
export const DIVIDER = " | ";
export const BULLET_INDENTATION: pt = 15;
export const DEFAULT_FONT_SIZE: pt = 10.5;
export const DEFAULT_LINE_SPACING: pt = 4;
export const FONT_SIZE_MULTIPLIER = {
    H1: 2,
    H2: 1.5,
    H3: 1.25,
    H4: 1,
    H5: 0.875,
    H6: 0.85,
};
export const FONT_FAMILY = "times";
