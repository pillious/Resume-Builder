import { NextApiRequest, NextApiResponse } from "next";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { ResponseSuccess, ResponseError } from "../../custom2.d";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "GET": {
                await dbConnect();
                const doc = await FileModel.findOne({ id: req.query.id });
                res.status(200).json({ data: { file: doc } });
                break;
            }
            default:
                throw new Error(`${req.method} is not allowed`)
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
