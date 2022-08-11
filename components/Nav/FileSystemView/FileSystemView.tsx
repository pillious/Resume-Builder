import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import useResumeIds from "../../../hooks/use-resume-ids";
import FileItem from "./FileItem";

const drawerWidth = 160;

interface IProps {
    close: () => void;
}

const FileSystemView: React.FC<IProps> = ({ close }) => {
    const { data: payload } = useResumeIds();

    // const isResponseSuccess =
    //     !isError && !isLoading && payload != undefined && "data" in payload;

    // let files: IFile[] = [];
    // if (isResponseSuccess && payload.data.files != undefined)
    //     files = payload.data.files;

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

                    {payload.map(
                        (file: { name: string; id: string }, idx: number) => (
                            <FileItem
                                key={`FileItem-${idx}`}
                                name={file.name}
                                id={file.id}
                            />
                        )
                    )}
                </List>
            </Drawer>
        </Box>
    );
};

export default FileSystemView;
