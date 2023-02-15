import { model, models, Schema } from "mongoose";
import { ITemplate } from "../types";
import { headerSchema } from "./HeaderModel.model";
import { sectionSchema } from "./SectionModel.model";

const templateSchema = new Schema<ITemplate>({
    name: { type: String, required: true },
    sections: [{ type: sectionSchema, default: [] }],
    header: { type: headerSchema, required: true },
    id: { type: String, required: true },
});

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["templates"] ?? model("templates", templateSchema);
