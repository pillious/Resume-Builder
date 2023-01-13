import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import guid from "../../utils/guid";
import { ApiResponse, IFile } from "../../types";
import HeaderModel from "../../models/HeaderModel.model";
import mongoose, { HydratedDocument } from "mongoose";
import { FILE_GUID_LEN } from "../../utils/constants";

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
                    const { fileName, userId } = JSON.parse(req.body);

                    if (
                        fileName === undefined ||
                        fileName === null ||
                        userId === undefined ||
                        userId === null
                    ) {
                        res.status(400).json({
                            error: { code: 400, message: "Invalid Parameters" },
                        });
                    }

                    const doc: HydratedDocument<IFile> = new FileModel({
                        userId: new mongoose.Types.ObjectId(userId),
                        name: fileName || "Untitled Resume",
                        id: guid(FILE_GUID_LEN),
                        header: new HeaderModel({
                            id: guid(),
                        }),
                    });

                    await doc
                        .save()
                        .then(() =>
                            res.status(200).json({
                                data: {
                                    id: doc.id,
                                },
                            })
                        )
                        .catch((err) => {
                            console.error(err);
                            return res.status(404).json({
                                error: {
                                    code: 404,
                                    message: "Failed to create file.",
                                },
                            });
                        });
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
        res.status(500).json({
            error: { code: 500, message: "Failed to create file." },
        });
    }
};

export default handler;
