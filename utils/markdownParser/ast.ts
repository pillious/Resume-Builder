/**
 * Abstract Syntax Tree for a simple markdown language
 */
export class AST {
    head: Node | null;

    constructor(head?: Node) {
        this.head = head ?? null;
    }
}

export class Node {
    bold: boolean;
    italic: boolean;
    bullet: boolean;
    heading: "none" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    text: string;
    next: Node | null;

    constructor(
        text: string,
        bold?: boolean,
        italic?: boolean,
        bullet?: boolean,
        heading?: "none" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
        next?: Node
    ) {
        this.text = text;
        this.bold = bold ?? false;
        this.italic = italic ?? false;
        this.bullet = bullet ?? false;
        this.heading = heading ?? "none";
        this.next = next ?? null;
    }
}
