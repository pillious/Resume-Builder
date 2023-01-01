import mongoose from 'mongoose';

// Misc.
export type guid = string;

export enum ModState {
    Add = 0,
    Update = 1,
    Delete = 2,
}

export type ModList = {
    header: Record<guid, ModState>;
    sections: Record<guid, ModState>;
    experiences: Record<guid, Record<guid, ModState>>;
};

// PDF Properties
export interface PDFStyles {
    margin: [number, number, number, number];
    textAlign: "left" | "center" | "right";
    fontFamily: string;
    fontSize: number;
    fontStyle: "normal" | "italic";
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    color: string;
}
export interface PDFDocStyles {
    spacing: number;
}

export interface PDFSectionProps {
    spacing: number;
}

export interface PDFItemProps {
    spacing: number;
}

// Schema objects
export interface IFile {
    userId: mongoose.Schema.Types.ObjectId;
    name: string;
    categories: { id: guid; name: string }[]; // add
    sections: ISection[];
    header: IHeader;
    id: guid;
}

export interface IHeader {
    name: string;
    items: IItem[];
    id: guid;
}

export interface ISection {
    name: string;
    items: IExperience[];
    id: guid;
    order: number;
}

export interface IExperience {
    name: string;
    items: IItem[];
    id: guid;
    sectionId: guid;
    startDate: string;
    endDate: string;
    order: number;
}

export interface IItem {
    content: string;
    order: number;
    id: guid;
}

export interface IUser {
    name: string;
    email: string;
    image: string;
    _id: guid;
}

// API
export type ApiResponse = ApiResponseSuccess | ApiResponseError;

type ApiResponseSuccess = {
    data:
        | { file: IFile | Record<string, never> }
        | { files: IFile[] }
        | { fileIdentifiers: { name: string; id: guid }[]}
        | { message: string }
        | { user: IUser | Record<string, never> };
};

type ApiResponseError = {
    error: {
        code: 400 | 401 | 404 | 405 | 500;
        message: string;
    };
};

// Sidebar views
export enum ActiveView {
    HomeView = 0,
    FileSystemView = 1,
}
