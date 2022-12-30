import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import guid from "../../utils/guid";
import { ApiResponse, IFile } from "../../custom2.d";
import HeaderModel from "../../models/HeaderModel.model";
import { HydratedDocument } from "mongoose";

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
                    const fileName = req.query.fileName;
                    const doc: HydratedDocument<IFile> = new FileModel({
                        userId: `TEMP-${guid()}`,
                        name: fileName || `File-${guid()}`,
                        id: guid(),
                        header: new HeaderModel({
                            id: guid(),
                        }),
                    });

                    await doc.save()
                        .then(() =>
                            res.status(200).json({
                                data: {
                                    message: "Successfully created file.",
                                },
                            })
                        )
                        .catch((err) => {
                            console.log(err);
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
