import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { IFile } from "../../custom2";
import useResumeById from "../../hooks/use-resume-by-id";
import AppContext from "../../store/AppContext";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";
import Toolbox from "./Toolbox";

interface ISections {
    title: string;
    items: string[];
}

const ResumeEditor: React.FC = () => {
    const [resume, setResume] = useState<IFile | null>(null);

    const ctx = useContext(AppContext);
    const { data } = useResumeById(ctx.activeResumeId);

    // TODO: display resume 
    useEffect(() => {
        if (data != null) {
            console.log(data);
            setResume(data);
        }
    }, [data]);

    const [sections, setSections] = useState<ISections[]>([]);

    // TODO: REWRITE
    const addSection = () =>
        // TEMP setup
        setSections(() => [
            ...sections,
            {
                title: `Section #${sections.length + 1}`,
                items: [],
            },
        ]);

    // TODO: REWRITE
    const addItem = (idx: number) =>
        setSections(() => {
            const state = [...sections];
            state[idx].items.push(`item #${state[idx].items.length + 1}`);
            return state;
        });

    return (
        <section className={classes.section}>
            <Toolbox />
            {sections.map((section, idx) => (
                <Section
                    key={idx}
                    id={idx}
                    title={section.title}
                    items={section.items}
                    addItem={addItem}
                />
            ))}
            <AddSection addSection={addSection} />
        </section>
    );
};

export default ResumeEditor;
