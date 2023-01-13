import Card from "@mui/material/Card";
import classes from "./Experience.module.css";
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
import { Divider } from "@mui/material";

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

    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    return (
        <Reorder.Item
            value={props.id}
            dragListener={false}
            dragControls={controls}
            style={{ listStyle: "none", position: "relative" }}
        >
            <Overlay show={showOverlay} />
            <Card elevation={0} className={classes.Card}>
                <div className={classes.top}>
                    {props.areToolsActive && (
                        <div
                            onPointerDown={(e) => {
                                controls.start(e);
                                setShowOverlay(true);
                            }}
                            onPointerOver={() => setShowOverlay(true)}
                            onPointerLeave={() => setShowOverlay(false)}
                            style={{ zIndex: 2 }}
                        >
                            <DragIndicator />
                        </div>
                    )}
                    <DebouncedTextarea
                        sx={{
                            borderBottom: "1px solid #bbb",
                            backgroundColor: "#f5f5f5",
                            width: "max(40%, 300px)",
                            pl: "0.5rem",
                            justifySelf: "left",
                            "&:hover": {
                                backgroundColor: "#ddd",
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
                        <span className={classes.button_group}>
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
                                    props.deleteExperience(
                                        props.sectionId,
                                        props.id
                                    )
                                }
                            />
                        </span>
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
                </div>
                {props.items.length > 0 && (
                    <Card elevation={2} sx={{ mx: "2px", p: 0 }}>
                        {/* 2px margin to fix boxshadow */}
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
    );
};

export default Experience;
