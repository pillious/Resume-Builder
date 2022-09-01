import { RefObject, useContext, useEffect, useReducer, useState } from "react";
import { cloneDeep } from "lodash";
import { IFile, guid, ModState } from "../custom2.d";
import resumeReducer from "../store/ResumeReducer";
import nanoid from "../utils/guid";
import AppContext from "../store/AppContext";
import useResumeById from "./data/use-resume-by-id";
import fetcher from "../utils/fetcher";

const useResumeState = (sectionRef: RefObject<HTMLBaseElement>) => {
    const ctx = useContext(AppContext);
    const { data } = useResumeById(ctx.activeResumeId);

    const [resume, dispatch] = useReducer(resumeReducer, data);
    const [prevResume, setPrevResume] = useState<IFile | null>(
        cloneDeep(resume)
    );

    // Contains the ids of the parts of the resume that was changed.
    // key = id, value = a modstate. (an item is signified as sectionidd.itemid)
    const [modList, setModList] = useState<Record<guid, ModState>>({});
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        if (data != null) {
            dispatch({ type: "setResume", payload: data });
            setPrevResume(data);
        }
    }, [data]);

    // Save Resume (override ctrl+s shortcut)
    useEffect(() => {
        let identifier: NodeJS.Timeout;
        const handleSave = (event: KeyboardEvent) => {
            if (
                ctx.activeResumeId &&
                event.ctrlKey &&
                event.key === "s" &&
                resume
            ) {
                event.preventDefault();

                if (hasUnsavedChanges) {
                    console.log(resume);
                    console.log(modList);

                    identifier = setTimeout(async () => {
                        fetcher("/api/updateResume", "", {
                            method: "POST",
                            body: JSON.stringify({ resume, modList }),
                        });
                        setHasUnsavedChanges(false);
                        setModList({});
                        setPrevResume(cloneDeep(resume));
                    }, 250);

                    // TODO: redo update resume -> details are below.
                    // // set timeout to wait for any last second user inputs to be sent to reducer.
                    // identifier = setTimeout(() => {
                    //     // const cleansed = cleanseResume(resume);
                    //     fetcher("/api/updateResume", "", {
                    //         method: "POST",

                    //         // an example of a single update
                    //         // TODO: pass an array of updates.
                    //         body: JSON.stringify({
                    //             type: "item",
                    //             fileId: "f34B43",
                    //             sectionId: "bj7SfB",
                    //             itemIdx: 2,
                    //             content: "new string",
                    //         }),
                    //     });
                    //     setHasUnsavedChanges(false);
                    // }, 250);
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
    }, [
        ctx.activeResumeId,
        resume,
        prevResume,
        hasUnsavedChanges,
        modList,
        sectionRef,
    ]);

    /**
     * ACTIONS
     */
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

    const updateItemContent = (
        sectionId: guid,
        itemId: guid,
        content: string
    ) => {
        dispatch({
            type: "updateItemContent",
            payload: { sectionId, itemId, content },
        });
        const key = `${sectionId}.${itemId}`;
        setModList((prevState) => {
            // if the item was just added, don't change the mod state to "Update".
            if (key in prevState && prevState[key] !== ModState.Add)
                return { ...prevState, [key]: ModState.Update };
            return prevState;
        });
        setHasUnsavedChanges(true);
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
        addSection,
        addItem,
        updateItemContent,
        deleteSection,
        deleteItem,
    };
};

export default useResumeState;
