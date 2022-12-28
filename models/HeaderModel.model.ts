import { Schema, model, models } from "mongoose";
import { IHeader } from "../custom2.d";
import { itemSchema } from './ItemModel.model';

export const headerSchema = new Schema<IHeader>(
    {
        name: { type: String, default: "" },
        items: [{ type: itemSchema, default: [] }],
        id: { type: String, required: true },
    },
    { _id: false }
);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["header"] ?? model("header", headerSchema);
