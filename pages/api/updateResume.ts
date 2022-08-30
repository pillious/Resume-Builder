import { NextApiRequest, NextApiResponse } from "next";
import { detailedDiff } from "deep-object-diff";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import {
    ResponseSuccess,
    ResponseError,
    AcknowledgementResponseData,
    IFile,
} from "../../custom2.d";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "POST": {
                const {
                    resume,
                    prevResume,
                }: { resume: IFile | null; prevResume: IFile | null } =
                    JSON.parse(req.body);

                if (resume && prevResume) {
                    // case: prev resume is null (will this case occur?)

                    console.dir(detailedDiff(prevResume, resume), {
                        depth: 10,
                    });
                    console.log("-----------------------");



                    /**
                     * added:
                     * - section: object will contain "name" key
                     * - item: will not contain "name" key
                     * - section & item: obj will look like a section obj just save the entire thing.
                     *
                     * delete:
                     * - section
                     * - item
                     *
                     * updated:
                     * - section
                     * - item
                     */
                }

                res.send({ error: { code: 1, message: "test" } });
                break;
                /**
                 * updates:
                 * file name {type: , name: }
                 * section {type: , sectionId: , name:}
                 * item {type: , sectionId: , itemIdx: , content: }
                 */

                /**
                 * updates:
                 *
                 * file name
                 * section name
                 * all items
                 */

                // db.files.updateOne({id: "hz6yBL", "sections.id": "39i9UMW"}, {"$set": {"sections.$.name": "new name"}})
                // db.files.updateOne({id: "hz6yBL", "sections.id": "39i9UMW"}, {"$set": {"sections.$.items.0": "new name"}})
            }
            default:
                throw new Error(`${req.method} is not allowed.`);
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
