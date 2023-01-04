import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { ApiResponse } from "../../custom2.d";

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
                    const { fileId, fileName, userId } = JSON.parse(req.body);

                    if (
                        fileId === undefined ||
                        fileId === null ||
                        fileName === undefined ||
                        fileName === null ||
                        userId === undefined ||
                        userId === null
                    ) {
                        res.status(400).json({
                            error: { code: 400, message: "Invalid Parameters" },
                        });
                    }

                    await dbConnect();

                    const resp = await FileModel.updateOne(
                        { id: fileId },
                        { name: fileName }
                    );
                    if (resp.matchedCount > 0)
                        res.status(200).json({
                            data: {
                                message: "Successfully updated file name.",
                            },
                        });
                    else
                        res.status(404).json({
                            data: {
                                message: "Failed to update file name.",
                            },
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
        console.error(ex);
        res.status(500).json({
            error: { code: 500, message: "Internal Server Error" },
        });
    }
};

export default handler;
