import { Schema, model, models } from "mongoose";
import { ISection } from "../custom2.d";
import { itemSchema } from "./ItemModel.model";

export const sectionSchema = new Schema<ISection>(
    {
        name: { type: String, required: true },
        items: [{ type: itemSchema, default: [] }],
        id: { type: String, required: true },
    },
    { _id: false }
);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["section"] ?? model("section", sectionSchema);
