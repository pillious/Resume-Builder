import { NextApiRequest, NextApiResponse } from "next";
import { AnyBulkWriteOperation } from "mongodb";
import dbConnect from "../../utils/database";
import {
    ResponseSuccess,
    ResponseError,
    IFile,
    ModState,
    ModList,
} from "../../custom2.d";
import FileModel from "../../models/FileModel.model";
import SectionModel from "../../models/SectionModel.model";
import ExperienceModel from "../../models/ExperienceModel.model";

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
                }: { resume: IFile | null; modList: ModList } = JSON.parse(
                    req.body
                );

                const operations: AnyBulkWriteOperation<Document>[] = [];

                const modListCopy: ModList = JSON.parse(
                    JSON.stringify(modList)
                );

                if (resume) {
                    // Build operations for header
                    for (const k in modListCopy.header) {
                        if (modListCopy.header[k] === ModState.Update) {
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
                        } else {
                            console.error(
                                "Save Header: illegal modification (add/delete) "
                            );
                        }
                    }

                    // Build operations for sections
                    for (const k in modListCopy.sections) {
                        // Remove redundent experiences operations
                        if (k in modListCopy.experiences)
                            delete modListCopy.experiences[k];

                        switch (modListCopy.sections[k]) {
                            case ModState.Add: {
                                const section = resume.sections.find(
                                    (s) => s.id === k
                                );

                                if (!section) break;

                                operations.push({
                                    updateOne: {
                                        filter: { id: resume.id },
                                        update: {
                                            $push: {
                                                sections: new SectionModel(
                                                    section
                                                ),
                                            },
                                        },
                                    },
                                });
                                break;
                            }
                            case ModState.Update: {
                                const section = resume.sections.find(
                                    (s) => s.id === k
                                );

                                if (!section) break;

                                operations.push({
                                    updateOne: {
                                        filter: {
                                            id: resume.id,
                                            "sections.id": section.id,
                                        },
                                        update: {
                                            "sections.$": section,
                                        },
                                    },
                                });
                                break;
                            }
                            case ModState.Delete: {
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
                                break;
                            }
                        }
                    }

                    // Build operations for experiences
                    for (const secId in modListCopy.experiences) {
                        for (const expId in modListCopy.experiences[secId]) {
                            switch (modListCopy.experiences[secId][expId]) {
                                case ModState.Add: {
                                    const experience = resume.sections
                                        .find((s) => s.id === secId)
                                        ?.items.find((e) => e.id === expId);

                                    if (!experience) continue;

                                    operations.push({
                                        updateOne: {
                                            filter: {
                                                id: resume.id,
                                                "sections.id": secId,
                                            },
                                            update: {
                                                $push: {
                                                    "sections.$.items":
                                                        new ExperienceModel(
                                                            experience
                                                        ),
                                                },
                                            },
                                        },
                                    });

                                    break;
                                }
                                case ModState.Update: {
                                    const experience = resume.sections
                                        .find((s) => s.id === secId)
                                        ?.items.find((e) => e.id === expId);

                                    if (!experience) continue;

                                    operations.push({
                                        updateOne: {
                                            filter: {
                                                id: resume.id,
                                            },
                                            update: {
                                                $set: {
                                                    "sections.$[section].items.$[experience]":
                                                        new ExperienceModel(
                                                            experience
                                                        ),
                                                },
                                            },
                                            arrayFilters: [
                                                { "section.id": secId },
                                                { "experience.id": expId },
                                            ],
                                        },
                                    });

                                    break;
                                }
                                case ModState.Delete: {
                                    operations.push({
                                        updateOne: {
                                            filter: {
                                                id: resume.id,
                                                "sections.id": secId,
                                            },
                                            update: {
                                                $pull: {
                                                    "sections.$.items": {
                                                        id: expId,
                                                    },
                                                },
                                            },
                                        },
                                    });
                                    break;
                                }
                            }
                        }
                    }
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
        console.log(ex);
        res.status(500).json({ error: { code: 500, message: ex } });
    }
};

export default handler;
