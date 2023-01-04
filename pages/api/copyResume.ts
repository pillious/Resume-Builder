import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { ApiResponse, IFile } from "../../custom2.d";
import { HydratedDocument } from "mongoose";
import nanoid from "../../utils/guid";
import { FILE_GUID_LEN } from '../../utils/constants';

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) => {
    try {
        switch (req.method) {
            case "POST": {
                const session = await unstable_getServerSession(
                    req,
                    res,
                    authOptions
                );

                if (session) {
                    await dbConnect();
                    const { fileId, userId } = JSON.parse(req.body);
                    if (
                        fileId !== undefined &&
                        fileId !== null &&
                        userId !== undefined &&
                        userId !== null
                    ) {
                        let resp = await FileModel.findOne({
                            id: fileId,
                            userId,
                        });
                        const obj = resp.toObject();
                        delete obj._id;
                        obj.id = nanoid(FILE_GUID_LEN);
                        obj.name = `${obj.name} copy`;
                        const file: HydratedDocument<IFile> = new FileModel(
                            obj
                        );
                        resp = await file.save();

                        res.status(200).json({
                            data: { message: "Successfully copied file." },
                        });
                    } else {
                        res.status(404).json({
                            error: {
                                code: 404,
                                message: "Failed to copy file.",
                            },
                        });
                    }
                } else {
                    res.status(401).json({
                        error: { code: 401, message: "Unauthorized" },
                    });
                }

                break;
            }
            default:
                res.status(405).json({
                    error: { code: 405, message: `${req.method} not allowed.` },
                });
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            error: { code: 500, message: "Internal Server Error" },
        });
    }
};

export default handler;
