import { Schema, model, models } from "mongoose";
import { ISection } from "../types";
import { experienceSchema } from "./ExperienceModel.model";

export const sectionSchema = new Schema<ISection>(
    {
        name: { type: String, default: "" },
        items: [{ type: experienceSchema, default: [] }],
        id: { type: String, required: true },
        order: { type: Number, required: true },
    },
    { _id: false }
);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["section"] ?? model("section", sectionSchema);
