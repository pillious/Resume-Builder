// https://www.cs.umd.edu/class/fall2021/cmsc330/lectures/20-parsing.pdf

enum Token {
    TOK_BULLET = "TOK_BULLET",
    TOK_BOLD = "TOK_BOLD",
    TOK_ITALIC = "TOK_ITALIC",
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

const BOLD_RE = /(?:\*\*|__)/;
const ITALIC_RE = /(?:\*|_)/;

type options =
    | {
          allowBullets: true;
      }
    | {
          allowHeadings: true;
      };

const defaultOptions: options = { allowBullets: true };

const lexer = (
    input: string,
    options: options = defaultOptions
): (Token | string)[] => {
    if (input === "") return [];

    const tokens: (Token | string)[] = [];

    if ("allowBullets" in options && options.allowBullets) {
        if (input.search(BULLET_RE) === 0) {
            tokens.push(Token.TOK_BULLET);
            input = input.substring(2);
        }
    } else if ("allowHeadings" in options && options.allowHeadings) {
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

    lexerRec(input, tokens);

    return tokens;
};

const lexerRec = (
    input: string,
    tokens: (Token | string)[]
): (Token | string)[] => {
    if (input === "") return tokens;

    const boldIdx = input.search(BOLD_RE);
    if (boldIdx === 0) {
        tokens.push(Token.TOK_BOLD);
        return lexerRec(input.substring(2), tokens);
    }

    const italicIdx = input.search(ITALIC_RE);
    if (italicIdx === 0) {
        tokens.push(Token.TOK_ITALIC);
        return lexerRec(input.substring(1), tokens);
    }

    let maxTextIdx = -1;
    if (boldIdx < 0 && italicIdx < 0) maxTextIdx = -1;
    else if (boldIdx < 0) maxTextIdx = italicIdx;
    else if (italicIdx < 0) maxTextIdx = boldIdx;
    else maxTextIdx = Math.min(boldIdx, italicIdx);

    if (maxTextIdx < 0) {
        tokens.push(input);
        input = "";
    } else {
        tokens.push(input.substring(0, maxTextIdx));
        input = input.substring(maxTextIdx);
    }

    return lexerRec(input, tokens);
};

export default lexer;