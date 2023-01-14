import React from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import classes from "./AddSection.module.css";

interface IProps {
    addSection: () => void;
}

const AddSection: React.FC<IProps> = (props) => {
    return (
        <Tooltip title="Create Section" placement="bottom" arrow>
            <div className={classes.add_section} onClick={props.addSection}>
                {/* Don't remove the empty span elements. CSS selectors operate on these. */}
                <span />
                <span>
                    <Fab color="primary" size="medium" aria-label="add section">
                        <AddIcon />
                    </Fab>
                </span>
                <span />
            </div>
        </Tooltip>
    );
};

export default AddSection;
