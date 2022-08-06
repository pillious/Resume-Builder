import { Schema, model } from "mongoose";
import guid from "../utils/guid";

// 1. Create an interface representing a document in MongoDB.
interface ISection {
    name: string;
    items: string[];
    id: string; // nanoid
}

// 2. Create a Schema corresponding to the document interface.
const sectionSchema = new Schema<ISection>({
    name: { type: String, required: true },
    items: [{ type: String, default: [] }],
    id: { type: String, default: guid() },
});

interface IFile {
    name: string;
    sections: ISection[];
    id: string; // nanoid
}

const fileSchema = new Schema<IFile>({
    name: { type: String, required: true },
    sections: [{ type: sectionSchema, default: [] }],
    id: { type: String, default: guid() },
});

// https://stackoverflow.com/questions/53463644/why-do-i-get-error-cannot-overwrite-model-once-compiled-in-mongoose-when-i-run
export default model<IFile>("files")
    ? model<IFile>("files")
    : model<IFile>("files", fileSchema);

// export default model<IFile>("files", fileSchema);
