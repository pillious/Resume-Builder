import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import FolderIcon from "@mui/icons-material/Folder";

const FileSystemButton: React.FC = () => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{ margin: "2rem 0 0 0", padding: "0.5rem 0" }}>
                <ListItemIcon sx={{ transform: "translateX(0.5rem)" }}>
                    <FolderIcon sx={{ fontSize: 32 }} />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    );
};

export default FileSystemButton;
