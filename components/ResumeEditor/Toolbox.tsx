import { useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import IconButton from "@mui/material/IconButton";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import ConstructionIcon from "@mui/icons-material/Construction";
import CloseIcon from "@mui/icons-material/Close";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import classes from "./Toolbox.module.css";

interface IProps {
    copy: () => void;
    save: () => void;
    print: () => void;
    preview: () => void;
    rename: () => void;
    delete: () => void;
}

const Toolbox: React.FC<IProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                height: 320,
                transform: "translateZ(0px)",
                flexGrow: 1,
            }}
        >
            <SpeedDial
                ariaLabel="Resume editor toolbar"
                sx={{ position: "absolute", bottom: 8, right: 8 }}
                className={classes.SpeedDial}
                icon={
                    <SpeedDialIcon
                        icon={<ConstructionIcon />}
                        openIcon={<CloseIcon />}
                    />
                }
                onOpen={handleOpen}
                onClose={handleClose}
                open={open}
            >
                <SpeedDialAction
                    sx={{ width: "80px", borderRadius: 3 }}
                    icon={
                        <>
                            <IconButton
                                color="info"
                                aria-label="Copy"
                                onClick={() => {
                                    props.copy();
                                    handleClose();
                                }}
                            >
                                <FileCopyIcon />
                            </IconButton>
                            <IconButton
                                color="info"
                                aria-label="Save"
                                onClick={() => {
                                    props.save();
                                    handleClose();
                                }}
                            >
                                <SaveIcon />
                            </IconButton>
                        </>
                    }
                    tooltipTitle="Copy / Save"
                />
                <SpeedDialAction
                    sx={{ width: "80px", borderRadius: 3 }}
                    icon={
                        <>
                            <IconButton
                                color="warning"
                                aria-label="Print"
                                onClick={() => {
                                    props.print();
                                    handleClose();
                                }}
                            >
                                <PrintIcon />
                            </IconButton>
                            <IconButton
                                color="warning"
                                aria-label="Preview"
                                onClick={() => {
                                    props.preview();
                                    handleClose();
                                }}
                            >
                                <PreviewIcon />
                            </IconButton>
                        </>
                    }
                    tooltipTitle="Print / Preview"
                />
                <SpeedDialAction
                    sx={{
                        width: "80px",
                        borderRadius: 3,
                    }}
                    icon={
                        <>
                            <IconButton
                                color="error"
                                aria-label="Delete"
                                onClick={() => {
                                    props.delete();
                                    handleClose();
                                }}
                            >
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                aria-label="Rename"
                                onClick={() => {
                                    props.rename();
                                    handleClose();
                                }}
                            >
                                <DriveFileRenameOutlineIcon />
                            </IconButton>
                        </>
                    }
                    tooltipTitle="Delete / Rename"
                />
            </SpeedDial>
        </Box>
    );
};

export default Toolbox;
