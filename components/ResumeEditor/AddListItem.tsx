import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
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
                    <Button
                        sx={{width: "110px"}}
                        variant="outlined"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={addItem}
                    >
                        <span className={classes.btn_text}>Add Item</span>
                    </Button>
                </div>
            )}
        </>
    );
};

export default AddListItem;
