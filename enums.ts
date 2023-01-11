// exporting enums from a d.ts file doesn't work.

// Sidebar views
export enum ActiveView {
    HomeView = 0,
    FileSystemView = 1,
}

// Type of modifications of resume parts
export enum ModState {
    Add = 0,
    Update = 1,
    Delete = 2,
}

// Used by the lexer.
export enum Token {
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
