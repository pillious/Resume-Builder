// Schema objects
export interface ISection {
    name: string;
    items: string[];
    id: string; // nanoid
}

export interface IFile {
    name: string;
    sections: ISection[];
    id: string; // nanoid
}

// API response objects
export type ResponseSuccess = {
    // data: Record<string, unknown>;
    data: {
        files?: IFile[];
        file?: IFile;
    };
};

export type ResponseError = {
    error: {
        code: number;
        message: unknown | string;
    };
};

// Sidebar views
export enum ActiveView {
    HomeView = 0,
    FileSystemView = 1,
}

// Tells TypeScript that the font filetypes are valid import modules.
// declare module "*.ttf";
// declare module "*.woff";
// declare module "*.woff2";
