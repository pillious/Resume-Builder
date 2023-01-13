import React from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box } from "@mui/material";

interface IProps {
    addItem: () => void;
    hidden?: boolean;
}

const AddListItem: React.FC<IProps> = ({ addItem, hidden = false }) => {
    return (
        <>
            {hidden === false && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        color="primary"
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
                </Box>
            )}
        </>
    );
};

export default AddListItem;
