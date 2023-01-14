import { Box, Drawer, List } from "@mui/material";
import CreateButton from "./CreateButton";
import FileSystemButton from "./FileSystemButton";
import { homeDrawerWidth, navHeight } from "../../../utils/constants";

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
                    width: homeDrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: homeDrawerWidth,
                        mt: `${navHeight}px`,
                        bgcolor: "#1e1e1e",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <FileSystemButton open={openFileSystem} />
                    <CreateButton />
                    {/* <ListItem disablePadding>
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
                    </ListItem> */}
                </List>
            </Drawer>
        </Box>
    );
};

export default HomeView;
