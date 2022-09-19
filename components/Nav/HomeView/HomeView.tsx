import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TerminalIcon from "@mui/icons-material/Terminal";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import CreateButton from "./CreateButton";
import FileSystemButton from "./FileSystemButton";
import { Tooltip } from "@mui/material";

const iconSize = 32;
const drawerWidth = 48;

interface IProps {
    openFileSystem: () => void;
}

const HomeView: React.FC<IProps> = ({ openFileSystem }) => {
    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{ margin: "1rem 0", padding: "0.5rem 0" }}
                        >
                            <ListItemIcon
                                sx={{ transform: "translateX(0.5rem)" }}
                            >
                                <LogoDevIcon sx={{ fontSize: iconSize }} />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    <CreateButton />

                    <FileSystemButton open={openFileSystem} />

                    <ListItem disablePadding>
                        <Tooltip title="Terminal" placement="right">
                            <ListItemButton
                                sx={{
                                    margin: "2rem 0 0 0",
                                    padding: "0.5rem 0",
                                }}
                            >
                                <ListItemIcon
                                    sx={{ transform: "translateX(0.5rem)" }}
                                >
                                    <TerminalIcon sx={{ fontSize: iconSize }} />
                                </ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
};

export default HomeView;
