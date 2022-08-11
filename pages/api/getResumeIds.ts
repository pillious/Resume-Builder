import { NextApiRequest, NextApiResponse } from "next";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { ResponseSuccess, ResponseError } from "../../custom2.d";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        await dbConnect();
        const docs = await FileModel.find({}).select('name id -_id');
        res.status(200).json({ data: { files: docs } });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
