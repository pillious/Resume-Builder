import { Schema, model, models } from "mongoose";
import { IItem } from "../types";

export const itemSchema = new Schema<IItem>(
    {
        content: { type: String, default: "" },
        order: { type: Number, required: true },
        id: { type: String, required: true },
    },
    { _id: false }
);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["item"] ?? model("item", itemSchema);
