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
import ConfirmationModal from "../UI/ConfirmationModal";
import InputModal from "../UI/InputModal";

interface IProps {
    fileName: string;
    copy: () => void;
    save: () => void;
    print: () => void;
    preview: () => void;
    rename: (name: string) => void;
    delete: () => void;
}

const Toolbox: React.FC<IProps> = (props) => {
    const [toolboxOpen, setToolboxOpen] = useState(false);
    const handleToolboxOpen = () => setToolboxOpen(true);
    const handleToolboxClose = () => setToolboxOpen(false);

    const [delModalOpen, setDelModalOpen] = useState(false);
    const handleDelModalOpen = () => setDelModalOpen(true);
    const handleDelModalClose = () => setDelModalOpen(false);

    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const handleRenameModalOpen = () => setRenameModalOpen(true);
    const handleRenameModalClose = () => setRenameModalOpen(false);

    return (
        <>
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
                    onOpen={handleToolboxOpen}
                    onClose={handleToolboxClose}
                    open={toolboxOpen}
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
                                        handleToolboxClose();
                                    }}
                                >
                                    <FileCopyIcon />
                                </IconButton>
                                <IconButton
                                    color="info"
                                    aria-label="Save"
                                    onClick={() => {
                                        props.save();
                                        handleToolboxClose();
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
                                        handleToolboxClose();
                                    }}
                                >
                                    <PrintIcon />
                                </IconButton>
                                <IconButton
                                    color="warning"
                                    aria-label="Preview"
                                    onClick={() => {
                                        props.preview();
                                        handleToolboxClose();
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
                                    onClick={handleDelModalOpen}
                                >
                                    <DeleteForeverIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    aria-label="Rename"
                                    onClick={handleRenameModalOpen}
                                >
                                    <DriveFileRenameOutlineIcon />
                                </IconButton>
                            </>
                        }
                        tooltipTitle="Delete / Rename"
                    />
                </SpeedDial>
            </Box>

            {/* Delete confirmation modal */}
            <ConfirmationModal
                open={delModalOpen}
                handleClose={handleDelModalClose}
                handleConfirm={() => {
                    props.delete();
                    handleToolboxClose();
                }}
                title="Delete File?"
                text={`Are you sure you want to delete '${props.fileName}'?`}
            />

            {/* Rename resume modal */}
            <InputModal
                open={renameModalOpen}
                handleClose={handleRenameModalClose}
                handleConfirm={(val) => {
                    props.rename(val);
                    handleToolboxClose();
                }}
                defaultValue={props.fileName}
                title="Rename File?"
                label="New name"
            />
        </>
    );
};

export default Toolbox;
