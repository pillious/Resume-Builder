import { useContext } from "react";
import { Box, Button, Divider } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useSWRConfig } from "swr";
import AppContext from "../../store/AppContext";
import AuthContext from "../../store/AuthContext";
import fetcher from "../../utils/fetcher";
import { ActiveView } from "../../enums";

const Background: React.FC = () => {
    const { isNavActive, toggleNav, updateActiveSidebarView } =
        useContext(AppContext);

    const { mutate } = useSWRConfig();
    const { userId } = useContext(AuthContext);
    const { updateActiveResumeId } = useContext(AppContext);

    const createNewResume = async () => {
        try {
            await fetcher(`/api/createResume`, {
                method: "POST",
                body: JSON.stringify({ fileName: "Untitled Resume", userId }),
            }).then(async (resp) => {
                await mutate(`/api/getResumeIds?userId=${userId}`);
                if ("data" in resp && "id" in resp.data) {
                    updateActiveResumeId(resp.data.id);
                }
            });
        } catch (ex) {
            console.error(ex);
        }
    };

    const openFileViewer = () => {
        if (!isNavActive) {
            toggleNav();
        }
        updateActiveSidebarView(ActiveView.FileSystemView);
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <AdbIcon color="info" sx={{ fontSize: 128, mb: 3 }} />
                <Button
                    startIcon={
                        <OpenInNewIcon sx={{ transform: "rotate(-90deg)" }} />
                    }
                    sx={{ textTransform: "capitalize" }}
                    color="info"
                    onClick={openFileViewer}
                >
                    Open File Viewer
                </Button>
                <Divider flexItem />
                <Button
                    startIcon={<AddIcon />}
                    sx={{ textTransform: "capitalize" }}
                    color="info"
                    onClick={createNewResume}
                >
                    Create a new resume
                </Button>
            </Box>
        </Box>
    );
};

export default Background;
