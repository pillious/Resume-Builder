import { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "./MenuItem";
import InputModal from "../../UI/InputModal";
import ConfirmationModal from "../../UI/ConfirmationModal";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material";

interface IProps {
    fileName: string;
    copy: () => void;
    save: () => void;
    download: () => void;
    rename: (name: string) => void;
    delete: () => void;
}

const FileMenu: React.FC<IProps> = (props) => {
    const theme = useTheme();

    const [anchorElem, setAnchorElem] = useState<null | HTMLElement>(null);
    const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) =>
        setAnchorElem(event.currentTarget);
    const handleMenuClose = () => setAnchorElem(null);

    const [delModalOpen, setDelModalOpen] = useState(false);
    const handleDelModalOpen = () => setDelModalOpen(true);
    const handleDelModalClose = () => setDelModalOpen(false);

    const [renameModalOpen, setRenameModalOpen] = useState(false);
    const handleRenameModalOpen = () => setRenameModalOpen(true);
    const handleRenameModalClose = () => setRenameModalOpen(false);

    return (
        <>
            <div>
                <Button
                    id="file-menu-button"
                    aria-controls={anchorElem ? "file-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={anchorElem ? "true" : undefined}
                    onClick={handleMenuOpen}
                    variant="text"
                    size="small"
                    sx={{
                        fontSize: "0.875rem",
                        p: "1px 4px",
                        textTransform: "capitalize",
                        minWidth: "32px",
                        color: theme.palette.white,
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.08)",
                        },
                    }}
                >
                    File
                </Button>
                <Menu
                    id="file-menu"
                    anchorEl={anchorElem}
                    open={Boolean(anchorElem)}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "file-menu-button",
                    }}
                >
                    <MenuItem
                        text="Save"
                        handleClick={() => {
                            props.save();
                            handleMenuClose();
                        }}
                        icon={<SaveIcon />}
                    />
                    <Divider />
                    <MenuItem
                        text="Copy"
                        handleClick={() => {
                            props.copy();
                            handleMenuClose();
                        }}
                        icon={<FileCopyIcon />}
                    />
                    <MenuItem
                        text="Rename"
                        handleClick={handleRenameModalOpen}
                        icon={<DriveFileRenameOutlineIcon />}
                    />
                    <MenuItem
                        text="Download"
                        handleClick={() => {
                            props.download();
                            handleMenuClose();
                        }}
                        icon={<FileDownloadIcon />}
                    />
                    <Divider />
                    <MenuItem
                        text="Delete"
                        handleClick={handleDelModalOpen}
                        icon={<DeleteIcon />}
                    />
                </Menu>
            </div>

            {/* Delete confirmation modal */}
            <ConfirmationModal
                open={delModalOpen}
                handleClose={handleDelModalClose}
                handleConfirm={() => {
                    props.delete();
                    handleMenuClose();
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
                    handleMenuClose();
                }}
                defaultValue={props.fileName}
                title="Rename File?"
                label="New name"
            />
        </>
    );
};

export default FileMenu;
