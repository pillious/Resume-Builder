import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DescriptionIcon from "@mui/icons-material/Description";
import useResume from "../../../hooks/use-resume";
import { IFile } from "../../../custom2";

const drawerWidth = 160;
const iconSize = 24;

const FileSystemView: React.FC = () => {
    const { data: payload, isLoading, isError } = useResume();
    const isResponseSuccess =
        !isError && !isLoading && payload != undefined && "data" in payload;

    let files: IFile[] = [];
    if (isResponseSuccess && payload.data.files != undefined)
        files = payload.data.files;

    return (
        <Box sx={{ display: "flex" }}>
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
                    <ListItem
                        sx={{ display: "flex", justifyContent: "center" }}
                        disablePadding
                    >
                        <Button
                            startIcon={<ChevronLeftIcon />}
                            sx={{ textTransform: "none" }}
                        >
                            Close File Viewer
                        </Button>
                    </ListItem>

                    <Divider />
                    {isResponseSuccess &&
                        files.map((file: IFile, idx: number) => (
                            <ListItem disablePadding key={idx}>
                                <ListItemButton sx={{ m: 0, p: 0 }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: `${iconSize}px`,
                                            pl: 0.5,
                                        }}
                                    >
                                        <DescriptionIcon
                                            sx={{ fontSize: iconSize }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={`${file.name}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default FileSystemView;
