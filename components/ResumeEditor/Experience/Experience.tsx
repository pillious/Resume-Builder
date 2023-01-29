import AddListItem from "./AddListItem";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import { IItem, guid } from "../../../types";
import DeleteExperience from "./DeleteExperience";
import Date from "./Date";
import ExperienceList from "./ExperienceList";
import { Reorder, useDragControls } from "framer-motion";
import Overlay from "../../UI/Overlay";
import { useState } from "react";
import DragIndicator from "../../UI/DragIndicator";
import { Box, Card, Divider, useTheme } from "@mui/material";
import ConfirmationModal from "../../UI/ConfirmationModal";

interface IProps {
    id: guid;
    sectionId: guid;
    title: string;
    items: IItem[];
    startDate: string;
    endDate: string;
    areToolsActive: boolean;
    addItem: (sectionId: guid, experienceId: guid) => void;
    updateExperienceName: (
        sectionId: guid,
        experienceId: guid,
        name: string
    ) => void;
    updateExperienceDate: (
        sectionId: guid,
        experienceId: guid,
        isStartDate: boolean,
        date: string
    ) => void;
    updateItemContent: (
        sectionId: guid,
        experienceId: guid,
        itemId: guid,
        content: string
    ) => void;
    updateItemOrder: (
        sectionId: guid,
        experienceId: guid,
        order: guid[]
    ) => void;
    deleteItem: (sectionId: guid, experienceId: guid, itemId: guid) => void;
    deleteExperience: (sectionId: guid, experienceId: guid) => void;
}

const Experience: React.FC<IProps> = (props) => {
    const controls = useDragControls();
    const theme = useTheme();

    const [showOverlay, setShowOverlay] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <Reorder.Item
                value={props.id}
                dragListener={false}
                dragControls={controls}
                style={{ listStyle: "none", position: "relative" }}
            >
                <Overlay show={showOverlay} />
                <Card elevation={2} sx={{ mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
                        {props.areToolsActive && (
                            <div
                                onPointerDown={(e) => {
                                    controls.start(e);
                                    setShowOverlay(true);
                                }}
                                onPointerOver={() => setShowOverlay(true)}
                                onPointerLeave={() => setShowOverlay(false)}
                                style={{ zIndex: 3 }}
                            >
                                <DragIndicator />
                            </div>
                        )}
                        <DebouncedTextarea
                            sx={{
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                width: "max(40%, 300px)",
                                pl: 1,
                                justifySelf: "left",
                                "&:hover": {
                                    backgroundColor: theme.palette.overlay,
                                },
                            }}
                            defaultValue={props.title}
                            placeholder="Experience"
                            multiline={false}
                            onChange={(name) =>
                                props.updateExperienceName(
                                    props.sectionId,
                                    props.id,
                                    name
                                )
                            }
                        />

                        {props.areToolsActive && (
                            <Box
                                sx={{ borderRadius: "0.5rem", display: "flex" }}
                            >
                                <AddListItem
                                    addItem={() =>
                                        props.addItem(props.sectionId, props.id)
                                    }
                                />
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    sx={{ my: 1 }}
                                />
                                <DeleteExperience
                                    deleteExperience={() =>
                                        setIsModalOpen(true)
                                    }
                                />
                            </Box>
                        )}

                        <Date
                            startDate={props.startDate}
                            endDate={props.endDate}
                            updateDate={(isStartDate: boolean, date: string) =>
                                props.updateExperienceDate(
                                    props.sectionId,
                                    props.id,
                                    isStartDate,
                                    date
                                )
                            }
                        />
                    </Box>
                    {props.items.length > 0 && (
                        <Card elevation={3} sx={{ p: 0 }}>
                            <ExperienceList
                                items={props.items}
                                sectionId={props.sectionId}
                                experienceId={props.id}
                                updateItemContent={props.updateItemContent}
                                updateItemOrder={props.updateItemOrder}
                                deleteItem={props.deleteItem}
                                areToolsActive={props.areToolsActive}
                            />
                        </Card>
                    )}
                </Card>
            </Reorder.Item>

            <ConfirmationModal
                open={isModalOpen}
                title="Delete Confirmation"
                text={`Do you want to permanently delete "${props.title.substring(
                    0,
                    30
                )}"${props.title.length > 30 ? "..." : ""}?`}
                handleConfirm={() =>
                    props.deleteExperience(props.sectionId, props.id)
                }
                handleClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Experience;
