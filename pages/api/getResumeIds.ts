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
                const docs = await FileModel.find({}).select("name id -_id");
                res.status(200).json({ data: { files: docs } });
                break;
            }
            default:
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
