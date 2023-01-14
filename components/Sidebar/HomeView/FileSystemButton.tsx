import { Tooltip, ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface IProps {
    open: () => void;
}

const FileSystemButton: React.FC<IProps> = ({ open }) => {
    return (
        <ListItem disablePadding>
            <Tooltip title="File Explorer" placement="right">
                <ListItemButton sx={{ padding: "0.5rem 0" }} onClick={open}>
                    <ListItemIcon sx={{ transform: "translateX(0.5rem)" }}>
                        <FolderIcon sx={{ fontSize: 32 }} />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
        </ListItem>
    );
};

export default FileSystemButton;
