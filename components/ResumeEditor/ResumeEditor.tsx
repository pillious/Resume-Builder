import React, { useContext, useReducer, useRef } from "react";
import { useEffect } from "react";
import { IFile, ISection } from "../../custom2";
import useResumeById from "../../hooks/use-resume-by-id";
import AppContext from "../../store/AppContext";
import nanoid from "../../utils/guid";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";
import Toolbox from "./Toolbox";

type ACTIONTYPE =
    | { type: "setResume"; payload: IFile }
    | { type: "addSection" }
    | { type: "addItem"; payload: string };

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
        }
    }

    return state;
};

const ResumeEditor: React.FC = () => {
    const ctx = useContext(AppContext);
    const { data } = useResumeById(ctx.activeResumeId);

    const [resume, dispatch] = useReducer(resumeReducer, data);

    const ref = useRef<HTMLBaseElement>(null);

    // Event listener that overrides save shortcut (ctrl+s)
    // void -> always evaluates to undefined -> type is essentially <undefined | null>.
    // const [saveListener, setSaveListener] =
    //     useState<EventListenerOrEventListenerObject | null>(null);

    useEffect(() => {
        if (data != null) dispatch({ type: "setResume", payload: data });
    }, [data]);

    const addItem = (sectionId: string) => {
        dispatch({ type: "addItem", payload: sectionId });
    };

    // const addSaveEventHandler = (event: SyntheticEvent) => {
    //     if (saveListener === null) {
    //         // Listen for ctrl+s key combo -> then save focused resume.
    //         const listener = event.target?.addEventListener(
    //             "keydown",
    //             (event) => {
    //                 if (
    //                     event instanceof KeyboardEvent &&
    //                     event.ctrlKey &&
    //                     event.key === "s"
    //                 ) {
    //                     event.preventDefault();
    //                     event = event as KeyboardEvent;
    //                     console.log(resume);
    //                 }
    //             }
    //         ) as unknown as EventListenerOrEventListenerObject;
    //         console.log(listener);
    //         setSaveListener(listener);
    //     }
    // };

    // const removeSaveEventHandler = (event: SyntheticEvent) => {
    //     console.log(saveListener);
    //     if (saveListener !== null) {
    //         console.log(saveListener);
    //         event.target.removeEventListener("keydown", saveListener);
    //         setSaveListener(null);
    //     }
    // };

    useEffect(() => {
        const handleSave = (event: KeyboardEvent) => {
            console.log("fired");
            if (event.ctrlKey && event.key === "s") {
                event.preventDefault();
                console.log(event);
            }
        };

        const target = ref?.current;
        console.log(target);
        target?.addEventListener("keydown", handleSave);

        return () => {
            target?.removeEventListener("keydown", handleSave);
            console.log("removed");
        };
    }, []);

    return (
        <section className={classes.section} tabIndex={-1} ref={ref}>
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
                        />
                    ))}
                    <AddSection
                        addSection={() => dispatch({ type: "addSection" })}
                    />
                </>
            )}
        </section>
    );
};

export default ResumeEditor;
