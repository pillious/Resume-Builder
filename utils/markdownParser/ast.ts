/**
 * Abstract Syntax Tree for a simple markdown language
 */
export class AST {
    head: Node | null;

    constructor(head?: Node) {
        this.head = head ?? null;
    }

    public reverse(): AST {
        function reverse(node: Node): Node {
            if (!node || !node.next) {
                return node;
            }
            const tmp = reverse(node.next);
            node.next.next = node;
            node.next = null;
            return tmp;
        }

        if (this.head) this.head = reverse(this.head);

        return this;
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
        next?: Node | null
    ) {
        this.text = text;
        this.bold = bold ?? false;
        this.italic = italic ?? false;
        this.bullet = bullet ?? false;
        this.heading = heading ?? "none";
        this.next = next ?? null;
    }

    public setText(text: string): Node {
        this.text = text;
        return this;
    }

    public splitNode(text1: string, text2: string): Node {
        const node = new Node(
            text2,
            this.bold,
            this.italic,
            this.bullet,
            this.heading,
            this.next
        );

        this.text = text1;
        this.next = node;

        return this;
    }
}
