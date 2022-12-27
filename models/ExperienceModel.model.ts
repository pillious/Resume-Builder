import { Schema, model, models } from "mongoose";
import { IExperience } from "../custom2.d";
import { itemSchema } from "./ItemModel.model";

export const experienceSchema = new Schema<IExperience>(
    {
        name: { type: String, default: "" },
        items: [{ type: itemSchema, default: [] }],
        id: { type: String, required: true },
        sectionId: { type: String, required: true },
        startDate: { type: String, default: "" },
        endDate: { type: String, default: "" },
    },
    { _id: false }
);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["experience"] ?? model("experience", experienceSchema);
