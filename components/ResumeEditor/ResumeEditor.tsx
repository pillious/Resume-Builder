import React, { useContext, useReducer, useRef, useState } from "react";
import { useEffect } from "react";
import { IFile, ISection } from "../../custom2";
import useResumeById from "../../hooks/use-resume-by-id";
import AppContext from "../../store/AppContext";
import fetcher from "../../utils/fetcher";
import nanoid from "../../utils/guid";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";
import Toolbox from "./Toolbox";

type ACTIONTYPE =
    | { type: "setResume"; payload: IFile }
    | { type: "addSection" }
    | { type: "addItem"; payload: string }
    | { type: "deleteSection"; payload: string }
    | { type: "deleteItem"; payload: { sectionId: string; itemIdx: number } };

const resumeReducer = (
    state: IFile | null,
    action: ACTIONTYPE
): IFile | null => {
    // "setResume" can still occur even if previous state is null.
    if (action.type === "setResume") {
        return action.payload;
    } else if (state != null) {
        switch (action.type) {
            case "addSection": {
                const newSection: ISection = {
                    name: "New Section",
                    id: nanoid(),
                    items: [],
                };
                return { ...state, sections: [...state.sections, newSection] };
            }
            case "addItem": {
                const idx = state.sections.findIndex(
                    (section) => section.id === action.payload
                );
                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                sections[idx].items.push("");
                return { ...state, sections };
            }
            case "deleteSection": {
                const idx = state.sections.findIndex(
                    (s) => s.id === action.payload
                );

                if (idx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                sections.splice(idx, 1);

                return { ...state, sections };
            }
            case "deleteItem": {
                const idx = state.sections.findIndex(
                    (section) => section.id === action.payload.sectionId
                );

                if (idx === -1) return state;

                const sections: ISection[] = JSON.parse(
                    JSON.stringify(state.sections)
                );
                sections[idx].items.splice(action.payload.itemIdx, 1);

                return { ...state, sections };
            }
        }
    }

    return state;
};

// TODO: filter out empty section names
const cleanseResume = (resume: IFile) => {
    resume.sections.forEach(
        (section) =>
            (section.items = section.items.filter((item) => item.trim() !== ""))
    );
    return resume;
};

const ResumeEditor: React.FC = () => {
    const ctx = useContext(AppContext);
    const { data } = useResumeById(ctx.activeResumeId);

    const [resume, dispatch] = useReducer(resumeReducer, data);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    const sectionRef = useRef<HTMLBaseElement>(null);

    const addSection = () => {
        dispatch({ type: "addSection" });
        setHasUnsavedChanges(true);
    };

    const addItem = (sectionId: string) => {
        dispatch({ type: "addItem", payload: sectionId });
        setHasUnsavedChanges(true);
    };

    const deleteSection = (sectionId: string) => {
        dispatch({ type: "deleteSection", payload: sectionId });
        setHasUnsavedChanges(true);
    };

    const deleteItem = (sectionId: string, itemIdx: number) => {
        dispatch({ type: "deleteItem", payload: { sectionId, itemIdx } });
        setHasUnsavedChanges(true);
    };

    useEffect(() => {
        if (data != null) dispatch({ type: "setResume", payload: data });
    }, [data]);

    useEffect(() => {
        let identifier: NodeJS.Timeout;

        // override ctrl+s shortcut
        const handleSave = (event: KeyboardEvent) => {
            if (
                ctx.activeResumeId &&
                event.ctrlKey &&
                event.key === "s" &&
                resume
            ) {
                event.preventDefault();

                if (hasUnsavedChanges) {
                    // set timeout to wait for any last second user inputs to be sent to reducer.
                    identifier = setTimeout(() => {
                        const cleansed = cleanseResume(resume);
                        fetcher("/api/updateResume", "", {
                            method: "POST",

                            // EX: of 1 update
                            // TODO: pass an array of updates.
                            body: JSON.stringify({
                                type: "item",
                                fileId: "f34B43",
                                sectionId: "bj7SfB",
                                itemIdx: 2,
                                content: "new string",
                            }),
                        });
                        setHasUnsavedChanges(false);
                    }, 250);
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
    }, [ctx.activeResumeId, resume]);

    return (
        <section className={classes.section} tabIndex={-1} ref={sectionRef}>
            {ctx.activeResumeId && (
                <>
                    <Toolbox />
                    {resume?.sections.map((section, idx) => (
                        <Section
                            key={`${section.id}-${idx}`}
                            id={section.id}
                            title={section.name}
                            items={section.items || []}
                            addItem={addItem}
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
