import { NextApiRequest, NextApiResponse } from "next";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import {
    ResponseSuccess,
    ResponseError,
    AcknowledgementResponseData,
} from "../../custom2.d";

type BODYTYPE =
    | undefined
    | { type: "name"; fileId: string; name: string }
    | { type: "section"; fileId: string; sectionId: string; name: string }
    | {
          type: "item";
          fileId: string;
          sectionId: string;
          itemIdx: number;
          content: string;
      };

type FILTERTYPE =
    | Record<string, never>
    | { id: string }
    | { id: string; "section.id": string };
type UPDATETYPE =
    | Record<string, never>
    | { name: string }
    | { $set: { [key: string]: string } };

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "POST": {
                const body: BODYTYPE = JSON.parse(req.body);

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

                if (body) {
                    let filter: FILTERTYPE = {},
                        update: UPDATETYPE = {};

                    switch (body?.type) {
                        case "name": {
                            filter = { id: body.fileId };
                            update = { name: body.name };
                            break;
                        }
                        case "section": {
                            filter = {
                                id: body.fileId,
                                "section.id": body.sectionId,
                            };
                            update = { $set: { "sections.$.name": body.name } };
                            break;
                        }
                        case "item": {
                            filter = {
                                id: body.fileId,
                                "section.id": body.sectionId,
                            };
                            update = {
                                $set: {
                                    [`sections.$.name.${body.itemIdx}`]:
                                        body.content,
                                },
                            };
                            break;
                        }
                    }
                    console.log(filter, update);
                    // await dbConnect();
                    // const resp: AcknowledgementResponseData =
                    //     await FileModel.updateOne(filter, update);
                    res.status(200).json({ data: { file: undefined } });
                    break;

                    // db.files.updateOne({id: "hz6yBL", "sections.id": "39i9UMW"}, {"$set": {"sections.$.name": "new name"}})
                    // db.files.updateOne({id: "hz6yBL", "sections.id": "39i9UMW"}, {"$set": {"sections.$.items.0": "new name"}})
                }

                throw new Error("body is undefined");
            }
            default:
                throw new Error(`${req.method} is not allowed.`);
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
