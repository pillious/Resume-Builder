import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import dbConnect from "../../utils/database";
import UserModel from "../../models/UserModel.model";
import { ApiResponse, IUser } from "../../types";

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
                    const { email, userId } = req.query;

                    if (
                        email !== "undefined" &&
                        email !== "null" &&
                        userId !== "undefined" &&
                        userId !== "null"
                    ) {
                        await dbConnect();
                        const doc: IUser | null = await UserModel.findOne({
                            email,
                        });

                        doc
                            ? res.status(200).json({ data: { user: doc } })
                            : res.status(200).json({ data: { user: {} } });
                    } else res.status(200).json({ data: { user: {} } });
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
