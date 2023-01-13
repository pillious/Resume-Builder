import { useContext } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { guid } from "../../../types";
import useResumeIds from "../../../hooks/data/use-resume-ids";
import FileItem from "./FileItem";
import AppContext from "../../../store/AppContext";
import AuthContext from "../../../store/AuthContext";
import { filesDrawerWidth, navHeight } from "../../../utils/constants";

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
