import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import classes from "./AddListItem.module.css";

interface IProps {
    addItem: () => void;
    isHovering: boolean;
}

const AddListItem: React.FC<IProps> = (props) => {
    return (
        <>
            {props.isHovering === true && (
                <div className={classes.wrapper}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={props.addItem}
                    >
                        Add Item
                    </Button>
                </div>
            )}
        </>
    );
};

export default AddListItem;
