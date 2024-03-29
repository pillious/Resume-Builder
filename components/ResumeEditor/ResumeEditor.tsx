import { Box, Divider, Paper, useTheme } from "@mui/material";
import { Reorder } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import useResumeState from "../../hooks/use-resume-state";
import AppContext from "../../store/AppContext";
import AuthContext from "../../store/AuthContext";
import { guid, IExperience, ISection } from "../../types";
import { sortByOrder } from "../../utils/utils";
import Experience from "./Experience/Experience";
import Header from "./Header/Header";
import AddSection from "./Section/AddSection";
import Section from "./Section/Section";
import Toolbox from "./Toolbox/Toolbox";

const ResumeEditor: React.FC = () => {
    const sectionRef = useRef<HTMLBaseElement>(null);
    const theme = useTheme();

    const {
        activeResumeId,
        renameFile,
        deleteFile,
        downloadFile,
        copyFile,
        togglePreview,
        areToolsActive,
    } = useContext(AppContext);

    const { userId } = useContext(AuthContext);

    const {
        resume,
        hasUnsavedChanges,
        saveChanges,
        addHeaderInfo,
        addExperience,
        addSection,
        addItem,
        updateHeaderName,
        updateHeaderInfo,
        updateSectionName,
        updateSectionOrder,
        updateExperienceName,
        updateExperienceDate,
        updateExperienceOrder,
        updateItemContent,
        updateItemOrder,
        deleteHeaderInfo,
        deleteSection,
        deleteExperience,
        deleteItem,
    } = useResumeState(sectionRef);

    // Confirmation when user closes tab while there are unsaved changes.
    useEffect(() => {
        const confirmation = (e: BeforeUnloadEvent) => {
            const confirmationMessage =
                "The changes you've made will not be saved.";

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        };

        if (hasUnsavedChanges)
            window.addEventListener("beforeunload", confirmation);
        else window.removeEventListener("beforeunload", confirmation);

        // Clean up function
        return () => window.removeEventListener("beforeunload", confirmation);
    }, [hasUnsavedChanges]);

    const sections: ISection[] | undefined = resume
        ? sortByOrder<ISection>(resume.sections)
        : undefined;

    return (
        <Box
            tabIndex={-1}
            ref={sectionRef}
            sx={{ position: "relative", height: "100%", flex: 1 }}
        >
            {resume && (
                <>
                    <Toolbox
                        fileName={resume.name}
                        hasUnsavedChanges={hasUnsavedChanges}
                        save={saveChanges}
                        copy={() => {
                            if (activeResumeId && userId !== null)
                                copyFile(activeResumeId, userId);
                        }}
                        download={() => {
                            if (activeResumeId) downloadFile();
                        }}
                        preview={() => {
                            if (activeResumeId) togglePreview();
                        }}
                        rename={(name) => {
                            if (activeResumeId && name && userId !== null)
                                renameFile(activeResumeId, name, userId);
                        }}
                        delete={() => {
                            if (activeResumeId && userId !== null) {
                                deleteFile(activeResumeId, userId);
                            }
                        }}
                    />
                    <Box
                        sx={{
                            overflowY: "scroll",
                            pt: "1rem",
                            height: "calc(100% - 34px)",
                        }}
                    >
                        <Paper
                            sx={{
                                p: "1rem",
                                m: "auto",
                                maxWidth: "1000px",
                                minHeight: "100%",
                                border: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Header
                                items={resume.header.items}
                                name={resume.header.name}
                                areToolsActive={areToolsActive}
                                addHeaderInfo={addHeaderInfo}
                                updateHeaderName={updateHeaderName}
                                updateHeaderInfo={updateHeaderInfo}
                                deleteHeaderInfo={deleteHeaderInfo}
                            />

                            <Divider />

                            <Reorder.Group
                                axis="y"
                                values={sections?.map((s) => s.id) || []}
                                style={{ padding: 0 }}
                                onReorder={(order: guid[]) =>
                                    updateSectionOrder(order)
                                }
                            >
                                {sections?.map((section, idx) => (
                                    <Section
                                        key={`${section.id}-${idx}`}
                                        name={section.name}
                                        id={section.id}
                                        areToolsActive={areToolsActive}
                                        updateSectionName={updateSectionName}
                                        deleteSection={deleteSection}
                                        addExperience={addExperience}
                                    >
                                        <Reorder.Group
                                            axis="y"
                                            values={
                                                section.items.map(
                                                    (s) => s.id
                                                ) || []
                                            }
                                            style={{ padding: 0 }}
                                            onReorder={(order: guid[]) =>
                                                updateExperienceOrder(
                                                    section.id,
                                                    order
                                                )
                                            }
                                        >
                                            {sortByOrder<IExperience>(
                                                section.items
                                            ).map((experience, idx) => (
                                                <Experience
                                                    key={`${experience.id}-${idx}`}
                                                    id={experience.id}
                                                    sectionId={section.id}
                                                    title={experience.name}
                                                    items={
                                                        experience.items || []
                                                    }
                                                    startDate={
                                                        experience.startDate
                                                    }
                                                    endDate={experience.endDate}
                                                    areToolsActive={
                                                        areToolsActive
                                                    }
                                                    addItem={addItem}
                                                    updateExperienceName={
                                                        updateExperienceName
                                                    }
                                                    updateExperienceDate={
                                                        updateExperienceDate
                                                    }
                                                    updateItemContent={
                                                        updateItemContent
                                                    }
                                                    updateItemOrder={
                                                        updateItemOrder
                                                    }
                                                    deleteItem={deleteItem}
                                                    deleteExperience={
                                                        deleteExperience
                                                    }
                                                />
                                            ))}
                                        </Reorder.Group>
                                    </Section>
                                ))}
                            </Reorder.Group>

                            {areToolsActive && (
                                <AddSection addSection={addSection} />
                            )}
                        </Paper>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default ResumeEditor;
