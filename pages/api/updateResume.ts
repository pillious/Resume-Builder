import { NextApiRequest, NextApiResponse } from "next";
// import { detailedDiff } from "deep-object-diff";
// import FileModel from "../../models/FileModel.model";
// import dbConnect from "../../utils/database";
import {
    ResponseSuccess,
    ResponseError,
    // AcknowledgementResponseData,
    IFile,
    guid,
    ModState,
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
                    modList,
                }: { resume: IFile | null; modList: Record<guid, ModState> } =
                    JSON.parse(req.body);

                console.dir(resume, { depth: 10 });
                console.log(modList);

                const modListKeys: string[] = [];
                Object.keys(modList).forEach((k: string) => {
                    if (k.includes(".")) modListKeys.push(k);
                    else modListKeys.unshift(k);
                });

                

                // const section: Record<string, ModState> = {};
                // let item: Record<string, ModState> = {};

                // for (const k in modList) {
                //     if (k.includes(".")) item[k] = modList[k];
                //     else section[k] = modList[k];
                // }

                // console.log(section, item);

                // const operations: object[] = [];

                // // add, delete, update
                // for (const k in section) {
                //     switch (section[k]) {
                //         case ModState.Add: {
                //             const section = resume?.sections.find(
                //                 (s) => s.id === k
                //             );
                //             operations.push({
                //                 updateOne: {
                //                     filter: { id: k },
                //                     update: { $push: { sections: section } },
                //                 },
                //             });

                //             // item = item.filter((i) =>)

                //             break;
                //         }
                //         case ModState.Update: {
                //             break;
                //         }
                //         case ModState.Delete: {
                //             break;

                //             // remove all item updates too.
                //         }
                //     }
                //     console.log(k);
                // }

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
