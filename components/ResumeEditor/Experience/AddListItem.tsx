import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import classes from "./AddListItem.module.css";

interface IProps {
    addItem: () => void;
    hidden?: boolean;
}

const AddListItem: React.FC<IProps> = ({ addItem, hidden = false }) => {
    return (
        <>
            {hidden === false && (
                <div className={classes.wrapper}>
                    <IconButton
                        color="secondary"
                        aria-label="add item"
                        onClick={addItem}
                        title="Add item"
                    >
                        <AddCircleOutlineIcon
                            sx={{
                                "&:hover": {
                                    transform: "scale(1.25)",
                                    cursor: "pointer",
                                },
                                transition: "200ms",
                            }}
                        />
                    </IconButton>
                </div>
            )}
        </>
    );
};

export default AddListItem;
