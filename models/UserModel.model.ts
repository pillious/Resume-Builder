import { Schema, model, models } from "mongoose";
import { IUser } from "../custom2";

export const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, require: true },
    image: { type: String, default: "" },
});

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["user"] ?? model("user", userSchema);
