import { Schema, model, models } from "mongoose";
import { IFile } from "../custom2.d";
import { sectionSchema } from "./SectionModel.model";

const fileSchema = new Schema<IFile>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    sections: [{ type: sectionSchema, default: [] }],
    header: { type: sectionSchema, required: true },
    id: { type: String, required: true },
});

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["files"] ?? model("files", fileSchema);
