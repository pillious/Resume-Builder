import jsPDF, { TextOptionsLight } from "jspdf";
import { IFile, ISection, IExperience, IItem, pt } from "../custom2";
import { sortByOrder } from "./utils";
import {
    BULLET_ICON,
    BULLET_INDENTATION,
    BULLET_TEXT,
    DEFAULT_FONT_SIZE,
    DEFAULT_LINE_SPACING,
    DIVIDER,
    FONT_FAMILY,
    FONT_SIZE_MULTIPLIER,
    PAGE_MARGIN,
    PDF_OPTIONS,
} from "./constants";

export class Pdf {
    private _doc: jsPDF;
    private _startXPos: pt;
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
        this._startXPos = PAGE_MARGIN.X;
        this._nextYPos = PAGE_MARGIN.Y;
        this._fontSize = DEFAULT_FONT_SIZE;
        this._lineSpacing = DEFAULT_LINE_SPACING;
        this._xMargin = PAGE_MARGIN.X;
        this._yMargin = PAGE_MARGIN.Y;
        this._bulletIndentation = BULLET_INDENTATION;

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

        this._h1()
            ._bold()
            ._printTextCenter(file.header.name, "center")
            ._nextLine();

        let text = "";
        // let totalWidth = 0;
        const divider = DIVIDER;
        // const dividerWidth = this._doc.getTextWidth(divider);
        for (let i = 0; i < file.header.items.length; i++) {
            // const width = this._doc.getTextWidth(file.header.items[i].content);
            // totalWidth += width;
            if (i < file.header.items.length - 1) {
                text += file.header.items[i].content + divider;
                // totalWidth += width + dividerWidth;
            } else {
                text += file.header.items[i].content;
                // totalWidth += width;
            }
        }
        this._p()._normal()._printTextCenter(text, "center")._nextLine();

        for (const sec of sortByOrder<ISection>(file.sections)) {
            this._h4()._bold()._printText(sec.name);
            this._nextLine(2)._printDivider();
            this._nextLine();

            const bullet = BULLET_ICON;
            const bulletWidth = this._doc.getTextWidth(bullet);
            for (const exp of sortByOrder<IExperience>(sec.items)) {
                if (exp.name) this._h4()._bold()._printText(exp.name);

                let date = "";
                if (exp.startDate && exp.endDate)
                    date = `${exp.startDate} - ${exp.endDate}`;
                else if (exp.startDate) date = exp.startDate;
                else if (exp.endDate) date = exp.endDate;

                if (date && date !== "")
                    this._p()._normal()._printTextRight(date)._nextLine();
                else if (exp.name) this._nextLine();

                for (const item of sortByOrder<IItem>(exp.items)) {
                    const text = `${item.content}`;
                    this._p()._normal();
                    const textArr = this._splitText(
                        text,
                        this._PAGE_WIDTH -
                            2 * this._xMargin -
                            this._bulletIndentation -
                            bulletWidth
                    );

                    for (let i = 0; i < textArr.length; i++) {
                        if (
                            textArr[0].length >= 2 &&
                            textArr[0].substring(0, 2) === BULLET_TEXT
                        ) {
                            if (i === 0)
                                this._printText(
                                    bullet + textArr[i].substring(2),
                                    BULLET_INDENTATION
                                )._nextLine();
                            else
                                this._printText(
                                    textArr[i],
                                    BULLET_INDENTATION + bulletWidth
                                )._nextLine();
                        } else {
                            this._printText(textArr[i])._nextLine();
                        }
                    }
                }
            }
        }

        return this;
    }

    /**
     * Text Generation Methods
     */
    // private _buildHeader(header: IHeader): Pdf {}

    // private _buildSection(section: ISection): Pdf {}

    // private _buildExperience(experience: IExperience): Pdf {}

    // private _buildItem(item: IItem): Pdf {}

    _printText(text: string, leftOffset?: pt): Pdf {
        this._doc.text(
            text,
            leftOffset ? this._xMargin + leftOffset : this._xMargin,
            this._nextYPos
        );
        return this;
    }

    private _printTextCenter(
        text: string,
        align?: TextOptionsLight["align"]
    ): Pdf {
        this._doc.text(text, this._PAGE_WIDTH / 2, this._nextYPos, { align });
        return this;
    }

    private _printTextRight(
        text: string,
        align?: TextOptionsLight["align"]
    ): Pdf {
        const width = this._doc.getTextWidth(text);
        this._doc.text(
            text,
            this._PAGE_WIDTH - this._xMargin - width,
            this._nextYPos,
            { align }
        );
        return this;
    }

    private _printDivider(): Pdf {
        this._doc.line(
            this._xMargin,
            this._nextYPos,
            this._PAGE_WIDTH - this._xMargin,
            this._nextYPos
        );
        return this;
    }

    private _splitText(text: string, size: pt): string[] {
        const arr: string[] = this._doc.splitTextToSize(text, size);
        return arr;
    }

    /**
     * Positional Methods
     */
    private _nextLine(y?: pt): Pdf {
        if (y) this._nextYPos += y;
        else this._nextYPos += this._fontSize + this._lineSpacing;
        return this;
    }

    /**
     * Font Style Methods
     */
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

    /**
     * Font Size Methods
     */
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

    // buildSection(section: ISection) {
    //     this._doc.text(section.name, this._nextXPos, this._nextYPos);
    //     this._nextYPos += ySpacing;
    //     for (const item of section.items) this.buildItem(item);
    //     return this;
    // }

    // buildItem(item: IItem) {
    //     this._doc.text(item.content, this._nextXPos * 2, this._nextYPos);
    //     this._nextYPos += ySpacing;
    //     return this;
    // }

    /**
     * Utility Methods
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

    getUri(fileName?: string) {
        return this._doc
            ? this._doc.output("datauristring", {
                  filename: fileName ?? "Resume",
              })
            : "";
    }

    // For custom fonts.
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
