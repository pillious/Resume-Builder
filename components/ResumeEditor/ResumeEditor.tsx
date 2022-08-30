// import React, { useContext, useReducer, useRef, useState, useEffect } from "react";
import { useRef } from "react";
// import { cloneDeep } from "lodash";
// import { IFile } from "../../custom2";
// import useResumeById from "../../hooks/data/use-resume-by-id";
// import AppContext from "../../store/AppContext";
// import fetcher from "../../utils/fetcher";
// import nanoid from "../../utils/guid";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";
import Toolbox from "./Toolbox";
// import resumeReducer from "../../store/ResumeReducer";
import useResumeState from "../../hooks/use-resume-state";

// enum ModState {
//     Add = 0,
//     Update = 1,
//     Delete = 2,
// }

const ResumeEditor: React.FC = () => {
    const sectionRef = useRef<HTMLBaseElement>(null);

    const {
        resume,
        addSection,
        addItem,
        updateItemContent,
        deleteSection,
        deleteItem,
    } = useResumeState(sectionRef);

    // const ctx = useContext(AppContext);
    // const { data } = useResumeById(ctx.activeResumeId);

    // const [resume, dispatch] = useReducer(resumeReducer, data);
    // const [prevResume, setPrevResume] = useState<IFile | null>(
    //     cloneDeep(resume)
    // );

    // const [modList, setModList] = useState<Record<string, ModState>>({});
    // const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // const addSection = () => {
    //     const id = nanoid();
    //     dispatch({
    //         type: "addSection",
    //         payload: { sectionId: id, name: "New Section" },
    //     });
    //     setModList((prevState) => ({ ...prevState, [id]: ModState.Add }));
    //     setHasUnsavedChanges(true);
    // };

    // const addItem = (sectionId: string) => {
    //     const id = nanoid();
    //     dispatch({
    //         type: "addItem",
    //         payload: { sectionId, itemId: id, content: "" },
    //     });
    //     setModList((prevState) => ({ ...prevState, [id]: ModState.Add }));
    //     setHasUnsavedChanges(true);
    // };

    // const updateItemContent = (
    //     sectionId: string,
    //     itemId: string,
    //     content: string
    // ) => {
    //     dispatch({
    //         type: "updateItemContent",
    //         payload: { sectionId, itemId, content },
    //     });
    //     setModList((prevState) => {
    //         // if the item was just added, don't change the modification state to "Update".
    //         if (itemId in prevState && prevState[itemId] !== ModState.Add)
    //             return { ...prevState, [itemId]: ModState.Update };
    //         return prevState;
    //     });
    //     setHasUnsavedChanges(true);
    // };

    // const deleteSection = (sectionId: string) => {
    //     dispatch({ type: "deleteSection", payload: sectionId });
    //     // if the section was just added, just remove the section from the modList.
    //     setModList((prevState) => {
    //         if (
    //             sectionId in prevState &&
    //             prevState[sectionId] === ModState.Add
    //         ) {
    //             const state = { ...prevState };
    //             delete state[sectionId];
    //             return state;
    //         }
    //         return { ...prevState, [sectionId]: ModState.Delete };
    //     });

    //     setHasUnsavedChanges(true);
    // };

    // const deleteItem = (sectionId: string, itemId: string) => {
    //     dispatch({ type: "deleteItem", payload: { sectionId, itemId } });
    //     setHasUnsavedChanges(true);
    // };

    // useEffect(() => {
    //     if (data != null) {
    //         dispatch({ type: "setResume", payload: data });
    //         setPrevResume(data);
    //     }
    // }, [data]);

    // useEffect(() => {
    //     let identifier: NodeJS.Timeout;

    //     // override ctrl+s shortcut
    //     const handleSave = (event: KeyboardEvent) => {
    //         if (
    //             ctx.activeResumeId &&
    //             event.ctrlKey &&
    //             event.key === "s" &&
    //             resume
    //         ) {
    //             event.preventDefault();

    //             if (hasUnsavedChanges) {
    //                 console.log(prevResume);
    //                 console.log(resume);

    //                 identifier = setTimeout(async () => {
    //                     fetcher("/api/updateResume", "", {
    //                         method: "POST",
    //                         body: JSON.stringify({ resume, prevResume }),
    //                     });
    //                     setHasUnsavedChanges(false);
    //                     setPrevResume(cloneDeep(resume));
    //                 }, 250);

    //                 // TODO: redo update reusme -> details are below.
    //                 // // set timeout to wait for any last second user inputs to be sent to reducer.
    //                 // identifier = setTimeout(() => {
    //                 //     // const cleansed = cleanseResume(resume);
    //                 //     fetcher("/api/updateResume", "", {
    //                 //         method: "POST",

    //                 //         // an example of a single update
    //                 //         // TODO: pass an array of updates.
    //                 //         body: JSON.stringify({
    //                 //             type: "item",
    //                 //             fileId: "f34B43",
    //                 //             sectionId: "bj7SfB",
    //                 //             itemIdx: 2,
    //                 //             content: "new string",
    //                 //         }),
    //                 //     });
    //                 //     setHasUnsavedChanges(false);
    //                 // }, 250);
    //             } else {
    //                 console.log("No new changes to save.");
    //             }
    //         }
    //     };

    //     const target = sectionRef?.current;
    //     target?.addEventListener("keydown", handleSave);

    //     return () => {
    //         target?.removeEventListener("keydown", handleSave);
    //         clearTimeout(identifier);
    //     };
    // }, [ctx.activeResumeId, resume, prevResume, hasUnsavedChanges]);

    return (
        <section className={classes.section} tabIndex={-1} ref={sectionRef}>
            {/* {ctx.activeResumeId && ( */}
            {resume && (
                <>
                    <Toolbox />
                    {resume?.sections.map((section, idx) => (
                        <Section
                            key={`${section.id}-${idx}`}
                            id={section.id}
                            title={section.name}
                            items={section.items || []}
                            addItem={addItem}
                            updateItemContent={updateItemContent}
                            deleteItem={deleteItem}
                            deleteSection={deleteSection}
                        />
                    ))}
                    <AddSection addSection={addSection} />
                </>
            )}
        </section>
    );
};

export default ResumeEditor;
