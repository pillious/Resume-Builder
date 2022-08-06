import { NextApiRequest, NextApiResponse } from "next";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { Document } from "mongoose";

type DataSuccess = {
    file: Document | null;
};

type DataError = {
    error: unknown;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<DataSuccess | DataError>
) => {
    try {
        await dbConnect();
        const doc = await FileModel.findOne({});
        res.status(200).json({ file: doc });
    } catch (ex) {
        res.status(500).json({ error: ex });
    }
};

export default handler;
