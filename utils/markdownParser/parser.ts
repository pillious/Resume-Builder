import { Token } from "../../enums";
import { AST, Node } from "./ast";

/**
 * Simplified Markdown Grammar Rules
 * ---------------------------------
 * Bullet -> • Text | H1
 * H1 -> # Text | H2
 * H2 -> ## Text | H3
 * H3 -> ### Text | H4
 * H4 -> #### Text | H5
 * H5 -> ##### Text | H6
 * H6 -> ###### Text | Text
 * Text -> string Text | Bold
 * Bold -> ** Text | **end Text | Italic
 * Italic -> _ Text | _end Text | epsilon
 */

/**
 * Converts tokens produced by the lexer into an AST.
 */
const parser = (tokens: (Token | string)[]): AST => {
    const output = new AST(new Node("")); // create an AST with a dummy head node.
    let curr = output.head;

    // Tracks which font styles to give to text. (acts like a stack).
    const fontStyle: ("bold" | "italic")[] = [];

    const lookahead = (): Token | string | null => {
        if (tokens.length > 0) return tokens[0];
        return null;
    };

    const matchTok = (tok: Token | string): (Token | string)[] => {
        if (tokens[0] === tok) tokens.splice(0, 1);
        return tokens;
    };

    const parseBullet = () => {
        if (lookahead() === Token.TOK_BULLET && curr !== null) {
            curr.next = new Node("", false, false, true);
            curr = curr.next;
            matchTok(Token.TOK_BULLET);
            parseText();
        } else {
            parseH1();
        }
    };

    const parseH1 = () => {
        if (lookahead() === Token.TOK_H1 && curr !== null) {
            curr.next = new Node("", false, false, false, "h1");
            curr = curr.next;
            matchTok(Token.TOK_H1);
            parseText();
        } else {
            parseH2();
        }
    };

    const parseH2 = () => {
        if (lookahead() === Token.TOK_H2 && curr !== null) {
            curr.next = new Node("", false, false, false, "h2");
            curr = curr.next;
            matchTok(Token.TOK_H2);
            parseText();
        } else {
            parseH3();
        }
    };

    const parseH3 = () => {
        if (lookahead() === Token.TOK_H3 && curr !== null) {
            curr.next = new Node("", false, false, false, "h3");
            curr = curr.next;
            matchTok(Token.TOK_H3);
            parseText();
        } else {
            parseH4();
        }
    };

    const parseH4 = () => {
        if (lookahead() === Token.TOK_H4 && curr !== null) {
            curr.next = new Node("", false, false, false, "h4");
            curr = curr.next;
            matchTok(Token.TOK_H4);
            parseText();
        } else {
            parseH5();
        }
    };

    const parseH5 = () => {
        if (lookahead() === Token.TOK_H5 && curr !== null) {
            curr.next = new Node("", false, false, false, "h5");
            curr = curr.next;
            matchTok(Token.TOK_H5);
            parseText();
        } else {
            parseH6();
        }
    };

    const parseH6 = () => {
        if (lookahead() === Token.TOK_H6 && curr !== null) {
            curr.next = new Node("", false, false, false, "h6");
            curr = curr.next;
            matchTok(Token.TOK_H6);
        }

        parseText();
    };

    const parseText = () => {
        if (curr !== null) {
            if (lookahead() === Token.TOK_STRING) {
                const bold =
                    fontStyle.findIndex((i) => i === "bold") !== -1
                        ? true
                        : false;
                const italic =
                    fontStyle.findIndex((i) => i === "italic") !== -1
                        ? true
                        : false;

                matchTok(Token.TOK_STRING);
                const lookaheadVal = lookahead();

                if (lookaheadVal !== null) {
                    curr.next = new Node(lookaheadVal, bold, italic);
                    curr = curr.next;
                    matchTok(lookaheadVal);
                }

                parseText();
            } else parseBold();
        }
    };

    const parseBold = () => {
        if (lookahead() === Token.TOK_BOLD && curr !== null) {
            fontStyle.push("bold");
            matchTok(Token.TOK_BOLD);
            parseText();
        } else if (lookahead() === Token.TOK_BOLD_END && curr != null) {
            matchTok(Token.TOK_BOLD_END);
            const idx = fontStyle.lastIndexOf("bold");
            if (idx !== -1) fontStyle.splice(idx, 1);
            parseText();
        } else {
            parseItalic();
        }
    };

    const parseItalic = () => {
        if (lookahead() === Token.TOK_ITALIC && curr !== null) {
            fontStyle.push("italic");
            matchTok(Token.TOK_ITALIC);
            parseText();
        } else if (lookahead() === Token.TOK_ITALIC_END) {
            matchTok(Token.TOK_ITALIC_END);
            const idx = fontStyle.lastIndexOf("italic");
            if (idx !== -1) fontStyle.splice(idx, 1);
            parseText();
        }
    };

    // Begin parsing (parseBullet is the first rule in the grammar).
    parseBullet();

    // remove dummy head node.
    if (output.head !== null) output.head = output.head.next;

    return output;
};

export default parser;
