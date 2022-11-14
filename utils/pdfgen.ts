import jsPDF from "jspdf";
import { IFile, ISection, IItem } from "../custom2";

const fontSize = 10.5;
const ySpacing = 6;

export class Pdf {
    private _doc: jsPDF;
    private _nextXPos: number;
    private _nextYPos: number;

    constructor(doc = new jsPDF(), startXPos = 8, startYPos = ySpacing) {
        this._doc = doc;
        this._nextXPos = startXPos;
        this._nextYPos = startYPos;
    }

    reset(startXPos = 8, startYPos = ySpacing) {
        this._doc = new jsPDF();
        this._nextXPos = startXPos;
        this._nextYPos = startYPos;
        return this;
    }

    generate(file: IFile) {
        if (file) {
            console.log(file);

            this._doc.setProperties({ title: file.name });
            this._doc.setFontSize(fontSize);

            this.buildSection(file.header);
            for (const section of file.sections) this.buildSection(section);
        }

        return this;
    }

    download(fileName?: string) {
        try {
            this._doc.save(fileName);
        } catch (err) {
            console.log(err);
            return false;
        }

        return true;
    }

    getUri() {
        return this._doc ? this._doc.output("datauristring") : "";
    }

    buildSection(section: ISection) {
        this._doc.text(section.name, this._nextXPos, this._nextYPos);
        this._nextYPos += ySpacing;
        for (const item of section.items) this.buildItem(item);
        return this;
    }

    buildItem(item: IItem) {
        this._doc.text(item.content, this._nextXPos * 2, this._nextYPos);
        this._nextYPos += ySpacing;
        return this;
    }

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
