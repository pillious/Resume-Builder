import { useRef, useContext } from "react";
import AddSection from "./Section/AddSection";
import classes from "./ResumeEditor.module.css";
import Section from "./Section/Section";
import Toolbox from "./Toolbox";
import useResumeState from "../../hooks/use-resume-state";
import AppContext from "../../store/AppContext";

const ResumeEditor: React.FC = () => {
    const ctx = useContext(AppContext);

    const sectionRef = useRef<HTMLBaseElement>(null);

    const {
        resume,
        saveChanges,
        addSection,
        addItem,
        updateSectionName,
        updateItemContent,
        deleteSection,
        deleteItem,
    } = useResumeState(sectionRef);

    return (
        <section className={classes.section} tabIndex={-1} ref={sectionRef}>
            {resume && (
                <>
                    <Toolbox
                        fileName={resume.name}
                        save={saveChanges}
                        copy={() => console.log("copy")}
                        print={() => console.log("print")}
                        preview={() => console.log("preview")}
                        rename={(name) => {
                            if (ctx.activeResumeId && name)
                                ctx.renameFile(ctx.activeResumeId, name);
                        }}
                        delete={() => {
                            if (ctx.activeResumeId) {
                                ctx.deleteFile(ctx.activeResumeId);
                            }
                        }}
                    />
                    {resume?.sections.map((section, idx) => (
                        <Section
                            key={`${section.id}-${idx}`}
                            id={section.id}
                            title={section.name}
                            items={section.items || []}
                            addItem={addItem}
                            updateSectionName={updateSectionName}
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
