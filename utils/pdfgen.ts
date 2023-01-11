import jsPDF, { TextOptionsLight } from "jspdf";
import {
    IFile,
    IHeader,
    ISection,
    IExperience,
    IItem,
    pt,
    LexerOptions,
} from "../custom2";
import { sortByOrder } from "./utils";
import {
    BULLET_ICON,
    BULLET_INDENTATION,
    DEFAULT_FONT_SIZE,
    DEFAULT_LINE_SPACING,
    DIVIDER,
    FONT_FAMILY,
    FONT_SIZE_MULTIPLIER,
    PAGE_MARGIN,
    PDF_OPTIONS,
} from "./constants";
import lexer from "./markdownParser/lexer";
import parser from "./markdownParser/parser";
import { Node } from "./markdownParser/ast";

export class Pdf {
    private _doc: jsPDF;
    private _nextYPos: pt;
    private _fontSize: pt;
    private _lineSpacing: pt;
    private _xMargin: pt;
    private _yMargin: pt;
    private _bulletIndentation: pt;

    private _PAGE_HEIGHT: pt;
    private _PAGE_WIDTH: pt;

    constructor() {
        this._doc = new jsPDF(PDF_OPTIONS);
        this._fontSize = DEFAULT_FONT_SIZE;
        this._lineSpacing = DEFAULT_LINE_SPACING;
        this._bulletIndentation = BULLET_INDENTATION;
        this._nextYPos = PAGE_MARGIN.Y;
        this._xMargin = PAGE_MARGIN.X;
        this._yMargin = PAGE_MARGIN.Y;

        this._PAGE_HEIGHT =
            this._doc.internal.pageSize.height ||
            this._doc.internal.pageSize.getHeight();
        this._PAGE_WIDTH =
            this._doc.internal.pageSize.width ||
            this._doc.internal.pageSize.getWidth();
    }

    generate(file: IFile): Pdf {
        // Initial setup
        this._doc.setProperties({ title: file.name });
        this._doc.setFont(FONT_FAMILY);

        // Generate text
        this._buildHeader(file.header)._nextLine();

        for (const sec of sortByOrder<ISection>(file.sections)) {
            this._buildSectionTitle(sec.name)._nextLine();

            for (const exp of sortByOrder<IExperience>(sec.items)) {
                this._buildExperienceTitle(exp.name);

                let offset = 0;
                if (exp.endDate) {
                    this._printLine(exp.endDate, "right", offset, undefined, {
                        allowBullets: false,
                    });
                    offset += this._doc.getTextWidth(exp.endDate);
                }
                if (exp.startDate) {
                    if (exp.endDate) {
                        this._printLine(" - ", "right", offset);
                        offset += this._doc.getTextWidth(" - ");
                    }

                    this._printLine(exp.startDate, "right", offset, undefined, {
                        allowBullets: false,
                    });
                }

                if (exp.name || exp.endDate || exp.startDate) this._nextLine();

                for (const item of sortByOrder<IItem>(exp.items)) {
                    this._buildItem(item.content)._nextLine();
                }
            }
        }

        return this;
    }

    // Text Generation Methods

    /**
     * Create the name & personal info
     */
    private _buildHeader(header: IHeader): Pdf {
        // Prints name
        this._printLine(header.name, "center", 0, undefined, {
            allowBullets: false,
        })._nextLine();

        this._p()._normal(); // set to default font size & font style.

        // Initialize variables
        const maxWidth = this._PAGE_WIDTH - 2 * this._xMargin;
        const dividerWidth = this._doc.getTextWidth(DIVIDER);
        let pos: number[] = []; // gives the starting x pos for each new line.
        let i = 0;

        // calculate the starting x pos for each new line.
        for (let j = 0; j < header.items.length; j++) {
            let textWidth = this._doc.getTextWidth(header.items[j].content);
            if (j !== header.items.length - 1) textWidth += dividerWidth;

            if (pos[i] === undefined) pos[i] = 0;

            if (pos[i] + textWidth <= maxWidth) pos[i] += textWidth;
            else pos[++i] = textWidth;
        }
        pos = pos.map((p) => (maxWidth - p) / 2);

        // Print peronal info text according to AST
        i = 0;
        while (i < header.items.length) {
            const textWidth = this._doc.getTextWidth(header.items[i].content);

            // Handles text overflow
            if (textWidth > maxWidth) {
                // fallback -> prevent infinite loop.
                this._printLine(header.items[i].content)._nextLine();
                i++;
                continue;
            } else if (pos[0] + textWidth > maxWidth) {
                this._nextLine();
                pos.shift();
                continue;
            }

            let ast = parser(
                lexer(header.items[i].content, {
                    allowBullets: false,
                    allowHeadings: false,
                })
            ).head;

            this._p()._normal(); // set font size/style to defaults.

            while (ast !== null) {
                this._applyStyles(ast);

                this._printTextLeft(ast.text, pos[0]);
                pos[0] += textWidth;
                if (i !== header.items.length - 1 && ast.next === null) {
                    this._p()._normal()._printTextLeft(DIVIDER, pos[0]);
                    pos[0] += dividerWidth;
                }

                ast = ast.next;
            }

            i++;
        }

        return this;
    }

    private _buildSectionTitle(title: string): Pdf {
        this._nextLine(this._lineSpacing / 2);
        this._printLine(title);
        this._printDivider();
        return this;
    }

    private _buildExperienceTitle(title: string): Pdf {
        if (title) this._printLine(title);
        return this;
    }

    private _buildItem(content: string): Pdf {
        this._printLine(content);
        return this;
    }

    /**
     * Prints the string accoring to the AST of the text.
     */
    _printLine(
        line: string,
        align?: "left" | "center" | "right",
        offset?: number,
        options?: TextOptionsLight,
        lexerOptions?: LexerOptions
    ): Pdf {
        // Abstract syntax tree representation of the input text.
        const ast = parser(lexer(line, lexerOptions));

        if (align === "right") ast.reverse(); // handles align right
        let node = ast.head;

        // initialization
        const maxWidth = this._PAGE_WIDTH - 2 * this._xMargin;
        offset = offset ?? 0;
        let pos = offset; // a pointer for the current x position
        let isHeading = false;
        let nodeIsBullet = false;
        let goToNextNode = true; // determines when to set ast = ast.next

        this._p()._normal(); // set font size/style to defaults.

        while (node !== null) {
            goToNextNode = true;

            this._applyStyles(node, isHeading);

            if (node.bullet === true) nodeIsBullet = true;
            else if (node.heading !== "none") {
                isHeading = true;
            } else {
                let text = node.text;
                let textWidth = this._doc.getTextWidth(text);
                let addNewLine = false;

                // Add bullet character & indentation if needed.
                if (nodeIsBullet) {
                    text = BULLET_ICON + text;
                    pos += this._bulletIndentation;
                    nodeIsBullet = false;

                    // handles indentation of a new line in case of text overflow
                    offset +=
                        this._bulletIndentation +
                        this._doc.getTextWidth(BULLET_ICON);
                }

                // Handles text overflow
                if (pos + textWidth > maxWidth) {
                    const textArr = text.split(" ");
                    let subtext = "";
                    let subtextLen = 0;

                    let i;
                    for (i = 0; i < textArr.length; i++) {
                        const len = this._doc.getTextWidth(textArr[i] + " ");
                        if (pos + subtextLen + len <= maxWidth) {
                            subtextLen += len;
                            subtext += textArr[i] + " ";
                        } else break;
                    }
                    node.setText(textArr.splice(i).join(" "));
                    text = subtext;
                    textWidth = subtextLen;
                    addNewLine = true;
                    goToNextNode = false;
                }

                // Print text w/ the proper alignment.
                if (align === undefined || align === "left")
                    this._printTextLeft(
                        text,
                        pos,
                        options ?? { align: "left" }
                    );
                else if (align === "center")
                    this._printTextCenter(
                        text,
                        pos,
                        options ?? { align: "center" }
                    );
                else
                    this._printTextRight(
                        text,
                        pos,
                        options ?? { align: "left" }
                    );

                pos += textWidth;

                if (addNewLine) {
                    pos = offset;
                    addNewLine = false;
                    this._nextLine();
                }
            }

            if (goToNextNode) node = node.next;
        }

        return this;
    }

    _printTextLeft(
        text: string,
        leftOffset?: pt,
        options?: TextOptionsLight
    ): Pdf {
        const offset = leftOffset ?? 0;
        this._doc.text(text, this._xMargin + offset, this._nextYPos, options);
        return this;
    }

    private _printTextCenter(
        text: string,
        leftOffset?: pt,
        options?: TextOptionsLight
    ): Pdf {
        const offset = leftOffset ?? 0;
        this._doc.text(
            text,
            this._PAGE_WIDTH / 2 + offset,
            this._nextYPos,
            options
        );
        return this;
    }

    private _printTextRight(
        text: string,
        rightOffset?: pt,
        options?: TextOptionsLight
    ): Pdf {
        const width = this._doc.getTextWidth(text);
        const offset = rightOffset ?? 0;
        this._doc.text(
            text,
            this._PAGE_WIDTH - this._xMargin - width - offset,
            this._nextYPos,
            options
        );
        return this;
    }

    /**
     * Creates a horizontal rule across the page.
     */
    private _printDivider(): Pdf {
        this._doc.line(
            this._xMargin,
            this._nextYPos + 2,
            this._PAGE_WIDTH - this._xMargin,
            this._nextYPos
        );
        this._nextYPos += 2;
        return this;
    }

    /**
     * Apply font size & font style based on the node's properties
     */
    private _applyStyles(node: Node, isHeading?: boolean): Pdf {
        if (node.heading !== "none") {
            // Set font size.
            switch (node.heading) {
                case "h1":
                    this._h1();
                    break;
                case "h2":
                    this._h2();
                    break;
                case "h3":
                    this._h3();
                    break;
                case "h4":
                    this._h4();
                    break;
                case "h5":
                    this._h5();
                    break;
                case "h6":
                    this._h6();
                    break;
            }
        } else {
            // Set font style.
            if ((isHeading || node.bold) && node.italic) this._boldItalic();
            else if (isHeading || node.bold) this._bold();
            else if (node.italic) this._italic();
            else this._normal();
        }

        return this;
    }

    // POSITIONAL METHODS

    /**
     * Changes the next y position.
     */
    private _nextLine(y?: pt): Pdf {
        if (y) this._nextYPos += y;
        else this._nextYPos += this._fontSize + this._lineSpacing;
        return this;
    }

    // FONT STYLE METHODS
    private _normal(): Pdf {
        this._doc.setFont(FONT_FAMILY, "normal");
        return this;
    }

    private _bold(): Pdf {
        this._doc.setFont(FONT_FAMILY, "bold");
        return this;
    }

    private _italic(): Pdf {
        this._doc.setFont(FONT_FAMILY, "italic");
        return this;
    }

    private _boldItalic(): Pdf {
        this._doc.setFont(FONT_FAMILY, "bolditalic");
        return this;
    }

    // FONT SIZE METHODS
    private _p(): Pdf {
        this._doc.setFontSize(this._fontSize);
        return this;
    }

    private _h1(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H1);
        return this;
    }

    private _h2(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H2);
        return this;
    }

    private _h3(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H3);
        return this;
    }

    private _h4(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H4);
        return this;
    }

    private _h5(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H5);
        return this;
    }

    private _h6(): Pdf {
        this._doc.setFontSize(this._fontSize * FONT_SIZE_MULTIPLIER.H6);
        return this;
    }

    // PUBLIC UTILITY METHODS

    /**
     * Generates a new jsPDF object & deletes the current one
     */
    reset() {
        this._doc = new jsPDF(PDF_OPTIONS);
        this._nextYPos = PAGE_MARGIN.Y;
        return this;
    }

    download(fileName?: string) {
        try {
            this._doc.save(fileName);
        } catch (err) {
            console.error(err);
            return false;
        }

        return true;
    }

    /**
     * Used as the src for an iframe to display the pdf.
     */
    getUri(fileName?: string) {
        return this._doc
            ? this._doc.output("datauristring", {
                  filename: fileName ?? "Resume",
              })
            : "";
    }

    /**
     * Loads a custom font from a file.
     */
    async loadAndSetFont(
        relPath: string,
        fontName: string,
        fontStyle: string,
        fontWeight: number
    ) {
        const fontBytes = await fetch(relPath).then((res) => res.arrayBuffer());

        const filename = relPath.split("\\").pop()?.split("/").pop();
        const base64String = btoa(
            String.fromCharCode.apply(
                null,
                Array.from(new Uint8Array(fontBytes))
            )
        );

        if (filename && base64String) {
            this._doc.addFileToVFS(filename, base64String);
            this._doc.addFont(filename, fontName, fontStyle, fontWeight);
            this._doc.setFont(fontName);
        }

        return this;
    }
}
