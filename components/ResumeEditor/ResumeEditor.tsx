import React, { useState } from "react";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";

const test_content = {
    title: "Header #1",
    items: [
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor impedit iste ",
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor impedit iste sapiente reiciendi erum corrupti recusandae placeat corporis?",
    ],
};

interface ISections {
    title: string;
    items: string[];
}

const ResumeEditor: React.FC = () => {
    // const [sections, setSections] = useState([]);
    const [sections, setSections] = useState<ISections[]>([test_content]);

    const addSection = () => {
        console.log("addSEction");

        setSections(() => [
            ...sections,
            {
                title: `Section #${sections.length + 1}`,
                items: [],
            },
        ]);
    };

    return (
        <section className={classes.section}>
            {sections.map((section, idx) => (
                <Section
                    key={idx}
                    title={section.title}
                    items={section.items}
                />
            ))}
            <AddSection addSection={addSection}/>
        </section>
    );
};

export default ResumeEditor;
