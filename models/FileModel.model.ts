import { Schema, model, models } from "mongoose";
import { ISection, IFile} from "../custom2";

const sectionSchema = new Schema<ISection>({
    name: { type: String, required: true },
    items: [{ type: String, default: [] }],
    id: { type: String, required: true},
});

const fileSchema = new Schema<IFile>({
    name: { type: String, required: true },
    sections: [{ type: sectionSchema, default: [] }],
    id: { type: String, required: true},
});
// https://stackoverflow.com/questions/53463644/why-do-i-get-error-cannot-overwrite-model-once-compiled-in-mongoose-when-i-run
// export default model<IFile>("files")
//     ? model<IFile>("files")
//     : model<IFile>("files", fileSchema);

// https://stackoverflow.com/questions/19051041/cannot-overwrite-model-once-compiled-mongoose
export default models["files"] ?? model("files", fileSchema);

// export default model<IFile>("files", fileSchema);
