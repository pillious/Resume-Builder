import { NextApiRequest, NextApiResponse } from "next";
import { AnyBulkWriteOperation } from "mongodb";
import dbConnect from "../../utils/database";
import {
    ResponseSuccess,
    ResponseError,
    IFile,
    guid,
    ModState,
} from "../../custom2.d";
import FileModel from "../../models/FileModel.model";
import SectionModel from "../../models/SectionModel.model";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseSuccess | ResponseError>
) => {
    try {
        switch (req.method) {
            case "POST": {
                const {
                    resume,
                    modList,
                }: { resume: IFile | null; modList: Record<string, ModState> } =
                    JSON.parse(req.body);

                const modListCopy: Record<guid, ModState> = {};

                // Extracts all the changed sections from modList.
                // (a section is also considered updated if an item associated with that section is added/updated/deleted.)
                for (const k in modList) {
                    if (k.includes(".")) {
                        // if key is an item
                        const sectionId = k.split(".")[0];
                        if (modListCopy[sectionId] === undefined)
                            modListCopy[sectionId] = ModState.Update;
                    } else {
                        // sections take precedence over items.
                        modListCopy[k] = modList[k];
                    }
                }

                console.log("------");
                console.log(modList, modListCopy);

                const operations: AnyBulkWriteOperation<Document>[] = [];

                // Operations for Delete sections.
                for (const k in modListCopy) {
                    if (
                        !k.includes(".") &&
                        modListCopy[k] === ModState.Delete
                    ) {
                        operations.push({
                            updateOne: {
                                filter: { id: resume.id },
                                update: {
                                    $pull: {
                                        sections: { id: k },
                                    },
                                },
                            },
                        });
                    }
                }

                // Operations for Add/Update sections.
                if (Object.keys(modListCopy).length !== 0) {
                    // Header
                    if (
                        resume &&
                        Object.keys(modListCopy).findIndex((k) =>
                            k.includes(resume.header.id)
                        ) !== -1
                    ) {
                        operations.push({
                            updateOne: {
                                filter: {
                                    id: resume.id,
                                },
                                update: {
                                    header: resume.header,
                                },
                            },
                        });
                    }

                    // Sections
                    resume?.sections.forEach((s) => {
                        if (Object.keys(modListCopy).includes(s.id)) {
                            switch (modListCopy[s.id]) {
                                case ModState.Add: {
                                    const doc = new SectionModel(s);

                                    operations.push({
                                        updateOne: {
                                            filter: { id: resume.id },
                                            update: {
                                                $push: { sections: doc },
                                            },
                                        },
                                    });

                                    delete modListCopy[s.id];
                                    break;
                                }
                                case ModState.Update: {
                                    operations.push({
                                        updateOne: {
                                            filter: {
                                                id: resume.id,
                                                "sections.id": s.id,
                                            },
                                            update: {
                                                "sections.$": s,
                                            },
                                        },
                                    });

                                    delete modListCopy[s.id];
                                    break;
                                }
                            }
                        }
                    });
                }

                try {
                    await dbConnect();
                    if (operations.length > 0)
                        await FileModel.bulkWrite(operations);
                    res.send({ data: {} });
                } catch (err) {
                    console.log(err);
                    throw new Error("Bulk write operation failed.");
                }
                break;
            }
            default:
                throw new Error(`${req.method} is not allowed.`);
        }
    } catch (ex) {
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
