import { Schema, model, models } from "mongoose";
import { IFile } from "../custom2.d";
import { sectionSchema } from "./SectionModel.model";

const fileSchema = new Schema<IFile>({
    name: { type: String, required: true },
    sections: [{ type: sectionSchema, default: [] }],
    id: { type: String, required: true },
});

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["files"] ?? model("files", fileSchema);
