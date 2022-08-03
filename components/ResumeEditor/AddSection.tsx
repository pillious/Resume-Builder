import React from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import classes from "./AddSection.module.css";

interface IProps {
    addSection: () => void;
}

const AddSection: React.FC<IProps> = (props) => {
    return (
        <Tooltip title="Create Section" placement="bottom" arrow>
            <div className={classes.add_section} onClick={props.addSection}>
                {/* Don't remove the empty elements. CSS selectors operate upon these. */}
                <span />
                <span>
                    <Fab
                        sx={[
                            { backgroundColor: "#78baf0" },
                            {
                                "&:hover": {
                                    backgroundColor: "#1976d2",
                                },
                            },
                        ]}
                        color="primary"
                        size="medium"
                        aria-label="add section"
                    >
                        <AddIcon />
                    </Fab>
                </span>
                <span />
            </div>
        </Tooltip>
    );
};

export default AddSection;
