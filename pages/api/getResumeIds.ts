import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import FileModel from "../../models/FileModel.model";
import dbConnect from "../../utils/database";
import { ApiResponse, guid } from "../../custom2.d";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse>
) => {
    try {
        switch (req.method) {
            case "GET": {
                const session = await unstable_getServerSession(
                    req,
                    res,
                    authOptions
                );

                if (session) {
                    const { userId } = req.query;

                    if (userId !== "undefined" && userId !== "null") {
                        await dbConnect();
                        const docs: { name: string; id: guid }[] =
                            await FileModel.find({ userId }).select(
                                "name id -_id"
                            );
                        res.status(200).json({
                            data: { fileIdentifiers: docs },
                        });
                    } else {
                        res.status(200).json({
                            data: { fileIdentifiers: [] },
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
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        console.error(ex);
        res.status(500).json({
            error: { code: 500, message: "Internal Server Error" },
        });
    }
};

export default handler;
