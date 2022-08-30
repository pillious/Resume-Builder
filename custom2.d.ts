// Schema objects

export interface IItem {
    content: string,
    order : number,
    id: string; // nanoid
}
export interface ISection {
    name: string;
    items: IItem[];
    id: string; // nanoid
}

export interface IFile {
    name: string;
    sections: ISection[];
    id: string; // nanoid
}

// API
export type ResponseSuccess = {
    data: FileResponseData | AcknowledgementResponseData;
};

export type FileResponseData = {
    files?: IFile[];
    file?: IFile;
};

export type AcknowledgementResponseData = {
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
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
