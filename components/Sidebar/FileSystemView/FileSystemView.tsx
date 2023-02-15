import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button, Divider, Drawer, List, ListItem } from "@mui/material";
import { useContext } from "react";
import useResumeIds from "../../../hooks/data/use-resume-ids";
import AppContext from "../../../store/AppContext";
import AuthContext from "../../../store/AuthContext";
import { guid } from "../../../types";
import { filesDrawerWidth, navHeight } from "../../../utils/constants";
import FileItem from "./FileItem";

interface IProps {
    close: () => void;
}

const FileSystemView: React.FC<IProps> = ({ close }) => {
    const { activeResumeId } = useContext(AppContext);
    const { userId } = useContext(AuthContext);
    const { data: payload } = useResumeIds(userId);

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                sx={{
                    width: filesDrawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: filesDrawerWidth,
                        mt: `${navHeight}px`,
                        border: "none",
                        bgcolor: "#1e1e1e",
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
                            color="info"
                            sx={{ textTransform: "none", fontSize: "0.85rem" }}
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
                                active={activeResumeId === file.id}
                            />
                        )
                    )}
                </List>
            </Drawer>
        </Box>
    );
};

export default FileSystemView;
