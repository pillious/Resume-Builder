import jsPDF from "jspdf";
import { IFile, ISection, IItem } from "../custom2";

const ySpaceBetween = 6;
const fontSize = 10.5;

export const generate = async (file: IFile) => {
    if (file) {
        console.log(file);

        let yPosMultiplier = 1;

        const itemGen = (doc: jsPDF, item: IItem) => {
            doc.text(item.content, 20, yPosMultiplier++ * ySpaceBetween);
        };

        const sectionGen = (doc: jsPDF, section: ISection) => {
            doc.text(section.name, 10, yPosMultiplier++ * ySpaceBetween);

            for (const item of section.items) itemGen(doc, item);
        };

        const doc = new jsPDF();
        doc.setProperties({ title: file.name });
        doc.setFontSize(fontSize);

        try {
            const loadFont = async (
                src: string,
                name: string,
                style: string,
                weight: string
            ) => {
                const fontBytes = await fetch(src).then((res) =>
                    res.arrayBuffer()
                );

                const filename = src.split("\\").pop()?.split("/").pop();
                const base64String = btoa(
                    String.fromCharCode.apply(null, new Uint8Array(fontBytes))
                );

                if (filename && base64String) {
                    doc.addFileToVFS(filename, base64String);
                    doc.addFont(filename, name, style, weight);
                    doc.setFont("Proxima-Nova-Reg");
                }
            };

            await loadFont(
                "/fonts/Proxima-Nova-Reg.ttf",
                "Proxima-Nova-Reg",
                "normal",
                "400"
            );
        } catch (err) {
            console.log(err);
        }

        for (const section of file.sections) sectionGen(doc, section);

        return doc;
    }

    return null;
};

export const getURI = (doc: jsPDF | null): string =>
    doc ? doc.output("datauristring") : "";

// const loadCustomFont = async (relPath: string) => {
//     const resp = await fetch(relPath);
//     const blob = await resp.blob();

//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = () => {
//         const base64data = reader.result;
//         return base64data;
//     };
// };
