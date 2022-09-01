import { useRef } from "react";
import AddSection from "./AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section";
import Toolbox from "./Toolbox";
import useResumeState from "../../hooks/use-resume-state";

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

    return (
        <section className={classes.section} tabIndex={-1} ref={sectionRef}>
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
