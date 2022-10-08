import {
    RefObject,
    useCallback,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";
import { guid, ModState } from "../custom2.d";
import resumeReducer from "../store/ResumeReducer";
import nanoid from "../utils/guid";
import AppContext from "../store/AppContext";
import useResumeById from "./data/use-resume-by-id";
import fetcher from "../utils/fetcher";

const useResumeState = (sectionRef: RefObject<HTMLBaseElement>) => {
    const {
        activeResumeId: ctxActiveResumeId,
        updateActiveResumeObj: ctxUpdateActiveResumeObj,
    } = useContext(AppContext);
    const { data } = useResumeById(ctxActiveResumeId);

    const [resume, dispatch] = useReducer(resumeReducer, data);

    // Contains the ids of the parts of the resume that was changed.
    // key = id, value = a modstate. (an item is signified as sectionidd.itemid)
    const [modList, setModList] = useState<Record<guid, ModState>>({});
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        dispatch({ type: "setResume", payload: data }); // payload can be null.
        ctxUpdateActiveResumeObj(data);
        setModList({});
        setHasUnsavedChanges(false);
    }, [data, ctxUpdateActiveResumeObj]);

    // Save Resume
    const saveChanges = useCallback(() => {
        if (hasUnsavedChanges) {
            fetcher("/api/updateResume", "", {
                method: "POST",
                body: JSON.stringify({ resume, modList }),
            });
            setHasUnsavedChanges(false);
            setModList({});
        }
    }, [hasUnsavedChanges, resume, modList]);

    // override ctrl+s shortcut to save resume
    useEffect(() => {
        let identifier: NodeJS.Timeout;
        const handleSave = (event: KeyboardEvent) => {
            if (ctxActiveResumeId && event.ctrlKey && event.key === "s") {
                event.preventDefault();

                if (hasUnsavedChanges) {
                    console.log("save begin");

                    identifier = setTimeout(() => {
                        saveChanges();
                        console.log("save end");
                    }, 275);
                } else {
                    console.log("No new changes to save.");
                }
            }
        };

        const target = sectionRef?.current;
        target?.addEventListener("keydown", handleSave);

        return () => {
            target?.removeEventListener("keydown", handleSave);
            clearTimeout(identifier);
        };
    }, [ctxActiveResumeId, hasUnsavedChanges, sectionRef, saveChanges]);

    /**
     * REDUCER ACTIONS
     */
    const addHeaderInfo = () => {
        const id = nanoid();
        dispatch({
            type: "addHeaderInfo",
            payload: { itemId: id, content: "" },
        });
        if (resume) {
            setModList((prevState) => ({
                ...prevState,
                [`${resume.header.id}.${id}`]: ModState.Add,
            }));
            setHasUnsavedChanges(true);
        }
    };

    const addSection = () => {
        const id = nanoid();
        dispatch({
            type: "addSection",
            payload: { sectionId: id, name: "New Section" },
        });

        setModList((prevState) => ({ ...prevState, [id]: ModState.Add }));
        setHasUnsavedChanges(true);
    };

    const addItem = (sectionId: guid) => {
        const id = nanoid();
        dispatch({
            type: "addItem",
            payload: { sectionId, itemId: id, content: "" },
        });
        setModList((prevState) => ({
            ...prevState,
            [`${sectionId}.${id}`]: ModState.Add,
        }));
        setHasUnsavedChanges(true);
    };

    const updateHeaderName = (name: string) => {
        if (name !== resume?.header.name) {
            dispatch({ type: "updateHeaderName", payload: { name } });
            if (resume) {
                setModList((prevState) => {
                    if (!(resume.header.id in prevState))
                        return {
                            ...prevState,
                            [resume.header.id]: ModState.Update,
                        };
                    return prevState;
                });
            }
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
            if (resume) {
                setModList((prevState) => ({
                    ...prevState,
                    [`${resume.header.id}.${itemId}`]: ModState.Update,
                }));
                setHasUnsavedChanges(true);
            }
        }
    };

    const updateSectionName = (sectionId: guid, name: string) => {
        if (name !== resume?.sections.find((s) => s.id === sectionId)?.name) {
            dispatch({
                type: "updateSectionName",
                payload: { sectionId, name },
            });
            setModList((prevState) => {
                if (
                    sectionId in prevState &&
                    prevState[sectionId] === ModState.Add
                ) {
                    return prevState;
                }
                return { ...prevState, [sectionId]: ModState.Update };
            });
            setHasUnsavedChanges(true);
        }
    };

    const updateItemContent = (
        sectionId: guid,
        itemId: guid,
        content: string
    ) => {
        if (
            content !==
            resume?.sections
                .find((s) => s.id === sectionId)
                ?.items.find((i) => i.id === itemId)?.content
        ) {
            dispatch({
                type: "updateItemContent",
                payload: { sectionId, itemId, content },
            });
            const key = `${sectionId}.${itemId}`;
            setModList((prevState) => {
                // if the item was just added, don't change the mod state to "Update".
                if (key in prevState && prevState[key] === ModState.Add) {
                    return prevState;
                }
                return { ...prevState, [key]: ModState.Update };
            });
            setHasUnsavedChanges(true);
        }
    };

    const deleteHeaderInfo = (itemId: guid) => {
        dispatch({ type: "deleteHeaderInfo", payload: itemId });
        if (resume) {
            setModList((prevState) => ({
                ...prevState,
                [`${resume.header.id}.${itemId}`]: ModState.Delete,
            }));
            setHasUnsavedChanges(true);
        }
    };

    const deleteSection = (sectionId: guid) => {
        dispatch({ type: "deleteSection", payload: sectionId });
        // if the section was just added, just remove the section from the modList.
        setModList((prevState) => {
            if (
                sectionId in prevState &&
                prevState[sectionId] === ModState.Add
            ) {
                const state = { ...prevState };
                delete state[sectionId];
                return state;
            }
            return { ...prevState, [sectionId]: ModState.Delete };
        });

        setHasUnsavedChanges(true);
    };

    const deleteItem = (sectionId: guid, itemId: guid) => {
        dispatch({ type: "deleteItem", payload: { sectionId, itemId } });
        const key = `${sectionId}.${itemId}`;
        setModList((prevState) => {
            if (key in prevState && prevState[key] === ModState.Add) {
                const state = { ...prevState };
                delete state[key];
                return state;
            }
            return { ...prevState, [key]: ModState.Delete };
        });
        setHasUnsavedChanges(true);
    };

    return {
        resume,
        saveChanges,
        addHeaderInfo,
        addSection,
        addItem,
        updateHeaderName,
        updateHeaderInfo,
        updateSectionName,
        updateItemContent,
        deleteHeaderInfo,
        deleteSection,
        deleteItem,
    };
};

export default useResumeState;
