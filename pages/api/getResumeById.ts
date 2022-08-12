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
        const doc = await FileModel.findOne({id: req.query.id});
        res.status(200).json({ data: { file: doc } });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;