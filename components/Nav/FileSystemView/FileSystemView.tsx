import { useContext } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { guid } from "../../../custom2";
import useResumeIds from "../../../hooks/data/use-resume-ids";
import FileItem from "./FileItem";
import AppContext from "../../../store/AppContext";
import AuthContext from "../../../store/AuthContext";

const drawerWidth = 160;

interface IProps {
    close: () => void;
}

const FileSystemView: React.FC<IProps> = ({ close }) => {
    const { activeResumeId: ctxActiveResumeId } = useContext(AppContext);
    const { userId } = useContext(AuthContext);
    const { data: payload } = useResumeIds(userId);

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
                            pb: 1,
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

                    {payload.map(
                        (file: { name: string; id: guid }, idx: number) => (
                            <FileItem
                                key={`FileItem-${idx}`}
                                name={file.name}
                                id={file.id}
                                active={ctxActiveResumeId === file.id}
                            />
                        )
                    )}
                </List>
            </Drawer>
        </Box>
    );
};

export default FileSystemView;
