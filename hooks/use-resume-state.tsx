import {
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState
} from "react";
import { useSWRConfig } from "swr";
import { ModState } from "../enums";
import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";
import resumeReducer from "../store/ResumeReducer";
import { guid, ModList } from "../types";
import { debounceDelay } from '../utils/constants';
import fetcher from "../utils/fetcher";
import nanoid from "../utils/guid";
import useResumeById from "./data/use-resume-by-id";

const resetModList = (): ModList => ({
    header: {},
    sections: {},
    experiences: {},
});

const useResumeState = (sectionRef: RefObject<HTMLBaseElement>) => {
    const { mutate } = useSWRConfig();

    const { activeResumeId, updateActiveResumeObj, updateHasUnsavedChanges } =
        useContext(AppContext);
    const { userId } = useContext(AuthContext);

    const { data } = useResumeById(activeResumeId, userId);

    const [resume, dispatch] = useReducer(resumeReducer, data);

    // maintains all the changes (creation/deletion/updates) to the resume.
    const [modList, setModList] = useState<ModList>(resetModList());
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        dispatch({ type: "setResume", payload: data }); // payload can be null.
        updateActiveResumeObj(data);
        setModList(resetModList());
        setHasUnsavedChanges(false);
    }, [data, updateActiveResumeObj]);

    useEffect(() => {
        updateHasUnsavedChanges(hasUnsavedChanges);
    }, [hasUnsavedChanges, updateHasUnsavedChanges]);

    // Save Resume
    const saveChanges = useCallback(() => {
        if (
            hasUnsavedChanges &&
            userId !== null &&
            (Object.keys(modList.header).length !== 0 ||
                Object.keys(modList.sections).length !== 0 ||
                Object.keys(modList.experiences).length !== 0)
        ) {
            fetcher("/api/updateResume", {
                method: "POST",
                body: JSON.stringify({ resume, modList, userId }),
            }).then(() => {
                if (resume && "id" in resume)
                    mutate(
                        `/api/getResumeById?id=${resume.id}&userId=${userId}`
                    );
            });
            setHasUnsavedChanges(false);
            setModList(resetModList());
        }
    }, [hasUnsavedChanges, modList, mutate, resume, userId]);

    // override ctrl+s shortcut to save resume
    useEffect(() => {
        let identifier: NodeJS.Timeout;
        const handleSave = (event: KeyboardEvent) => {
            if (activeResumeId && event.ctrlKey && event.key === "s") {
                event.preventDefault();

                if (
                    hasUnsavedChanges &&
                    (Object.keys(modList.header).length !== 0 ||
                        Object.keys(modList.sections).length !== 0 ||
                        Object.keys(modList.experiences).length !== 0)
                ) {
                    identifier = setTimeout(() => {
                        saveChanges();
                    }, debounceDelay);
                }
            }
        };

        const target = sectionRef?.current;
        target?.addEventListener("keydown", handleSave);

        return () => {
            target?.removeEventListener("keydown", handleSave);
            clearTimeout(identifier);
        };
    }, [
        activeResumeId,
        hasUnsavedChanges,
        sectionRef,
        saveChanges,
        modList.header,
        modList.sections,
        modList.experiences,
    ]);

    /**
     * REDUCER ACTIONS
     */
    const addHeaderInfo = () => {
        const id = nanoid();
        dispatch({
            type: "addHeaderInfo",
            payload: { itemId: id, content: "" },
        });

        setModList((prev) => {
            if (resume?.header.id)
                return {
                    ...prev,
                    header: {
                        ...prev.header,
                        [resume.header.id]: ModState.Update,
                    },
                };
            return prev;
        });
        setHasUnsavedChanges(true);
    };

    const addSection = () => {
        const id = nanoid();
        dispatch({ type: "addSection", payload: { sectionId: id, name: "" } });

        setModList((prev) => ({
            ...prev,
            sections: { ...prev.sections, [id]: ModState.Add },
        }));
        setHasUnsavedChanges(true);
    };

    const addExperience = (sectionId: guid) => {
        const id = nanoid();
        dispatch({
            type: "addExperience",
            payload: { sectionId, experienceId: id, name: "" },
        });

        setModList((prev) => {
            if (sectionId in prev.experiences) {
                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: {
                            ...prev.experiences[sectionId],
                            [id]: ModState.Add,
                        },
                    },
                };
            }

            return {
                ...prev,
                experiences: {
                    ...prev.experiences,
                    [sectionId]: { [id]: ModState.Add },
                },
            };
        });
        setHasUnsavedChanges(true);
    };

    const addItem = (sectionId: guid, experienceId: guid) => {
        const id = nanoid();
        dispatch({
            type: "addItem",
            payload: { sectionId, experienceId, itemId: id, content: "" },
        });

        setModList((prev) => {
            if (sectionId in prev.experiences) {
                if (
                    experienceId in prev.experiences[sectionId] &&
                    prev.experiences[sectionId][experienceId] === ModState.Add
                )
                    return prev;

                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: {
                            ...prev.experiences[sectionId],
                            [experienceId]: ModState.Update,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: { [experienceId]: ModState.Update },
                    },
                };
            }
        });
        setHasUnsavedChanges(true);
    };

    const updateHeaderName = (name: string) => {
        if (name !== resume?.header.name) {
            dispatch({ type: "updateHeaderName", payload: { name } });

            setModList((prev) => {
                if (resume?.header.id)
                    return {
                        ...prev,
                        header: {
                            ...prev.header,
                            [resume.header.id]: ModState.Update,
                        },
                    };
                return prev;
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateHeaderInfo = (itemId: guid, content: string) => {
        if (
            content !==
            resume?.header.items.find((i) => i.id === itemId)?.content
        ) {
            dispatch({
                type: "updateHeaderInfo",
                payload: { itemId, content },
            });

            setModList((prev) => {
                if (resume?.header.id)
                    return {
                        ...prev,
                        header: {
                            ...prev.header,
                            [resume.header.id]: ModState.Update,
                        },
                    };
                return prev;
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateSectionName = (sectionId: guid, name: string) => {
        if (name !== resume?.sections.find((s) => s.id === sectionId)?.name) {
            dispatch({
                type: "updateSectionName",
                payload: { sectionId, name },
            });

            setModList((prev) => {
                if (
                    sectionId in prev.sections &&
                    prev.sections[sectionId] === ModState.Add
                )
                    return prev;

                return {
                    ...prev,
                    sections: {
                        ...prev.sections,
                        [sectionId]: ModState.Update,
                    },
                };
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateSectionOrder = (order: guid[]) => {
        dispatch({
            type: "updateSectionOrder",
            payload: { order },
        });

        setModList((prev) => {
            const newSections: Record<string, ModState> = {};

            for (const id of order) {
                if (id in prev.sections && prev.sections[id] === ModState.Add)
                    continue;

                newSections[id] = ModState.Update;
            }

            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    ...newSections,
                },
            };
        });
        setHasUnsavedChanges(true);
    };

    const updateExperienceName = (
        sectionId: guid,
        experienceId: guid,
        name: string
    ) => {
        if (
            name !==
            resume?.sections
                .find((s) => s.id === sectionId)
                ?.items.find((exp) => exp.id === experienceId)?.name
        ) {
            dispatch({
                type: "updateExperienceName",
                payload: { sectionId, experienceId, name },
            });

            setModList((prev) => {
                if (sectionId in prev.experiences) {
                    if (
                        experienceId in prev.experiences[sectionId] &&
                        prev.experiences[sectionId][experienceId] ===
                            ModState.Add
                    )
                        return prev;

                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: {
                                ...prev.experiences[sectionId],
                                [experienceId]: ModState.Update,
                            },
                        },
                    };
                } else {
                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: { [experienceId]: ModState.Update },
                        },
                    };
                }
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateExperienceDate = (
        sectionId: guid,
        experienceId: guid,
        isStartDate: boolean,
        date: string
    ) => {
        if (
            (isStartDate &&
                date !==
                    resume?.sections
                        .find((s) => s.id === sectionId)
                        ?.items.find((exp) => exp.id === experienceId)
                        ?.startDate) ||
            (!isStartDate &&
                date !==
                    resume?.sections
                        .find((s) => s.id === sectionId)
                        ?.items.find((exp) => exp.id === experienceId)?.endDate)
        ) {
            dispatch({
                type: "updateExperienceDate",
                payload: { sectionId, experienceId, isStartDate, date },
            });

            setModList((prev) => {
                if (sectionId in prev.experiences) {
                    if (
                        experienceId in prev.experiences[sectionId] &&
                        prev.experiences[sectionId][experienceId] ===
                            ModState.Add
                    )
                        return prev;

                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: {
                                ...prev.experiences[sectionId],
                                [experienceId]: ModState.Update,
                            },
                        },
                    };
                } else {
                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: { [experienceId]: ModState.Update },
                        },
                    };
                }
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateExperienceOrder = (sectionId: guid, order: guid[]) => {
        dispatch({
            type: "updateExperienceOrder",
            payload: { sectionId, order },
        });

        setModList((prev) => {
            if (
                sectionId in prev.sections &&
                prev.sections[sectionId] === ModState.Add
            )
                return prev;

            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [sectionId]: ModState.Update,
                },
            };
        });
        setHasUnsavedChanges(true);
    };

    const updateItemContent = (
        sectionId: guid,
        experienceId: guid,
        itemId: guid,
        content: string
    ) => {
        if (
            content !==
            resume?.sections
                .find((s) => s.id === sectionId)
                ?.items.find((exp) => exp.id === experienceId)
                ?.items.find((i) => i.id === itemId)?.content
        ) {
            dispatch({
                type: "updateItemContent",
                payload: { sectionId, experienceId, itemId, content },
            });

            setModList((prev) => {
                if (sectionId in prev.experiences) {
                    if (
                        experienceId in prev.experiences[sectionId] &&
                        prev.experiences[sectionId][experienceId] ===
                            ModState.Add
                    )
                        return prev;

                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: {
                                ...prev.experiences[sectionId],
                                [experienceId]: ModState.Update,
                            },
                        },
                    };
                } else {
                    return {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: { [experienceId]: ModState.Update },
                        },
                    };
                }
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateItemOrder = (
        sectionId: guid,
        experienceId: guid,
        order: guid[]
    ) => {
        dispatch({
            type: "updateItemOrder",
            payload: { sectionId, experienceId, order },
        });

        setModList((prev) => {
            if (sectionId in prev.experiences) {
                if (
                    experienceId in prev.experiences[sectionId] &&
                    prev.experiences[sectionId][experienceId] === ModState.Add
                )
                    return prev;

                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: {
                            ...prev.experiences[sectionId],
                            [experienceId]: ModState.Update,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: { [experienceId]: ModState.Update },
                    },
                };
            }
        });
        setHasUnsavedChanges(true);
    };

    const deleteHeaderInfo = (itemId: guid) => {
        dispatch({ type: "deleteHeaderInfo", payload: itemId });

        setModList((prev) => {
            if (resume?.header.id)
                return {
                    ...prev,
                    header: {
                        ...prev.header,
                        [resume.header.id]: ModState.Update,
                    },
                };
            return prev;
        });
        setHasUnsavedChanges(true);
    };

    const deleteSection = (sectionId: guid) => {
        dispatch({ type: "deleteSection", payload: sectionId });

        setModList((prev) => {
            if (
                sectionId in modList.sections &&
                modList.sections[sectionId] === ModState.Add
            ) {
                const copy = { ...prev, sections: { ...prev.sections } };
                delete copy.sections[sectionId];
                return copy;
            }

            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [sectionId]: ModState.Delete,
                },
            };
        });
        setHasUnsavedChanges(true);
    };

    const deleteExperience = (sectionId: guid, experienceId: guid) => {
        dispatch({
            type: "deleteExperience",
            payload: { sectionId, experienceId },
        });

        setModList((prev) => {
            if (sectionId in prev.experiences) {
                if (
                    experienceId in prev.experiences[sectionId] &&
                    prev.experiences[sectionId][experienceId] === ModState.Add
                ) {
                    const copy = {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: { ...prev.experiences[sectionId] },
                        },
                    };
                    delete copy.experiences[sectionId][experienceId];
                    if (Object.keys(copy.experiences[sectionId]).length === 0)
                        delete copy.experiences[sectionId];
                    return copy;
                }

                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: {
                            ...prev.experiences[sectionId],
                            [experienceId]: ModState.Delete,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: { [experienceId]: ModState.Delete },
                    },
                };
            }
        });
        setHasUnsavedChanges(true);
    };

    const deleteItem = (sectionId: guid, experienceId: guid, itemId: guid) => {
        dispatch({
            type: "deleteItem",
            payload: { sectionId, experienceId, itemId },
        });

        setModList((prev) => {
            if (sectionId in prev.experiences) {
                if (
                    experienceId in prev.experiences[sectionId] &&
                    prev.experiences[sectionId][experienceId] === ModState.Add
                ) {
                    const copy = {
                        ...prev,
                        experiences: {
                            ...prev.experiences,
                            [sectionId]: { ...prev.experiences[sectionId] },
                        },
                    };
                    delete copy.experiences[sectionId][experienceId];
                    return copy;
                }

                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: {
                            ...prev.experiences[sectionId],
                            [experienceId]: ModState.Delete,
                        },
                    },
                };
            } else {
                return {
                    ...prev,
                    experiences: {
                        ...prev.experiences,
                        [sectionId]: { [experienceId]: ModState.Delete },
                    },
                };
            }
        });
        setHasUnsavedChanges(true);
    };

    return {
        resume,
        hasUnsavedChanges,
        saveChanges,
        addHeaderInfo,
        addExperience,
        addSection,
        addItem,
        updateHeaderName,
        updateHeaderInfo,
        updateSectionName,
        updateSectionOrder,
        updateExperienceName,
        updateExperienceDate,
        updateExperienceOrder,
        updateItemContent,
        updateItemOrder,
        deleteHeaderInfo,
        deleteSection,
        deleteExperience,
        deleteItem,
    };
};

export default useResumeState;
