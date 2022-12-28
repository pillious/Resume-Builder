import { useRef, useContext } from "react";
import Divider from "@mui/material/Divider";
import AddSection from "./Section/AddSection";
import classes from "./ResumeEditor.module.css";
import Experience from "./Experience/Experience";
import Toolbox from "./Toolbox";
import useResumeState from "../../hooks/use-resume-state";
import AppContext from "../../store/AppContext";
import Header from "./Header/Header";
import Section from "./Section/Section";

const ResumeEditor: React.FC = () => {
    const {
        activeResumeId: ctxActiveResumeId,
        renameFile: ctxRenameFile,
        deleteFile: ctxDeleteFile,
        downloadFile: ctxDownloadFile,
        openPreview: ctxOpenPreview,
    } = useContext(AppContext);

    const sectionRef = useRef<HTMLBaseElement>(null);

    const {
        resume,
        saveChanges,
        addHeaderInfo,
        addExperience,
        addSection,
        addItem,
        updateHeaderName,
        updateHeaderInfo,
        updateSectionName,
        updateExperienceName,
        updateExperienceDate,
        updateItemContent,
        deleteHeaderInfo,
        deleteSection,
        deleteExperience,
        deleteItem,
    } = useResumeState(sectionRef);

    return (
        <main className={classes.section} tabIndex={-1} ref={sectionRef}>
            {resume && (
                <>
                    <Header
                        addHeaderInfo={addHeaderInfo}
                        updateHeaderName={updateHeaderName}
                        updateHeaderInfo={updateHeaderInfo}
                        deleteHeaderInfo={deleteHeaderInfo}
                        items={resume.header.items}
                        name={resume.header.name}
                    />

                    <Divider />

                    {resume?.sections.map((section, idx) => (
                        <Section
                            key={`${section.id}-${idx}`}
                            name={section.name}
                            id={section.id}
                            updateSectionName={updateSectionName}
                            deleteSection={deleteSection}
                            addExperience={addExperience}
                        >
                            <>
                                {section.items.map((experience, idx) => (
                                    <Experience
                                        key={`${experience.id}-${idx}`}
                                        id={experience.id}
                                        sectionId={section.id}
                                        title={experience.name}
                                        items={experience.items || []}
                                        startDate={experience.startDate}
                                        endDate={experience.endDate}
                                        addItem={addItem}
                                        updateExperienceName={
                                            updateExperienceName
                                        }
                                        updateExperienceDate={
                                            updateExperienceDate
                                        }
                                        updateItemContent={updateItemContent}
                                        deleteItem={deleteItem}
                                        deleteExperience={deleteExperience}
                                    />
                                ))}
                            </>
                        </Section>
                    ))}

                    <AddSection addSection={addSection} />

                    <Toolbox
                        fileName={resume.name}
                        save={saveChanges}
                        copy={() => console.log("copy")}
                        download={() => {
                            if (ctxActiveResumeId) ctxDownloadFile();
                        }}
                        preview={() => {
                            if (ctxActiveResumeId) ctxOpenPreview();
                        }}
                        rename={(name) => {
                            if (ctxActiveResumeId && name)
                                ctxRenameFile(ctxActiveResumeId, name);
                        }}
                        delete={() => {
                            if (ctxActiveResumeId) {
                                ctxDeleteFile(ctxActiveResumeId);
                            }
                        }}
                    />
                </>
            )}
        </main>
    );
};

export default ResumeEditor;
