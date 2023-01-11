// import { Token } from "../../custom2";

import { LexerOptions } from "../../custom2";

enum Token {
    TOK_BULLET = "TOK_BULLET",
    TOK_BOLD = "TOK_BOLD",
    TOK_BOLD_END = "TOK_BOLD_END",
    TOK_ITALIC = "TOK_ITALIC",
    TOK_ITALIC_END = "TOK_ITALIC_END",
    TOK_STRING = "TOK_STRING", // TOK_STRING must be immedeatly followed by a string.
    TOK_H1 = "TOK_H1",
    TOK_H2 = "TOK_H2",
    TOK_H3 = "TOK_H3",
    TOK_H4 = "TOK_H4",
    TOK_H5 = "TOK_H5",
    TOK_H6 = "TOK_H6",
}

const BULLET_RE = /^\* /;
const H1_RE = /^# /;
const H2_RE = /^## /;
const H3_RE = /^### /;
const H4_RE = /^#### /;
const H5_RE = /^##### /;
const H6_RE = /^######/;

const BOLD_RE = /(?:\*\*)/;
const ITALIC_RE = /(?:_)/;

/**
 * Converts a string into an array of tokens.
 */
const lexer = (input: string, options?: LexerOptions): (Token | string)[] => {
    if (input === "") return [];

    // Options default to true if not specified.
    const allowBullets = options
        ? options.allowBullets === undefined
            ? true
            : options.allowBullets
        : true;
    const allowHeadings = options
        ? options.allowHeadings === undefined
            ? true
            : options.allowHeadings
        : true;

    const tokens: (Token | string)[] = [];

    let boldCount = 0; // track number of TOK_BOLD/TOK_BOLD_END
    let italicCount = 0; // track number of TOK_ITALIC/TOK_ITALIC_END

    // bullets & headers are only allowed to appear at the beginning of the string
    if (input.search(BULLET_RE) === 0 && allowBullets) {
        tokens.push(Token.TOK_BULLET);
        input = input.substring(2);
    } else if (allowHeadings) {
        if (input.search(H6_RE) === 0) {
            tokens.push(Token.TOK_H6);
            input = input.substring(7);
        } else if (input.search(H5_RE) === 0) {
            tokens.push(Token.TOK_H5);
            input = input.substring(6);
        } else if (input.search(H4_RE) === 0) {
            tokens.push(Token.TOK_H4);
            input = input.substring(5);
        } else if (input.search(H3_RE) === 0) {
            tokens.push(Token.TOK_H3);
            input = input.substring(4);
        } else if (input.search(H2_RE) === 0) {
            tokens.push(Token.TOK_H2);
            input = input.substring(3);
        } else if (input.search(H1_RE) === 0) {
            tokens.push(Token.TOK_H1);
            input = input.substring(2);
        }
    }

    // Recursive helper function (tokenizes bold, italics, text)
    const lexerRec = (
        input: string,
        tokens: (Token | string)[]
    ): (Token | string)[] => {
        if (input === "") return tokens;

        const boldIdx = input.search(BOLD_RE);
        if (boldIdx === 0) {
            if (boldCount % 2 === 0) tokens.push(Token.TOK_BOLD);
            else tokens.push(Token.TOK_BOLD_END);
            boldCount++;
            return lexerRec(input.substring(2), tokens);
        }

        const italicIdx = input.search(ITALIC_RE);
        if (italicIdx === 0) {
            if (italicCount % 2 === 0) tokens.push(Token.TOK_ITALIC);
            else tokens.push(Token.TOK_ITALIC_END);
            italicCount++;
            return lexerRec(input.substring(1), tokens);
        }

        let maxTextIdx = -1;
        if (boldIdx < 0 && italicIdx < 0) maxTextIdx = -1;
        else if (boldIdx < 0) maxTextIdx = italicIdx;
        else if (italicIdx < 0) maxTextIdx = boldIdx;
        else maxTextIdx = Math.min(boldIdx, italicIdx);

        if (maxTextIdx < 0) {
            tokens.push(Token.TOK_STRING);
            tokens.push(input);
            input = "";
        } else {
            tokens.push(Token.TOK_STRING);
            tokens.push(input.substring(0, maxTextIdx));
            input = input.substring(maxTextIdx);
        }

        return lexerRec(input, tokens);
    };

    lexerRec(input, tokens);

    // Check if any bold/italic symbol doesn't have a closing symbol.
    if (boldCount % 2 !== 0) {
        let i = tokens.length;
        while (tokens[i] !== Token.TOK_BOLD && i >= -1) i--;
        if (i !== -1) tokens.splice(i, 1, Token.TOK_STRING, "**");
    }
    if (italicCount % 2 !== 0) {
        let i = tokens.length;
        while (tokens[i] !== Token.TOK_ITALIC && i >= -1) i--;
        if (i !== -1) tokens.splice(i, 1, Token.TOK_STRING, "_");
    }

    return tokens;
};

export default lexer;
