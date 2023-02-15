import AddIcon from "@mui/icons-material/Add";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Box, Button, Divider } from "@mui/material";
import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ActiveView } from "../../enums";
import AppContext from "../../store/AppContext";
import AuthContext from "../../store/AuthContext";
import fetcher from "../../utils/fetcher";
import Logo from "../UI/Logo";

const Background: React.FC = () => {
    const { isNavActive, toggleNav, updateActiveSidebarView } =
        useContext(AppContext);

    const { mutate } = useSWRConfig();
    const { userId } = useContext(AuthContext);
    const { updateActiveResumeId } = useContext(AppContext);

    const createNewResume = async (useTemplate: boolean) => {
        try {
            await fetcher(`/api/createResume`, {
                method: "POST",
                body: JSON.stringify({
                    fileName: "Untitled Resume",
                    userId,
                    useTemplate,
                }),
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
                <Logo
                    height={128}
                    width={128}
                    style={{ marginBottom: "1.5rem" }}
                />
                <Button
                    startIcon={
                        <OpenInNewIcon sx={{ transform: "rotate(-90deg)" }} />
                    }
                    sx={{ textTransform: "unset" }}
                    color="info"
                    onClick={openFileViewer}
                >
                    Open file viewer
                </Button>
                <Divider flexItem />
                <Button
                    startIcon={<AddIcon />}
                    color="info"
                    sx={{ textTransform: "unset" }}
                    onClick={() => createNewResume(true)}
                >
                    Create resume from template
                </Button>
                <Divider flexItem />
                <Button
                    startIcon={<AddIcon />}
                    color="info"
                    sx={{ textTransform: "unset" }}
                    onClick={() => createNewResume(false)}
                >
                    Create blank resume
                </Button>
            </Box>
        </Box>
    );
};

export default Background;
