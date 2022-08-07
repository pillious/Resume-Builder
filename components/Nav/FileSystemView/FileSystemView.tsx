import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DescriptionIcon from "@mui/icons-material/Description";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IFile } from "../../../custom2.d";
import useResume from "../../../hooks/use-resume";

const drawerWidth = 160;
const iconSize = 20;
const color = "rgb(50, 50, 50)";

interface IProps {
    close: () => void;
}

const FileSystemView: React.FC<IProps> = ({ close }) => {
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
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            pb: 0.75,
                        }}
                        disablePadding
                    >
                        <Button
                            startIcon={<ChevronLeftIcon />}
                            sx={{ textTransform: "none" }}
                            onClick={close}
                        >
                            Close File Viewer
                        </Button>
                    </ListItem>

                    <Divider />
                    {isResponseSuccess &&
                        files.map((file: IFile, idx: number) => (
                            <ListItem disablePadding key={idx}>
                                <ListItemButton sx={{ m: 0, p: 0.5 }}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: `${iconSize}px`,
                                            px: 0.5,
                                        }}
                                    >
                                        <DescriptionIcon
                                            sx={{
                                                fontSize: iconSize,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <Typography fontWeight={600} color={color}>
                                        {file.name}
                                    </Typography>
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Drawer>
        </Box>
    );
};

export default FileSystemView;
