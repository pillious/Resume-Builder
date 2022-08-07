import { NextApiRequest, NextApiResponse } from "next";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
// import { Document } from "mongoose";
import guid from "../../utils/guid";
import { ResponseSuccess, ResponseError } from "../../custom2.d";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "POST": {
                await dbConnect();
                const doc = new FileModel({
                    name: `File-${guid()}`,
                    id: guid(),
                });
                await doc.save();

                res.status(200).json({ data: { file: doc } });
                break;
            }
            default:
                throw new Error(`${req.method} is not allowed.`);
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
