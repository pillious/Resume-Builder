import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import dbConnect from "../../utils/database";
import UserModel from "../../models/UserModel.model";
import { ResponseSuccess, ResponseError } from "../../custom2.d";
import { authOptions } from "./auth/[...nextauth]";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "GET": {
                const session = await unstable_getServerSession(
                    req,
                    res,
                    authOptions
                );

                console.log(session);

                if (session) {
                    const email = req.query.email;
                    await dbConnect();
                    const doc = await UserModel.find({ email });
                    res.status(200).json({ data: { files: doc } });
                } else {
                    res.status(401).json({
                        error: { code: 401, message: "Unauthorized" },
                    });
                }

                break;
            }
            default:
                throw new Error(`${req.method} is not allowed.`);
        }
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
