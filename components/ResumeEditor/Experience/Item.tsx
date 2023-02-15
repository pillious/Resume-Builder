import { Box, ListItemIcon, useTheme } from "@mui/material";
import { DragControls } from "framer-motion";
import { useState } from "react";
import { guid, IItem } from "../../../types";
import ConfirmationModal from "../../UI/ConfirmationModal";
import DebouncedTextarea from "../../UI/DebouncedTextarea";
import DragIndicator from "../../UI/DragIndicator";
import classes from "./Item.module.css";

interface IProps {
    item: IItem;
    experienceId: guid;
    sectionId: guid;
    dragControls: DragControls;
    areToolsActive: boolean;
    updateItemContent: (
        sectionId: guid,
        experienceId: guid,
        itemId: guid,
        content: string
    ) => void;
    deleteItem: (sectionId: guid, experienceId: guid, itemId: guid) => void;
}

const Item: React.FC<IProps> = (props) => {
    const theme = useTheme();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <>
            <Box
                className={classes.list_item_wrapper}
                data-are-tools-active={props.areToolsActive}
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
            >
                <Box
                    sx={{
                        width: "100%",
                        position: "relative",
                        "& .MuiInput-root": {
                            width: "100%",
                        },
                    }}
                    className={classes.list_item}
                >
                    <DebouncedTextarea
                        defaultValue={props.item.content}
                        placeholder="Type here . . ."
                        onChange={(content) => {
                            props.updateItemContent(
                                props.sectionId,
                                props.experienceId,
                                props.item.id,
                                content
                            );
                        }}
                        sx={{
                            fontSize: "0.9rem",
                            "&:hover": {
                                bgcolor: `${theme.palette.overlay} !important`,
                            },
                        }}
                    />
                    {props.areToolsActive && (
                        <div
                            onPointerDown={(e) => {
                                props.dragControls.start(e);
                            }}
                        >
                            <DragIndicator
                                styles={{
                                    display: "none",
                                    position: "absolute",
                                    right: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                }}
                            />
                        </div>
                    )}
                </Box>
                <ListItemIcon
                    className={classes.list_style}
                    sx={{
                        transition: "1s content",
                        width: "calc(6.5px + 0.5rem)",
                        minWidth: "unset !important",
                        cursor: "pointer",
                        "&::before": {
                            content: "''",
                        },
                    }}
                    onClick={() => setIsModalOpen(true)}
                />
            </Box>

            <ConfirmationModal
                open={isModalOpen}
                title="Delete Confirmation"
                text={`Do you want to permanently delete "${props.item.content.substring(
                    0,
                    30
                )}${props.item.content.length > 30 ? "..." : ""}"?`}
                handleConfirm={() =>
                    props.deleteItem(
                        props.sectionId,
                        props.experienceId,
                        props.item.id
                    )
                }
                handleClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Item;
